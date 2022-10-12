import React from "react";
import { Tag } from "@deliveryhero/armor";
import { Profile, ProfileConfig } from "../types";
import {
  getConfigByKey,
  getLocalDateTime,
  formatForDisplay,
} from "../utils/helper";
import { UserComponentBaseProps } from "../../Rules";

export interface SelectedRuleDisplayProps extends UserComponentBaseProps {
  values: {
    profile: Profile;
  };
  configs: ProfileConfig[];
}

const SelectedRuleDisplay: React.FC<SelectedRuleDisplayProps> = ({
  values,
  configs,
}) => {
  const { profile } = values;
  const { fieldKey, value } = profile;
  const profileConfig = getConfigByKey(fieldKey, configs);
  const displayValue = ["time", "date"].includes(profileConfig.type)
    ? formatForDisplay(getLocalDateTime(`${value}`))
    : value;
  return (
    <div
      data-testid="selected-rule-display"
      style={{ marginTop: -1, marginBottom: -1 }}
    >
      {Array.isArray(displayValue) ? (
        displayValue.map((singleValue, index) => (
          <Tag key={index} label={singleValue} small />
        ))
      ) : (
        <Tag small>{`${displayValue}`}</Tag>
      )}
    </div>
  );
};

export default SelectedRuleDisplay;
