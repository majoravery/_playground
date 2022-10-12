import { CustomerStatisticsState } from './types';
import { getIsAnyRuleFilled } from '../utils';
import { CustomerTargetingRules } from '..';

export const shouldEnableGetCountButton = ({
  areCustomerCodesProcessed,
  haveRulesChanged,
  backendApiLoading,
  customerStatistics,
  profileRules,
  isDisabled,
}: {
  areCustomerCodesProcessed: boolean;
  haveRulesChanged: boolean;
  backendApiLoading: boolean;
  customerStatistics: CustomerStatisticsState | null;
  profileRules: CustomerTargetingRules[];
  isDisabled: boolean;
}) => {
  if (areCustomerCodesProcessed || backendApiLoading || isDisabled) {
    return false;
  }
  const isAnyRuleFilled = getIsAnyRuleFilled(profileRules);
  if (isAnyRuleFilled && !customerStatistics) {
    return true;
  } else if (isAnyRuleFilled && haveRulesChanged) {
    return true;
  } else {
    return false;
  }
};

export const getFormattedDate = (dateTime: string): string => {
  const dateObj = new Date(dateTime);
  return dateObj.toLocaleString();
};
