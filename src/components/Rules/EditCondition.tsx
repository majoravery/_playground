/* eslint-disable react/prop-types */
import React, { useState, useMemo } from "react";
import { Key, ICondition, IRuleState, TOption } from "./types";
import Options from "./Options";
import { useRuleState } from "./hooks";

interface Props {
  conditionKey?: Key;
  conditionIndex?: number;
  optionsSidebarTitle?: string;
  values?: ICondition["values"];
}

const optionNotDisabled =
  (ruleState: IRuleState) =>
  (option: TOption): boolean => {
    if (typeof option.disabled === "function") {
      return !option.disabled(ruleState);
    } else {
      return !option.disabled;
    }
  };

const EditCondition: React.FC<Props> = ({
  conditionKey,
  conditionIndex,
  optionsSidebarTitle = "",
  values,
}) => {
  const ruleState = useRuleState();
  const firstNonDisabledOptionIndex = ruleState.options.findIndex(
    optionNotDisabled(ruleState)
  );
  const [index, setIndex] = useState(firstNonDisabledOptionIndex);

  React.useEffect(() => {
    setIndex(firstNonDisabledOptionIndex);
  }, [firstNonDisabledOptionIndex]);

  const selectedCondition = useMemo(
    () => ruleState.conditions.find((c) => c.conditionKey === conditionKey),
    [conditionKey, ruleState.conditions]
  );
  const selectedOption = useMemo(() => {
    if (selectedCondition === undefined) return ruleState.options[index];
    return (
      ruleState.options.find((o) => o.type === selectedCondition.type) ||
      ruleState.options[index]
    );
  }, [index, selectedCondition, ruleState.options]);
  const EditComponent = selectedOption?.EditComponent;
  const defaultComponentProps = selectedOption?.editComponentProps;

  return (
    <div className="edit-condition__container">
      {!selectedCondition && (
        <div className="edit-condition__sidebar">
          <Options
            title={optionsSidebarTitle}
            options={ruleState.options}
            onOptionClick={setIndex}
            activeIndex={index}
          />
        </div>
      )}
      <div className="edit-condition__content">
        {selectedOption?.contentTitle && (
          <p className="edit-condition__text--title">
            {selectedOption.contentTitle}
          </p>
        )}
        {selectedOption?.contentSubtitle && (
          <p className="edit-condition__text--subtitle">
            {selectedOption?.contentSubtitle}
          </p>
        )}
        <div className="edit-condition__custom-content">
          {selectedOption && (
            <EditComponent
              conditionKey={conditionKey}
              conditionIndex={conditionIndex}
              {...ruleState}
              values={values}
              readonly={
                selectedCondition?.conditionReadOnly || ruleState.readonly
              }
              {...defaultComponentProps}
              {...(selectedCondition?.editComponentProps || {})}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCondition;
