import { complement, defaultTo, find, isEmpty, isNil, not } from "ramda";
import {
  CustomerTargetingRulesConfig,
  Profile,
  ProfileConfig,
  RuleSet,
  CustomerTargetingRules,
  Operator,
  CustomerRulesConfigAPIResponseType,
} from "../types";
import {
  getConfigByKey,
  getComparatorFromSupportedCondition,
  getRuleKey,
  findConfigByKey,
} from "./helper";
import { TOption, TRule, UserComponentBaseProps } from "../../Rules";
import { ConditionEditor } from "../ConditionEditor";
import { SelectedRuleDisplay } from "../SelectedRuleDisplay";
import { LogicalOperator } from "../../Rules/types";
import { SelectedRuleDisplayProps } from "../SelectedRuleDisplay/SelectedRuleDisplay";

const isNotNil = complement(isNil);

const parseOperatorToDisplay = (operator: Operator): LogicalOperator => {
  const separator = "_";
  if (!operator.includes(separator)) {
    return operator as LogicalOperator;
  }
  const operators = operator.split(separator);
  return `${operators[0]} ${operators[1]}` as LogicalOperator;
};

const parseOperatorToState = (operator: LogicalOperator): Operator => {
  const separator = " ";
  if (!operator.includes(separator)) {
    return operator as Operator;
  }
  const operators = operator.split(separator);
  return `${operators[0]}_${operators[1]}` as Operator;
};

export const mapFormStateToRuleSet = (
  profile_rules: CustomerTargetingRules[]
): RuleSet[] => {
  return profile_rules.map((profile) => ({
    conditions: profile.conditions.map((condition) => ({
      profile: {
        fieldKey: condition.field,
        comparator: getComparatorFromSupportedCondition(condition.comparator),
        value: condition.value,
      },
      logicalOperator: parseOperatorToDisplay(condition.operator),
    })),
  }));
};

export const mapRuleSetToFormState = (
  ruleSets: RuleSet[]
): CustomerTargetingRules[] => {
  return ruleSets.map((rule) => {
    return {
      conditions: rule.conditions.map(({ logicalOperator, profile }) => ({
        operator: parseOperatorToState(logicalOperator),
        comparator: profile.comparator,
        field: profile.fieldKey,
        value: profile.value,
      })),
    };
  });
};

export const mapDisplayToRuleSet = (rules: TRule[]): RuleSet[] => {
  return rules
    .filter(({ conditions }) => not(isEmpty(conditions)))
    .map(({ conditions }) => ({
      conditions: conditions.map(({ values, logicalOperator = "and" }) => ({
        logicalOperator,
        profile: values?.profile as Profile,
      })),
    }));
};

export const mapRuleSetToDisplay = (
  ruleSets: RuleSet[],
  ruleOptions: TOption[],
  rulesConfig: CustomerTargetingRulesConfig[]
): TRule[] => {
  return ruleSets.map((rule, index) => {
    const displayObject: TRule = {
      ruleKey: getRuleKey(index),
      title: `Rule #${index + 1}`,
      optionsSidebarTitle: "Rule Options",
      options: ruleOptions,
      conditions: rule.conditions.map(({ profile, logicalOperator }) => {
        const config = find(
          ({ rules }) => isNotNil(findConfigByKey(profile.fieldKey, rules)),
          rulesConfig
        );
        const configName = defaultTo("", config?.name);
        const profileConfig = getConfigByKey(
          profile.fieldKey,
          defaultTo([], config?.rules)
        );
        const profileName = profileConfig.name;
        return {
          conditionKey: `${profileName}-${index}`,
          title: profileName,
          type: configName,
          comparator: profile.comparator,
          values: {
            profile: {
              ...profile,
              displayName: profileName,
            },
          },
          logicalOperatorReadOnly: false,
          conditionReadOnly: false,
          logicalOperator,
          mode: "view",
        };
      }),
      addNewMode: false,
    };
    return displayObject;
  });
};

export const mapConfigToRuleOptions = (
  rulesConfig: CustomerTargetingRulesConfig[]
): TOption[] => {
  return rulesConfig.map(({ name, rules }) => {
    // change '==' comparator to '='
    const modifiedRules: ProfileConfig[] = rules.map((profileConfig) => ({
      ...profileConfig,
      supported_conditions: profileConfig.supported_conditions.map(
        getComparatorFromSupportedCondition
      ),
    }));
    const EditComponent = (props: UserComponentBaseProps) => (
      <ConditionEditor section={{ name, rules: modifiedRules }} {...props} />
    );
    const ValuesComponent = (props: SelectedRuleDisplayProps) => (
      <SelectedRuleDisplay {...props} configs={modifiedRules} />
    );

    return {
      type: name,
      title: name,
      contentTitle: name,
      ValuesComponent,
      EditComponent,
    };
  });
};

export const mapAPIResponseToRulesConfig = (
  res: CustomerRulesConfigAPIResponseType
): CustomerTargetingRulesConfig[] => {
  return res.map(({ name, rules }) => ({
    name,
    rules: Object.keys(rules).map((ruleKey) => {
      const values =
        ["int", "float"].includes(rules[ruleKey].supported_type) &&
        !Array.isArray(rules[ruleKey].values)
          ? []
          : rules[ruleKey].values;
      return {
        name: rules[ruleKey].display_name,
        key: ruleKey,
        supported_conditions: rules[ruleKey].supported_comparator || [],
        type: rules[ruleKey].supported_type,
        values,
      };
    }),
  }));
};
