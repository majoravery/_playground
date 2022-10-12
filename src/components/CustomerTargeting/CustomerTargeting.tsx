import React, { useEffect, useMemo, useState } from "react";
import { isEmpty } from "ramda";
import { Skeleton } from "@deliveryhero/armor";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Rules, TOption as RuleOption, TRule } from "../Rules";
// import "./CustomerTargeting.scss";
import "./CustomerTargeting.css";
import {
  CustomerTargetingProps,
  CustomerTargetingRulesConfig,
  UIStatus,
} from "./types";
import {
  mapFormStateToRuleSet,
  mapRuleSetToFormState,
  mapRuleSetToDisplay,
  mapDisplayToRuleSet,
  mapConfigToRuleOptions,
  getRuleKey,
  mapAPIResponseToRulesConfig,
  noop,
} from "./utils";
import { CustomerStatistics } from "./CustomerStatistics/CustomerStatistics";
import { getIsAnyRuleFilled } from "./utils/helper";

const defaultValidityCallback = (isValid: boolean) => noop(isValid);

export const CustomerTargeting: React.FC<CustomerTargetingProps> = ({
  profileRules: profile_rules,
  disabled,
  rulesConfigAPIResponse,
  pluginType,
  pluginId,
  updateCallbacks: {
    updateProfileRules,
    areRulesValid = defaultValidityCallback,
  },
  hideFetchCountButton = false,
}) => {
  const rulesConfig: CustomerTargetingRulesConfig[] = useMemo(
    () => mapAPIResponseToRulesConfig(rulesConfigAPIResponse),
    [rulesConfigAPIResponse]
  );
  const ruleOptionsProp: RuleOption[] = useMemo(
    () => mapConfigToRuleOptions(rulesConfig),
    [rulesConfig]
  );
  const memoParsedRules = useMemo(() => {
    if (isEmpty(rulesConfig)) return [];
    const ruleSets = mapFormStateToRuleSet(profile_rules);
    return mapRuleSetToDisplay(ruleSets, ruleOptionsProp, rulesConfig);
  }, [profile_rules, rulesConfig, ruleOptionsProp]);

  const [uiStatus, setUIStatus] = useState(UIStatus.NORMAL);
  const [areRulesEdited, setAreRulesEdited] = useState(false);
  const [rules, setRules] = useState<TRule[]>(memoParsedRules);

  useDeepCompareEffect(() => {
    setRules(memoParsedRules);
  }, [memoParsedRules]);

  useEffect(() => {
    const ruleSets = mapDisplayToRuleSet(rules);
    const mutationObject = mapRuleSetToFormState(ruleSets);
    setAreRulesEdited(true);
    updateProfileRules(mutationObject);
  }, [rules]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddRule = () => ({
    ruleKey: getRuleKey(rules.length),
    title: `Rule #${rules.length + 1}`,
    options: ruleOptionsProp,
    readonly: disabled,
  });

  useEffect(() => {
    if (
      areRulesValid !== defaultValidityCallback ||
      process.env.NODE_ENV !== "development"
    )
      return;
    const logWarning = (string: string) =>
      console.log(`%c****** ${string} ******`, "color: orange");
    logWarning(
      'Please provide a "areRulesValid" callback when using Audience Targeting Widget!'
    );
    logWarning(
      "This callback informs the plugin whether a set of Audience Targeting rules are valid"
    );
    logWarning(
      "Please prevent creation of the incentive if rules are not valid"
    );
    logWarning(
      "because invalid rules will error downstream in the Audience Targeting Service!"
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isEmpty(rulesConfig)) {
    return null;
  }
  if (isEmpty(ruleOptionsProp)) {
    return <Skeleton />;
  }
  const isAnyRuleFilled = getIsAnyRuleFilled(profile_rules);
  const showStatistics = !hideFetchCountButton && isAnyRuleFilled;
  return (
    <div className="customer-profiling">
      <div className="customer-profiling-rules-wrapper">
        {uiStatus === UIStatus.LOADING && (
          <Skeleton
            className="customer-profiling-rules-loading"
            data-testid="customer-profiling-rules-loading"
          />
        )}
        <Rules
          rules={rules}
          setRules={setRules}
          onAddRule={handleAddRule}
          enableAdd={!disabled}
          readonly={uiStatus === UIStatus.READONLY || disabled}
        />
      </div>
      {showStatistics && (
        <CustomerStatistics
          profileRules={profile_rules}
          uiStatus={uiStatus}
          setUiStatus={(uiStatus: UIStatus) => setUIStatus(uiStatus)}
          pluginType={pluginType}
          pluginId={pluginId}
          areRulesValidCallback={areRulesValid}
          areRulesEdited={areRulesEdited}
        />
      )}
    </div>
  );
};
