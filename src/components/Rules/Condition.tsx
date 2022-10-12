/* eslint-disable react/prop-types */
import React from "react";
import { ICondition } from "./types";
import ViewCondition from "./ViewCondition";
import EditCondition from "./EditCondition";

interface Props extends ICondition {
  first?: boolean;
}

const Condition: React.FC<Props> = ({
  conditionKey,
  conditionIndex,
  logicalOperator,
  onLogicalOperatorChange,
  logicalOperatorReadOnly,
  comparator,
  values,
  title,
  mode,
  conditionReadOnly = false,
  first,
  onEditCondition,
  onDeleteCondition,
  onViewCondition,
  disableViewCondition,
  disableEditCondition,
  disableDeleteCondition,
  ValuesComponent,
  valuesComponentProps,
  children,
}) => {
  return (
    <>
      {mode === "view" ? (
        <ViewCondition
          comparator={comparator}
          conditionIndex={conditionIndex}
          conditionKey={conditionKey}
          conditionReadOnly={conditionReadOnly}
          disableDeleteCondition={disableDeleteCondition}
          disableEditCondition={disableEditCondition}
          disableViewCondition={disableViewCondition}
          first={first}
          logicalOperator={logicalOperator}
          logicalOperatorReadOnly={logicalOperatorReadOnly}
          onDeleteCondition={onDeleteCondition}
          onEditCondition={onEditCondition}
          onLogicalOperatorChange={onLogicalOperatorChange}
          onViewCondition={onViewCondition}
          title={title}
          values={values}
          ValuesComponent={ValuesComponent}
          valuesComponentProps={valuesComponentProps}
        />
      ) : (
        <EditCondition
          conditionIndex={conditionIndex}
          conditionKey={conditionKey}
          values={values}
        />
      )}
      {children}
    </>
  );
};

export default Condition;
