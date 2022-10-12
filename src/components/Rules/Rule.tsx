/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import Condition from "./Condition";
import RuleContainer from "./RuleContainer";
import EditCondition from "./EditCondition";
import "./Rules.css";

import { IRule, TOption, TCondition, ICondition, IRuleState } from "./types";
import { RuleStateProvider } from "./hooks";
import { Button, IconButton } from "@deliveryhero/armor";
import { DeleteIcon, PlusIcon } from "@deliveryhero/armor-icons";

interface OptionsHash {
  [key: string]: TOption;
}

const mapConditionToProps =
  (optionsHash: OptionsHash) =>
  (c: TCondition, cIndex: number): Partial<ICondition> | undefined => {
    const option = optionsHash[c.type];
    return {
      ...option,
      ...c,
      conditionIndex: cIndex,
    };
  };

const hashOptionsByType = (options: TOption[]): OptionsHash => {
  const hash: OptionsHash = {};
  options.forEach((option) => {
    hash[option.type] = option;
  });
  return hash;
};

const Rule: React.FC<IRule> = ({
  addNewMode,
  conditions,
  disableDeleteRule = false,
  enableAddCondition: enableAddConditionProp = true,
  hideDeleteRule = false,
  logicalOperatorReadOnly = false,
  onAddCondition,
  onDeleteRule,
  options,
  optionsSidebarTitle = "",
  readonly = false,
  render,
  ruleKey,
  setAddNewMode,
  setConditions,
  setOptions,
  title = "",
}) => {
  const [enableAddCondition, setEnableAddCondition] = useState(
    enableAddConditionProp
  );
  const optionsHash = useMemo<OptionsHash>(
    () => hashOptionsByType(options),
    [options]
  );
  const ruleState: IRuleState = {
    ruleKey,
    options,
    conditions,
    addNewMode,
    enableAddCondition,
    setOptions,
    setConditions,
    setAddNewMode,
    setEnableAddCondition,
  };

  const handleDeleteRule = () => {
    if (onDeleteRule !== undefined) {
      onDeleteRule(ruleState);
    }
  };

  const handleAddCondition = () => {
    // allow user to intercept and handle adding of condition
    if (onAddCondition !== undefined && !onAddCondition(ruleState)) {
      return;
    }

    setAddNewMode(true);
  };

  const conditionsSection = (
    <div className="rule__conditions-container">
      {conditions
        .map(mapConditionToProps(optionsHash))
        .filter((c) => c !== undefined)
        .map((c, i) => (
          <Condition
            key={c!.conditionKey}
            {...(c! as ICondition)}
            first={i === 0}
            logicalOperatorReadOnly={
              logicalOperatorReadOnly || c?.logicalOperatorReadOnly
            }
          />
        ))}
    </div>
  );

  const editConditionSection = addNewMode && (
    <EditCondition optionsSidebarTitle={optionsSidebarTitle} />
  );

  const addNewConditionButton = !addNewMode &&
    !readonly &&
    enableAddCondition && (
      <Button
        disabled={disableDeleteRule}
        onClick={handleAddCondition}
        small
        tertiary
      >
        <PlusIcon /> Add Condition
      </Button>
    );

  return (
    <RuleStateProvider
      ruleState={{
        ruleKey,
        options,
        conditions,
        addNewMode,
        readonly,
        setOptions,
        setConditions,
        setAddNewMode,
      }}
    >
      <RuleContainer>
        <div className="rule__header">
          <h5>{title}</h5>
          {!hideDeleteRule && !readonly && (
            <IconButton disabled={disableDeleteRule} onClick={handleDeleteRule}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        {render ? (
          render({
            conditionsSection,
            editConditionSection,
            addNewConditionButton,
          })
        ) : (
          <>
            {conditionsSection}
            {editConditionSection}
            {addNewConditionButton}
          </>
        )}
      </RuleContainer>
    </RuleStateProvider>
  );
};

export default Rule;
