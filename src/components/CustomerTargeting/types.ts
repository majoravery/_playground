import { UserComponentBaseProps } from "../Rules";
import { LogicalOperator } from "../Rules/types";

export type CustomerRulesConfigAPIResponseType = {
  name: string;
  rules: Record<
    string,
    {
      display_name: string;
      supported_comparator: string[] | null;
      supported_type: "string" | "time" | "int" | "float" | "bool" | "date";
      values: { name: string; value: string }[];
      section: string;
    }
  >;
}[];

export type Operator = "if" | "if_not" | "and" | "and_not";

interface ProfileCondition {
  operator: Operator;
  comparator: string;
  field: string;
  value: Value;
}

export interface CustomerTargetingRules {
  conditions: ProfileCondition[];
}

export interface ProfileConfig {
  name: string; // profile option label, e.g. 'Active Last 2 weeks'
  key: string; // field name e.g. 'active_last_2_weeks'
  supported_conditions: string[];
  type: "string" | "int" | "float" | "bool" | "time" | "date";
  values: Array<{ name: string; value: string }>;
}

export interface CustomerTargetingRulesConfig {
  name: string; // Tab label
  rules: ProfileConfig[];
}

type Value = string | number | boolean | string[];

export interface Profile {
  fieldKey: string; // e.g. active_last_2_weeks
  comparator: string; // e.g. '=', '>=', 'in'
  value: Value;
}

// represent the row in customer profiling
export interface Condition {
  profile: Profile;
  logicalOperator: LogicalOperator;
}

// represent a set of rule (displayed as Rule #1, Rule #2, etc..)
// can have multiple rules which relate to each other with OR logic
export interface RuleSet {
  conditions: Condition[];
}

export interface ConditionEditorProps extends UserComponentBaseProps {
  section: CustomerTargetingRulesConfig;
}

export interface ProfileEditorProps {
  configs: ProfileConfig[];
  profile: Profile;
  onChange: (
    changes: Partial<Pick<Profile, "fieldKey" | "comparator" | "value">>,
    config: ProfileConfig
  ) => void;
}

export enum PluginType {
  Campaign = "campaign",
  Voucher = "voucher",
  Discount = "discount",
  Experiment = "experiment",
  SkinnyBanner = "skinny_banner",
  LoyaltyChallenge = "loyalty_challenge",
  Retention = "retention",
}

export interface CustomerTargetingProps {
  profileRules: CustomerTargetingRules[];
  disabled: boolean;
  rulesConfigAPIResponse: CustomerRulesConfigAPIResponseType;
  updateCallbacks: {
    updateProfileRules: (profileRules: CustomerTargetingRules[]) => void;
    areRulesValid?: (isValid: boolean) => void;
  };
  pluginType: PluginType;
  pluginId: string | null;
  hideFetchCountButton?: boolean;
}

export enum UIStatus {
  NORMAL = "NORMAL",
  LOADING = "LOADING",
  DISABLED = "DISABLED",
  READONLY = "READONLY",
}
