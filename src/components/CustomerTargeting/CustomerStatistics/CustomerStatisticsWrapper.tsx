import React, { useState } from 'react';
import { CustomerStatistics } from './CustomerStatistics';
import { CustomerTargetingProps, UIStatus } from '../types';
import { CustomerStatisticsProps } from './types';
import { noop } from '../utils';

type CustomerStatisticsWrapperProps = Omit<CustomerTargetingProps, 'updateCallbacks' | 'rulesConfigAPIResponse'> &
  Pick<CustomerTargetingProps['updateCallbacks'], 'areRulesValid'> &
  Pick<CustomerStatisticsProps, 'hideFetchCountButton' | 'customerStatisticsData'>;

export const CustomerStatisticsWrapper: React.FC<CustomerStatisticsWrapperProps> = ({
  profileRules: profile_rules,
  pluginId,
  pluginType,
  disabled,
  hideFetchCountButton = false,
  areRulesValid = isValid => noop(isValid),
  customerStatisticsData = null,
}) => {
  const [uiStatus, setUIStatus] = useState(disabled ? UIStatus.DISABLED : UIStatus.NORMAL);

  return (
    <CustomerStatistics
      profileRules={profile_rules}
      uiStatus={uiStatus}
      setUiStatus={(uiStatus: UIStatus) => setUIStatus(uiStatus)}
      areRulesValidCallback={areRulesValid}
      pluginType={pluginType}
      pluginId={pluginId}
      areRulesEdited={false}
      hideFetchCountButton={hideFetchCountButton}
      customerStatisticsData={customerStatisticsData}
    />
  );
};
