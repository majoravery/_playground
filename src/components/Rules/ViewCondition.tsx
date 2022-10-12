/* eslint-disable react/prop-types */
import React from "react";
import produce from "immer";
import { IViewCondition, LogicalOperator, LogicalOperators } from "./types";
import Label from "./Label";
import Values from "./Values";

import { useRuleState } from "./hooks";
import { Dropdown } from "@deliveryhero/armor";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const swapAndWithIf = (s: string) => s.replace("and", "if");

const ViewCondition: React.FC<IViewCondition> = ({
  conditionKey,
  conditionIndex,
  title = "",
  logicalOperator = "and",
  onLogicalOperatorChange,
  logicalOperatorReadOnly,
  comparator = "is",
  values,
  conditionReadOnly = false,
  first = false,
  onEditCondition,
  onDeleteCondition,
  onViewCondition,
  disableViewCondition,
  disableEditCondition,
  disableDeleteCondition,
  ValuesComponent,
  valuesComponentProps,
}) => {
  const ruleState = useRuleState();

  const readonly = conditionReadOnly || ruleState.readonly;

  const handleEditCondition = () => {
    // allow user to intercept and handle editing of condition
    if (
      onEditCondition !== undefined &&
      !onEditCondition({
        conditionKey: conditionKey!,
        conditionIndex: conditionIndex,
        values: values,
        ...ruleState,
      })
    ) {
      return;
    }

    ruleState.setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        const selectedCondition = draft.find(
          (c) => c.conditionKey === conditionKey
        );
        selectedCondition!.mode = "edit";
      })
    );
  };

  const handleDeleteCondition = () => {
    // allow user to intercept and handle deleting of condition
    if (
      onDeleteCondition !== undefined &&
      !onDeleteCondition({
        conditionKey: conditionKey!,
        conditionIndex: conditionIndex,
        values: values,
        ...ruleState,
      })
    ) {
      return;
    }

    ruleState.setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        const index = draft.findIndex((c) => c.conditionKey === conditionKey);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };

  const handleViewCondition = () => {
    // allow user to intercept and handle editing of condition
    if (
      onViewCondition !== undefined &&
      !onViewCondition({
        conditionKey: conditionKey!,
        conditionIndex: conditionIndex,
        values: values,
        ...ruleState,
      })
    ) {
      return;
    }

    ruleState.setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        const selectedCondition = draft.find(
          (c) => c.conditionKey === conditionKey
        );
        selectedCondition!.mode = "edit";
      })
    );
  };

  const handleLogicalOperatorChange = (logicalOperator: LogicalOperator) => {
    if (
      onLogicalOperatorChange &&
      !onLogicalOperatorChange({
        logicalOperator,
        conditionKey,
        conditionIndex: conditionIndex,
        values: values,
        ...ruleState,
      })
    ) {
      return;
    }

    ruleState.setConditions((oldConditions) =>
      produce(oldConditions, (draft) => {
        const selectedCondition = draft.find(
          (c) => c.conditionKey === conditionKey
        );
        selectedCondition!.logicalOperator = logicalOperator;
      })
    );
  };

  // we need to transform the display string from AND to IF when it is the first condition
  const transformOperator = first
    ? (s: string) => capitalize(swapAndWithIf(s))
    : (s: string) => capitalize(s);

  return (
    <div
      className="view-condition__container"
      data-testid="view-condition-container"
    >
      {!readonly && !logicalOperatorReadOnly && (
        <Dropdown
          defaultValue={logicalOperator}
          onChange={(e) => {
            handleLogicalOperatorChange(e.target.value as "and" | "and not");
          }}
          options={LogicalOperators.map((o) => ({
            disabled: o === logicalOperator,
            label: transformOperator(o),
            value: o,
          }))}
          style={{ width: "150px" }}
        />
      )}
      {(readonly || logicalOperatorReadOnly) && (
        <Label value={transformOperator(logicalOperator)} width={112} />
      )}
      <Label value={title} width={184} />
      <Label value={comparator} width={72} />
      <Values
        onEdit={handleEditCondition}
        onDelete={handleDeleteCondition}
        readonly={readonly}
        disableView={disableViewCondition}
        disableEdit={disableEditCondition}
        disableDelete={disableDeleteCondition}
        onView={handleViewCondition}
      >
        {ValuesComponent && (
          <ValuesComponent
            conditionKey={conditionKey}
            conditionIndex={conditionIndex}
            {...ruleState}
            {...valuesComponentProps}
            values={values}
          />
        )}
      </Values>
    </div>
  );
};

export default ViewCondition;
