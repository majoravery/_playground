import React from "react";
import { TRule, TOption, TCondition, IRuleState, IRules } from "./types";
import Rule from "./Rule";
import AddRuleButton from "./AddRuleButton";
import { produce } from "immer";

type TSetOptions = (
  setRules: IRules["setRules"],
  i: number
) => (options: TOption[] | ((prev: TOption[]) => TOption[])) => void;

type TSetConditions = (
  setRules: IRules["setRules"],
  i: number
) => (
  conditions: TCondition[] | ((prev: TCondition[]) => TCondition[])
) => void;

type TSetAddNewMode = (
  setRules: IRules["setRules"],
  i: number
) => (mode: boolean | ((prev: boolean) => boolean)) => void;

export const setOptions: TSetOptions = (setRules, i) => (options) => {
  setRules((oldRules: TRule[]) => {
    let newOptions: TOption[];
    if (typeof options === "function") {
      newOptions = options(oldRules[i].options);
    } else {
      newOptions = options;
    }

    return produce(oldRules, (draft) => {
      draft[i].options = newOptions;
    });
  });
};

export const setConditions: TSetConditions = (setRules, i) => (conditions) => {
  setRules((oldRules: TRule[]) => {
    let newConditions: TCondition[];
    if (typeof conditions === "function") {
      newConditions = conditions(oldRules[i].conditions);
    } else {
      newConditions = conditions;
    }

    return produce(oldRules, (draft) => {
      draft[i].conditions = newConditions;
    });
  });
};

export const setAddNewMode: TSetAddNewMode = (setRules, i) => (mode) => {
  setRules((oldRules) => {
    let newMode: boolean;
    if (typeof mode === "function") {
      newMode = mode(oldRules[i].addNewMode);
    } else {
      newMode = mode;
    }

    return produce(oldRules, (draft) => {
      draft[i].addNewMode = newMode;
    });
  });
};

const Rules: React.FC<IRules> = ({
  rules,
  setRules,
  enableAdd = false,
  addButtonTitle,
  onAddRule,
  onDeleteRule,
  readonly = false,
}) => {
  // gets rule props from user, and will not add rule if onAddRule does not return object
  const handleAddRule = () => {
    const newRuleProps = onAddRule();
    if (typeof newRuleProps !== "object") return;
    const {
      conditions = [],
      addNewMode = false,
      readonly = false,
      ...others
    } = newRuleProps;
    const newRule: TRule = {
      conditions,
      addNewMode,
      readonly,
      ...others,
    };

    setRules((oldRules) =>
      produce(oldRules, (draft) => {
        draft.push(newRule);
      })
    );
  };

  // calls user's onDeleteRule, and only continues if it returns true
  const handleDeleteRule = (deleteProps: IRuleState) => {
    if (onDeleteRule !== undefined) {
      if (!onDeleteRule(deleteProps)) return;
    }

    setRules((oldRules) =>
      produce(oldRules, (draft) => {
        const index = draft.findIndex(
          (rule) => rule.ruleKey === deleteProps.ruleKey
        );
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };

  return (
    <div className="rules__container" data-testid="rules--container">
      {rules.map((rule, i) => (
        <Rule
          addNewMode={rule.addNewMode}
          conditions={rule.conditions}
          disableDeleteRule={rule.disableDeleteRule}
          enableAddCondition={rule.enableAddCondition}
          hideDeleteRule={rule.hideDeleteRule}
          key={rule.ruleKey}
          onAddCondition={rule.onAddCondition}
          onDeleteRule={handleDeleteRule}
          options={rule.options}
          optionsSidebarTitle={rule.optionsSidebarTitle}
          readonly={rule.readonly || readonly}
          render={rule.render}
          ruleKey={rule.ruleKey}
          setAddNewMode={setAddNewMode(setRules, i)}
          setConditions={setConditions(setRules, i)}
          setOptions={setOptions(setRules, i)}
          title={rule.title}
        />
      ))}
      {enableAdd && !readonly && (
        <AddRuleButton onClick={handleAddRule} title={addButtonTitle} />
      )}
    </div>
  );
};

export default Rules;
