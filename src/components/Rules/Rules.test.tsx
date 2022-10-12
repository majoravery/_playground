import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Rules, TOption, TCondition, TRule, UserComponentBaseProps } from './index';
import { IRules } from './types';
import { produce } from 'immer';
import { setOptions, setConditions, setAddNewMode } from './Rules';

const TestRules: React.FC<Partial<IRules>> = props => {
  const [rules, setRules] = useState<TRule[]>(props.rules || []);
  const handleAddRule = props.onAddRule || jest.fn();
  const handleDeleteRule = props.onDeleteRule || jest.fn();
  const enableAdd = props.enableAdd === undefined ? true : props.enableAdd;
  const readonly = props.readonly;

  return (
    <Rules
      rules={rules}
      setRules={setRules}
      onAddRule={handleAddRule}
      onDeleteRule={handleDeleteRule}
      enableAdd={enableAdd}
      readonly={readonly}
    />
  );
};

let conditionCount = 0;
const type = 'type1';
const newTitle = 'New Title';
const cancelConditionButtonText = 'Cancel Condition';
const applyConditionButtonText = 'Apply Condition';
export const EditComponent: React.FC<UserComponentBaseProps> = ({
  conditionKey,
  setConditions,
  setAddNewMode,
  options,
  setOptions,
  readonly,
}) => {
  const handleCancel = () => {
    setConditions(oldConditions =>
      produce(oldConditions, draft => {
        if (conditionKey === undefined) {
          // new condition
          setAddNewMode(false);
          return;
        }
        const selectedCondition = draft.find(c => c.conditionKey === conditionKey);
        selectedCondition!.mode = 'view';
      })
    );
  };

  const handleApply = () => {
    if (conditionKey === undefined) {
      // new condition
      setConditions(oldConditions =>
        produce(oldConditions, draft => {
          draft.push({
            conditionKey: `key-${++conditionCount}`,
            type: options[0].type,
            logicalOperator: 'and',
            comparator: 'is',
            values: {
              list: ['neu1', 'new2'],
            },
            mode: 'view',
          });
        })
      );
      setAddNewMode(false);

      // test set options
      setOptions(oldOptions =>
        produce(oldOptions, draft => {
          const selectedOptions = draft.find(o => o.type === type);
          selectedOptions!.title = 'New Title';
        })
      );

      return;
    }

    setConditions(oldConditions =>
      produce(oldConditions, draft => {
        const selectedCondition = draft.find(c => c.conditionKey === conditionKey);
        selectedCondition!.mode = 'view';
      })
    );
  };

  return (
    <div>
      {!readonly && (
        <>
          <button onClick={handleCancel}>{cancelConditionButtonText}</button>
          <button onClick={handleApply}>{applyConditionButtonText}</button>
        </>
      )}
    </div>
  );
};

const ValuesComponent: React.FC<UserComponentBaseProps> = ({ values }) => {
  let listValues: string[] = [];
  if (values && values.list && Array.isArray(values.list)) {
    listValues = values?.list || [];
  }

  return (
    <div style={{ marginTop: -1, marginBottom: -1 }}>
      {listValues.map((v, i) => (
        <div key={i}>{v}</div>
      ))}
    </div>
  );
};

describe('Rules component', () => {
  it('should render', () => {
    expect(
      <Rules
        rules={[]}
        onAddRule={jest.fn()}
        setRules={jest.fn()}
        readonly={false}
        onDeleteRule={jest.fn()}
        enableAdd={false}
      />
    ).not.toBeNull();
  });

  it('should match snapshot when empty', () => {
    const { container, rerender } = render(<TestRules enableAdd={false} />);
    expect(container).toMatchSnapshot(); // disabled add
    rerender(<TestRules enableAdd={true} />);
    expect(container).toMatchSnapshot(); // enabled add
  });

  it('should be able to add and remove rules and conditions', () => {
    let ruleCount = 0;
    const options: TOption[] = [
      {
        type,
        title: 'Title1',
        contentTitle: 'Title1',
        contentSubtitle: 'Subtitle1',
        EditComponent,
        editComponentProps: {
          foo: 'default props',
        },
        disabled: false,
        ValuesComponent: ValuesComponent,
      },
    ];

    const handleOnAddRule = () => {
      ruleCount += 1;
      return {
        ruleKey: `rk-${ruleCount}`,
        title: `title-${ruleCount}`,
        options,
      };
    };

    const handleDeleteRule = jest.fn(() => true);

    const maxRuleCount = 10;

    const { container, queryByText, queryAllByText, rerender } = render(
      <TestRules rules={[]} onAddRule={handleOnAddRule} onDeleteRule={handleDeleteRule} />
    );
    const emptyRules = container.querySelector('.rule__container');
    expect(emptyRules).toBeNull();
    const addNewRuleButton = queryByText('Add rule');
    expect(addNewRuleButton).not.toBeNull();

    // Add Rules
    for (let i = 0; i < maxRuleCount; i++) {
      fireEvent.click(addNewRuleButton!);
      const ruleCount = container.querySelectorAll('.rule__container').length;
      expect(ruleCount).toEqual(i + 1);
    }

    // Add Conditions
    const maxConditionCount = 3;
    let conditionContainers = container.querySelectorAll('.view-condition__container');
    expect(conditionContainers.length).toEqual(0);

    for (let i = 0; i < maxConditionCount; i++) {
      const addConditionButtons = queryAllByText('Add Condition');
      expect(addConditionButtons[0]).not.toBeNull();
      fireEvent.click(addConditionButtons[0]);
      const applyButton = queryByText(applyConditionButtonText);
      expect(applyButton).not.toBeNull();
      fireEvent.click(applyButton!);
      conditionContainers = container.querySelectorAll('.view-condition__container');
      expect(conditionContainers.length).toEqual(i + 1);
    }

    // test component should update rule title on apply
    expect(queryAllByText(newTitle).length > 0).toBe(true);

    expect(conditionContainers).toMatchSnapshot();

    // should not allow edits when read-only
    rerender(<TestRules rules={[]} onAddRule={handleOnAddRule} onDeleteRule={handleDeleteRule} readonly />);
    expect(queryByText('Add Condition')).toBeNull();
    expect(queryByText('Add rule')).toBeNull();
    expect(queryByText('title-1')!.parentElement!.querySelector('button')).toBeNull();
    const readOnlyCondition = queryAllByText(newTitle)[0].parentElement;
    expect(readOnlyCondition).toMatchSnapshot();

    // set back to non-readonly (editable)
    rerender(<TestRules rules={[]} onAddRule={handleOnAddRule} onDeleteRule={handleDeleteRule} />);

    // Remove Rules
    for (let i = 0; i < maxRuleCount; i++) {
      const title = `title-${i + 1}`;
      const titleElement = queryByText(title);
      expect(titleElement).not.toBeNull();
      const deleteRuleButton = titleElement!.parentElement!.querySelector('button');
      fireEvent.click(deleteRuleButton!);
      expect(handleDeleteRule).toHaveBeenCalled();
      const noTitleElement = queryByText(title);
      expect(noTitleElement).toBeNull();
    }
  });
});

describe('setOptions', () => {
  it('should set options when type is value', () => {
    let newRules: TRule[] = [];
    const newOptionsValue: TOption[] = [];
    const oldRules: Partial<TRule>[] = [
      {
        options: [],
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setOptionsFn = setOptions(setRules as IRules['setRules'], 0);
    setOptionsFn(newOptionsValue);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].options === newOptionsValue).toBeTruthy();
  });

  it('should set options when type is function', () => {
    let newRules: TRule[] = [];
    const newOptionsValue: TOption[] = [];
    const newOptionsFn = () => newOptionsValue;
    const oldRules: Partial<TRule>[] = [
      {
        options: [],
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setOptionsFn = setOptions(setRules as IRules['setRules'], 0);
    setOptionsFn(newOptionsFn);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].options === newOptionsValue).toBeTruthy();
  });
});

describe('setConditions', () => {
  it('should set conditions when type is value', () => {
    let newRules: TRule[] = [];
    const newConditionsValue: TCondition[] = [];
    const oldRules: Partial<TRule>[] = [
      {
        conditions: [],
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setConditionsFn = setConditions(setRules as IRules['setRules'], 0);
    setConditionsFn(newConditionsValue);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].conditions === newConditionsValue).toBeTruthy();
  });

  it('should set conditions when type is function', () => {
    let newRules: TRule[] = [];
    const newConditionsValue: TCondition[] = [];
    const newConditionsValueFn = () => newConditionsValue;
    const oldRules: Partial<TRule>[] = [
      {
        conditions: [],
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setConditionsFn = setConditions(setRules as IRules['setRules'], 0);
    setConditionsFn(newConditionsValueFn);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].conditions === newConditionsValue).toBeTruthy();
  });
});

describe('setAddNewMode', () => {
  it('should set addNewMode when type is value', () => {
    let newRules: TRule[] = [];
    const newAddNewModeValue = false;
    const oldRules: Partial<TRule>[] = [
      {
        addNewMode: true,
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setAddNewModeFn = setAddNewMode(setRules as IRules['setRules'], 0);
    setAddNewModeFn(newAddNewModeValue);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].addNewMode).toEqual(newAddNewModeValue);
  });

  it('should set addNewMode when type is function', () => {
    let newRules: TRule[] = [];
    const newAddNewModeValueFn = () => false;
    const oldRules: Partial<TRule>[] = [
      {
        addNewMode: true,
      },
    ];
    const setRules = (newValue: (oldRules: TRule[]) => TRule[]) => {
      newRules = newValue(oldRules as TRule[]);
    };
    const setAddNewModeFn = setAddNewMode(setRules as IRules['setRules'], 0);
    setAddNewModeFn(newAddNewModeValueFn);
    expect(newRules).not.toBeUndefined();
    expect(newRules[0].addNewMode).toEqual(newAddNewModeValueFn());
  });
});
