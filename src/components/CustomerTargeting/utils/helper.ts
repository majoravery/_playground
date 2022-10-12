import { Profile, ProfileConfig, CustomerTargetingRulesConfig } from "../types";
import { defaultTo, head, find, equals, isNil } from "ramda";
// import { getActiveCountry } from '../../../utils/country';
import { UserComponentBaseProps } from "../../Rules";
import { CustomerTargetingRules } from "..";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const findConfigByKey = (
  profileKey: Profile["fieldKey"],
  configs: ProfileConfig[]
): ProfileConfig | undefined => find(({ key }) => key === profileKey, configs);

export const getConfigByKey = (
  key: string,
  configs: ProfileConfig[]
): ProfileConfig => {
  const emptyConfig: ProfileConfig = {
    name: "",
    key: "",
    supported_conditions: [],
    type: "string",
    values: [],
  };
  return defaultTo(head(configs) || emptyConfig, findConfigByKey(key, configs));
};

export const getRuleKey = (rule_index: number): number => rule_index;

export const findProfileFromConditions = (
  conditionKey: UserComponentBaseProps["conditionKey"],
  conditions: UserComponentBaseProps["conditions"]
): Profile | null => {
  const matchingCondition = find(
    (c) => c.conditionKey === conditionKey,
    conditions
  );
  return (matchingCondition?.values?.profile as Profile) || null;
};

export const getComparatorFromSupportedCondition = (
  supported_condition: string
): string => {
  return supported_condition.replace("==", "=").trim();
};

export const getDefaultProfile = (
  rulesConfig: CustomerTargetingRulesConfig,
  profileKey?: Profile["fieldKey"]
): Profile => {
  const firstConfig = head(rulesConfig.rules) || {
    name: "",
    key: "",
    supported_conditions: [],
    type: "string",
    values: [],
  };
  const profileConfig = profileKey
    ? getConfigByKey(profileKey, rulesConfig.rules)
    : firstConfig;

  let defaultValue: Profile["value"];
  const defaultComparator = head(profileConfig.supported_conditions) || "";

  switch (profileConfig.type) {
    case "bool":
      defaultValue = true;
      break;
    case "float":
    case "int":
      const ZERO = 0;
      defaultValue = ZERO;
      break;
    case "time":
    case "date":
      defaultValue = serializeDateToString(new Date(), profileConfig.type);
      break;
    case "string":
    default: {
      if (defaultComparator.includes("in")) {
        defaultValue = [];
        break;
      }
      if (isNil(profileConfig.values)) {
        defaultValue = "";
        break;
      }
      defaultValue = head(profileConfig.values)?.value || "";
    }
  }

  return {
    fieldKey: profileConfig.key,
    comparator: getComparatorFromSupportedCondition(defaultComparator),
    value: defaultValue,
  };
};

const timezoneMap = {
  FP_SG: "Asia/Singapore",
  FP_TW: "Asia/Taipei",
  FP_PK: "Asia/Karachi",
  FP_BD: "Asia/Dhaka",
  FP_PH: "Asia/Manila",
  FP_TH: "Asia/Bangkok",
  FP_HK: "Asia/Hong_Kong",
  FP_MY: "Asia/Kuala_Lumpur",
  FP_BG: "Europe/Sofia",
  FP_RO: "Europe/Bucharest",
  FP_KH: "Asia/Phnom_Penh",
  FP_LA: "Asia/Vientiane",
  FP_MM: "Asia/Yangon",
  FP_JP: "Asia/Tokyo",
  FP_DE: "Europe/Berlin",
  FP_SK: "Europe/Bratislava",
  // foodora
  FO_NO: "Europe/Oslo",
  OP_SE: "Europe/Stockholm",
  PO_FI: "Europe/Helsinki",
  DJ_CZ: "Europe/Prague",
  NP_HU: "Europe/Budapest",
  MJM_AT: "Europe/Vienna",
};

export const serializeDateToString = (
  date: Date | null,
  type: "time" | "date"
): string => {
  // formatting the date this way assumes the editor's current timezone to be the timezone of the output date
  if (date && type === "date") return formatForApi(dayjs(date));
  if (date && type === "time") return date.toISOString();
  return "";
};

export const getLocalDateTime = (isoDate: string): dayjs.Dayjs => {
  // return dayjs(isoDate).tz(timezoneMap[getActiveCountry()]);
  return dayjs(isoDate).tz(timezoneMap["FP_SG"]);
};

export const getDateToday = (): dayjs.Dayjs => dayjs(new Date());

// NOTE: the date format here follows dayjs's date format syntax. not the same as the date-fns in react-datepicker
export const formatDate = (dt: dayjs.Dayjs, format: string) =>
  dt.format(format);

export const formatForDisplay = (dt: dayjs.Dayjs): string =>
  formatDate(dt, "YYYY/MM/DD HH:mm A");

export const formatForApi = (dt: dayjs.Dayjs): string =>
  formatDate(dt, "YYYY-MM-DD");

export const isRuleFilled = (rule: CustomerTargetingRules) =>
  rule.conditions.length > 0;

export const getFilledRules = (rules: CustomerTargetingRules[]) =>
  rules.filter(isRuleFilled);

export const getIsAnyRuleFilled = (rules: CustomerTargetingRules[]) =>
  getFilledRules(rules).length > 0;

export const checkIfRulesAreEqual = (
  oldRules: CustomerTargetingRules[],
  newRules: CustomerTargetingRules[]
) => equals(oldRules, newRules);

// Function.prototype is an way of constructing () => {} without getting a warning
export const noop = Function.prototype;
