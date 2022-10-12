import { CustomerTargetingRules } from '..';
import { CustomerTargetingProps, UIStatus } from '../types';

export type CustomerStatisticsProps = {
  profileRules: CustomerTargetingRules[];
  uiStatus: UIStatus;
  setUiStatus: (uiStatus: UIStatus) => void;
  areRulesValidCallback: Required<CustomerTargetingProps['updateCallbacks']>['areRulesValid'];
  areRulesEdited: boolean;
  hideFetchCountButton?: boolean;
  customerStatisticsData?: CustomerStatisticsState | null;
} & Pick<CustomerTargetingProps, 'pluginType' | 'pluginId'>;

export type CustomerStatisticsState = {
  count: number;
  lastUpdated: string;
  links: string[];
};

export type CustomerStatisticsAPIResponse = {
  data: {
    profile_rule_counts: number[];
    final_count: number;
    queried_at: string;
    customer_codes_s3_url?: string;
  };
};
