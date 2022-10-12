import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  Rule,
  TOption,
  TCondition,
  TRule,
  UserComponentBaseProps,
} from "./index";
import { produce } from "immer";
import { IRuleCustomRenderProps } from "./types";

const TestRule: React.FC<Partial<TRule>> = (props) => {
  const [options, setOptions] = useState<TOption[]>(props.options || []);
  const [conditions, setConditions] = useState<TCondition[]>(
    props.conditions || []
  );
  const [addNewMode, setAddNewMode] = useState<boolean>(
    props.addNewMode as boolean
  );

  return (
    <Rule
      ruleKey="rk-1"
      title="Rule 1"
      options={options}
      setOptions={setOptions}
      conditions={conditions}
      setConditions={setConditions}
      addNewMode={addNewMode}
      setAddNewMode={setAddNewMode}
      readonly={props.readonly}
      onAddCondition={props.onAddCondition}
      render={props.render}
    />
  );
};

let conditionCount = 0;
const cancelConditionButtonText = "Cancel Condition";
const applyConditionButtonText = "Apply Condition";
export const EditComponent: React.FC<UserComponentBaseProps> = ({
  conditionKey,
  setConditions,
  setAddNewMode,
  readonly,
  type,
}) => {
  const handleCancel = () => {
    setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        if (conditionKey === undefined) {
          // new condition
          setAddNewMode(false);
          return;
        }
        const selectedCondition = draft.find(
          (c) => c.conditionKey === conditionKey
        );
        selectedCondition!.mode = "view";
      })
    );
  };

  const handleApply = () => {
    if (conditionKey === undefined) {
      // new condition
      setConditions((oldConditions) =>
        produce(oldConditions, (draft) => {
          draft.push({
            conditionKey: `key-${++conditionCount}`,
            type: type as string,
            logicalOperator: "and",
            comparator: "is",
            values: {
              list: ["neu1", "new2"],
            },
            mode: "view",
          });
        })
      );
      setAddNewMode(false);

      return;
    }

    setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        const selectedCondition = draft.find(
          (c) => c.conditionKey === conditionKey
        );
        selectedCondition!.mode = "view";
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

const ValuesComponentTags: React.FC<UserComponentBaseProps> = ({ values }) => {
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

export const ValuesComponent: React.FC<UserComponentBaseProps> = ({
  conditionKey,
  valuesProp,
  values,
}) => {
  return (
    <div>
      <>
        Custom Values {conditionKey} {valuesProp} {JSON.stringify(values)}
      </>
    </div>
  );
};

const testOptions: TOption[] = [
  {
    type: "type1",
    title: "Title1",
    contentTitle: "Title1",
    contentSubtitle: "Subtitle1",
    EditComponent,
    editComponentProps: {
      type: "type1",
    },
    disabled: false,
    onDeleteCondition: () => true,
    ValuesComponent: ValuesComponentTags,
  },
  {
    type: "type2",
    title: "Title2",
    contentTitle: "Title2",
    contentSubtitle: "Subtitle2",
    EditComponent,
    editComponentProps: {
      type: "type2",
    },
    disabled: false,
    onDeleteCondition: () => false,
    onEditCondition: () => false,
    onViewCondition: () => false,
    ValuesComponent: ValuesComponent,
  },
];

const testConditions: TCondition[] = [
  {
    conditionKey: "ck1",
    type: "type1",
    comparator: "is",
    values: {
      list: ["value1"],
    },
    mode: "view",
    logicalOperatorReadOnly: false,
    conditionReadOnly: false,
  },
  {
    conditionKey: "ck2",
    type: "type2",
    comparator: "is",
    values: {
      list: ["value2"],
    },
    mode: "view",
    logicalOperatorReadOnly: false,
    conditionReadOnly: false,
  },
  {
    conditionKey: "ck3",
    type: "type3",
    comparator: "is",
    values: {
      list: ["value3"],
    },
    mode: "view",
    logicalOperatorReadOnly: false,
    conditionReadOnly: false,
    onLogicalOperatorChange: () => false,
  },
];

describe("Rule component", () => {
  it("should render", () => {
    expect(<TestRule />).not.toBeNull();
  });

  it("should match snapshot when empty", () => {
    const { container } = render(<TestRule />);
    expect(container).toMatchSnapshot();
  });

  it("should render and allow changing of logical operator", () => {
    const { container, getByText, getAllByText } = render(
      <TestRule options={testOptions} conditions={testConditions} />
    );
    expect(container).toMatchSnapshot();

    // change first condition's logical operator dropdown selection
    const firstDropdown = getByText("If").parentElement;
    if (firstDropdown) fireEvent.click(firstDropdown);
    const ifNotSelection = getByText("If not");
    fireEvent.click(ifNotSelection);

    // change second condition's logical operator dropdown selection
    const SECOND_CONDITION_INDEX = 1;
    const secondDropdown =
      getAllByText("And")[SECOND_CONDITION_INDEX].parentElement;
    if (secondDropdown) fireEvent.click(secondDropdown);
    const secondAndNotSelection = getByText("And not");
    fireEvent.click(secondAndNotSelection);

    // change third condition's logical operator dropdown selection
    const THIRD_CONDITION_INDEX = 2;
    const thirdDropdown =
      getAllByText("And")[THIRD_CONDITION_INDEX].parentElement;
    fireEvent.click(thirdDropdown!);
    const thirdAndNotSelection = getByText("And not");
    fireEvent.click(thirdAndNotSelection);

    expect(container).toMatchSnapshot();
  });

  it("should be able to edit and delete condition and delete rule", () => {
    const { container, queryByText } = render(
      <TestRule options={testOptions} conditions={testConditions} />
    );
    let conditionContainers = container.querySelectorAll(
      ".view-condition__container"
    );
    expect(conditionContainers.length).toEqual(testConditions.length);

    // logical operator button, edit button, delete
    const editButton = conditionContainers[0].querySelectorAll("button")[1];

    // should show and hide custom edit component
    fireEvent.click(editButton);
    expect(container).toMatchSnapshot(); // should have edit view
    const cancelEditButton = queryByText(cancelConditionButtonText);
    expect(cancelEditButton).not.toBeNull();
    fireEvent.click(cancelEditButton!);
    expect(container).toMatchSnapshot();

    // should delete condition
    conditionContainers = container.querySelectorAll(
      ".view-condition__container"
    );
    const deleteButton = conditionContainers[0].querySelectorAll("button")[2];
    fireEvent.click(deleteButton);
    expect(
      container.querySelectorAll(".view-condition__container")
    ).toHaveLength(testConditions.length - 1);
  });

  it("should be able to prevent edit actions", () => {
    const { container, queryByText } = render(
      <TestRule
        options={testOptions}
        conditions={testConditions}
        onAddCondition={() => false}
      />
    );

    const addConditionButton = queryByText("Add Condition");
    fireEvent.click(addConditionButton!);
    expect(queryByText(cancelConditionButtonText)).toBeNull();

    const conditionContainers = container.querySelectorAll(
      ".view-condition__container"
    );
    const editButton = conditionContainers[1].querySelectorAll("button")[1];
    fireEvent.click(editButton);
    expect(queryByText(cancelConditionButtonText)).toBeNull();

    const deleteButton = conditionContainers[1].querySelectorAll("button")[2];
    fireEvent.click(deleteButton);
    expect(
      container.querySelectorAll(".view-condition__container").length
    ).toEqual(testConditions.length);
  });

  it("should render custom value component with correct props", () => {
    const options: TOption[] = [
      {
        ...testOptions[0],
        ValuesComponent,
        valuesComponentProps: {
          valuesProp: "valuesProp",
        },
      },
    ];
    const conditions = [{ ...testConditions[0] }];
    const { container } = render(
      <TestRule options={options} conditions={conditions} />
    );

    const valuesContainer = container.querySelector(
      ".values__content-container"
    );
    expect(valuesContainer).not.toBeNull();
    expect(valuesContainer).toMatchSnapshot();
  });

  it("should be able to select options when adding", () => {
    const { container, queryByText } = render(
      <TestRule options={testOptions} />
    );
    const addButton = queryByText("Add Condition");
    expect(addButton).not.toBeNull();
    fireEvent.click(addButton!);
    const option2Button = queryByText(testOptions[1].title as string);
    fireEvent.click(option2Button!);
    const applyButton = queryByText(applyConditionButtonText);
    fireEvent.click(applyButton!);
    const newCondition = container.querySelector(
      ".view-condition__container"
    ) as HTMLElement;
    expect(newCondition).not.toBeNull();
    expect(newCondition).toMatchSnapshot();
  });

  it("should allow viewing conditions", () => {
    const conditions: TCondition[] = [
      {
        ...testConditions[0],
        conditionReadOnly: true,
      },
    ];
    const { container, queryByText } = render(
      <TestRule options={testOptions} conditions={conditions} />
    );
    const conditionContainers = container.querySelectorAll(
      ".view-condition__container"
    );
    const viewButton = conditionContainers[0].querySelector("button");
    fireEvent.click(viewButton!);
    expect(queryByText(testOptions[0].contentSubtitle!)).not.toBeNull();
    expect(queryByText(cancelConditionButtonText)).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it("should show additional condition content if children is provided", () => {
    const conditions: TCondition[] = [
      {
        ...testConditions[0],
        children: <div>additional content for condition 1</div>,
      },
      {
        ...testConditions[1],
        children: <div>additional content for condition 2</div>,
      },
    ];
    const { queryByText } = render(
      <TestRule options={testOptions} conditions={conditions} />
    );
    expect(
      queryByText("additional content for condition 1")
    ).toBeInTheDocument();
    expect(
      queryByText("additional content for condition 2")
    ).toBeInTheDocument();
  });

  it("onViewCondition should be able to prevent viewing condition", () => {
    const conditions: TCondition[] = [
      {
        ...testConditions[0],
        conditionReadOnly: true,
      },
    ];

    const options: TOption[] = [
      {
        ...testOptions[0],
        onViewCondition: jest.fn(() => false),
      },
    ];
    const { container, queryByText } = render(
      <TestRule options={options} conditions={conditions} />
    );
    const conditionContainers = container.querySelectorAll(
      ".view-condition__container"
    );
    const viewButton = conditionContainers[0].querySelector("button");
    fireEvent.click(viewButton!);
    expect(options[0].onViewCondition).toHaveBeenCalled();
    expect(queryByText(testOptions[0].contentSubtitle!)).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it("should handle function disable", () => {
    const conditions: TCondition[] = [
      {
        ...testConditions[0],
      },
    ];

    const options: TOption[] = [
      {
        ...testOptions[0],
        disabled: ({ conditions }) =>
          conditions.some((c) => c.type === testOptions[0].type),
      },
    ];

    const { queryByText, queryAllByText } = render(
      <TestRule options={options} conditions={conditions} />
    );
    const addButton = queryByText("Add Condition");
    expect(addButton).not.toBeNull();
    fireEvent.click(addButton!);
    const title1Elements = queryAllByText(testOptions[0].title as string);
    expect(title1Elements[1]).toHaveClass("disabled");
  });

  it("should display custom rendered component when render props is provided", () => {
    const { queryByText, rerender } = render(<TestRule />);

    expect(queryByText("Test header section")).toBeFalsy();
    expect(queryByText("Test footer section")).toBeFalsy();

    const CustomRenderer: React.FC<IRuleCustomRenderProps> = ({
      conditionsSection,
      addNewConditionButton,
      editConditionSection,
    }) => (
      <div>
        <span>Test header section</span>
        {conditionsSection}
        {addNewConditionButton}
        {editConditionSection}
        <span>Test footer section</span>
      </div>
    );

    rerender(<TestRule render={CustomRenderer} />);

    expect(queryByText("Test header section")).toBeTruthy();
    expect(queryByText("Test footer section")).toBeTruthy();
  });
});
