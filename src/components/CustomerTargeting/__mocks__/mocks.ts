import { TOption, TRule, TCondition } from '../../Rules';
import {
  RuleSet,
  CustomerTargetingRulesConfig,
  ProfileConfig,
  Profile,
  CustomerTargetingRules,
  CustomerRulesConfigAPIResponseType,
} from '../types';
import { CustomerStatisticsState, CustomerStatisticsAPIResponse } from '../CustomerStatistics/types';

export const profileConfigsMock: ProfileConfig[] = [
  {
    key: 'profile.VisitAttributes.FirstPlatformDevice',
    name: 'First Platform Device',
    supported_conditions: [' == ', ' in '],
    type: 'string',
    values: [
      { name: 'Android', value: 'android' },
      { name: 'iOS', value: 'ios' },
      { name: 'Mobile Web', value: 'mweb' },
    ],
  },
  {
    key: 'profile.VisitAttributes.TotalVisits',
    name: 'Total Visits',
    supported_conditions: [' == ', ' > ', ' >= ', ' <= ', ' < '],
    type: 'int',
    values: [{ name: 'min', value: '0' }],
  },
  {
    key: 'profile.VisitAttributes.LastVisitTimestamp',
    name: 'Last Visit Timestamp',
    supported_conditions: [' == ', ' > ', ' >= ', ' <= ', ' < '],
    type: 'time',
    values: [],
  },
  {
    key: 'profile.VisitAttributes.IsGuest',
    name: 'Guest',
    supported_conditions: [' == '],
    type: 'bool',
    values: [],
  },
  {
    key: 'profile.OrderAttributes.NightHourOrderRate',
    name: 'Night Hour Order Rate',
    supported_conditions: [' == ', ' > ', ' >= ', ' <= ', ' < '],
    type: 'float',
    values: [],
  },
  {
    key: 'dummyProfile.freeTextInput',
    name: 'Free Text Input',
    supported_conditions: [' == ', ' not '],
    type: 'string',
    values: [],
  },
  {
    key: 'profile.VisitAttributes.SignedUpDateLocal',
    name: 'Signed Up Date',
    supported_conditions: [' == ', ' > ', ' >= ', ' <= ', ' < '],
    type: 'date',
    values: [],
  },
];

export const basicRulesMock: CustomerTargetingRulesConfig = {
  name: 'Basic Information',
  rules: profileConfigsMock,
};

export const rulesConfigMock: CustomerTargetingRulesConfig[] = [
  basicRulesMock,
  {
    name: 'Visit Attributes',
    rules: [
      {
        key: 'profile.VisitAttributes.ActiveLast2Weeks',
        name: 'Active Last 2 Weeks',
        supported_conditions: [' == '],
        type: 'bool',
        values: [],
      },
    ],
  },
  {
    name: 'Order Attributes',
    rules: [
      {
        key: 'profile.OrderAttributes.NightHourOrderRate',
        name: 'Night Hour Order Rate',
        supported_conditions: ['==', '>', '>=', '<=', '<'],
        type: 'float',
        values: [
          { name: 'min', value: '0' },
          { name: 'max', value: '1' },
        ],
      },
    ],
  },
];

export const ruleOptionsMock: TOption[] = [
  {
    EditComponent: function anonymous(): null {
      return null;
    },
    ValuesComponent: (): null => null,
    type: 'Basic Information',
    onDeleteCondition: function onDeleteCondition(): boolean {
      return true;
    },
    title: 'Basic Information',
    contentTitle: 'Basic Information',
  },
  {
    EditComponent: function anonymous(): null {
      return null;
    },
    ValuesComponent: (): null => null,
    type: 'Visit Attributes',
    onDeleteCondition: function onDeleteCondition(): boolean {
      return true;
    },
    title: 'Visit Attributes',
    contentTitle: 'Visit Attributes',
  },
  {
    EditComponent: function anonymous(): null {
      return null;
    },
    ValuesComponent: (): null => null,
    type: 'Order Attributes',
    onDeleteCondition: function onDeleteCondition(): boolean {
      return true;
    },
    title: 'Order Attributes',
    contentTitle: 'Order Attributes',
  },
];

export const defaultProfileWithStringValueMock: Profile = {
  fieldKey: 'dummyProfile.freeTextInput',
  comparator: '=',
  value: '',
};

export const profileWithStringValueMock: Profile = {
  fieldKey: 'dummyProfile.freeTextInput',
  comparator: 'not',
  value: 'some random text',
};

export const profileWithSingleSelectionValueMock: Profile = {
  fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
  comparator: '=',
  value: 'android',
};

export const profileWithMultipleValuesMock: Profile = {
  fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
  comparator: 'in',
  value: ['android', 'mweb'],
};

export const defaultProfileWithMultipleValuesMock: Profile = {
  fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
  comparator: 'in',
  value: [],
};

export const profileWithIntValueMock: Profile = {
  fieldKey: 'profile.VisitAttributes.TotalVisits',
  comparator: '=',
  value: 0,
};

export const profileWithFloatValueMock: Profile = {
  fieldKey: 'profile.OrderAttributes.NightHourOrderRate',
  comparator: '>=',
  value: 0.1,
};

export const profileWithBoolValueMock: Profile = {
  fieldKey: 'profile.VisitAttributes.IsGuest',
  comparator: '=',
  value: true,
};

export const profileWithDatetimeValueMock: Profile = {
  fieldKey: 'profile.VisitAttributes.LastVisitTimestamp',
  comparator: '=',
  value: '2020-11-05T00:00:00.000Z',
};

export const profileWithDateValueMock: Profile = {
  fieldKey: 'profile.VisitAttributes.SignedUpDateLocal',
  comparator: '=',
  value: '2020-11-05',
};

export const customerTargetFormStateMock: CustomerTargetingRules[] = [
  {
    conditions: [
      {
        field: 'profile.VisitAttributes.FirstPlatformDevice',
        comparator: '=',
        value: 'android',
        operator: 'and_not',
      },
      {
        field: 'profile.VisitAttributes.LastVisitTimestamp',
        comparator: '>',
        value: '2020-11-05T00:00:00.000Z',
        operator: 'and',
      },
    ],
  },
  {
    conditions: [
      {
        field: 'profile.VisitAttributes.LastVisitTimestamp',
        comparator: '>',
        value: '2020-11-05T00:00:00.000Z',
        operator: 'and',
      },
      {
        field: 'profile.VisitAttributes.TotalVisits',
        comparator: '>=',
        value: 100,
        operator: 'and',
      },
      {
        field: 'profile.VisitAttributes.ActiveLast2Weeks',
        comparator: '=',
        value: true,
        operator: 'and',
      },
      {
        field: 'profile.VisitAttributes.SignedUpDateLocal',
        comparator: '>',
        value: '2020-11-05',
        operator: 'and',
      },
    ],
  },
];

export const customerTargetRuleSetMock: RuleSet[] = [
  {
    conditions: [
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
          comparator: '=',
          value: 'android',
        },
        logicalOperator: 'and not',
      },
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.LastVisitTimestamp',
          comparator: '>',
          value: '2020-11-05T00:00:00.000Z',
        },
        logicalOperator: 'and',
      },
    ],
  },
  {
    conditions: [
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.LastVisitTimestamp',
          comparator: '>',
          value: '2020-11-05T00:00:00.000Z',
        },
        logicalOperator: 'and',
      },
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.TotalVisits',
          comparator: '>=',
          value: 100,
        },
        logicalOperator: 'and',
      },
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.ActiveLast2Weeks',
          comparator: '=',
          value: true,
        },
        logicalOperator: 'and',
      },
      {
        profile: {
          fieldKey: 'profile.VisitAttributes.SignedUpDateLocal',
          comparator: '>',
          value: '2020-11-05',
        },
        logicalOperator: 'and',
      },
    ],
  },
];

export const defaultConditionMock: TCondition = {
  comparator: '=',
  conditionKey: 'First Platform Device-0',
  conditionReadOnly: false,
  logicalOperator: 'and not',
  logicalOperatorReadOnly: false,
  mode: 'view',
  title: 'First Platform Device',
  type: 'Basic Information',
  values: {
    profile: {
      comparator: '=',
      fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
      value: 'android',
    },
  },
};

export const addedConditionMock: TCondition[] = [
  defaultConditionMock,
  {
    comparator: '=',
    conditionKey: 'First Platform Device-1',
    conditionReadOnly: false,
    logicalOperator: 'and',
    logicalOperatorReadOnly: false,
    mode: 'view',
    title: 'First Platform Device',
    type: 'Basic Information',
    values: {
      profile: {
        comparator: '=',
        fieldKey: 'profile.VisitAttributes.FirstPlatformDevice',
        value: 'android',
      },
    },
  },
];

export const freeTextConditionMock: TCondition[] = [
  defaultConditionMock,
  {
    comparator: '=',
    conditionKey: 'Free Text Input-1',
    conditionReadOnly: false,
    logicalOperator: 'and',
    logicalOperatorReadOnly: false,
    mode: 'view',
    title: 'Free Text Input',
    type: 'Basic Information',
    values: {
      profile: {
        comparator: '=',
        fieldKey: 'dummyProfile.freeTextInput',
        value: 'android',
      },
    },
  },
];

const timeConditionMock: TCondition = {
  comparator: '>',
  conditionKey: 'Last Visit Timestamp-1',
  conditionReadOnly: false,
  logicalOperator: 'and',
  logicalOperatorReadOnly: false,
  mode: 'view',
  title: 'Last Visit Timestamp',
  type: 'Basic Information',
  values: {
    profile: {
      comparator: '>',
      fieldKey: 'profile.VisitAttributes.LastVisitTimestamp',
      value: '2020-11-05T00:00:00.000Z',
    },
  },
};

const dateConditionMock: TCondition = {
  comparator: '>',
  conditionKey: 'Signed Up Date-1',
  conditionReadOnly: false,
  logicalOperator: 'and',
  logicalOperatorReadOnly: false,
  mode: 'view',
  title: 'Signed Up Date',
  type: 'Basic Information',
  values: {
    profile: {
      comparator: '>',
      fieldKey: 'profile.VisitAttributes.SignedUpDateLocal',
      value: '2020-11-05',
    },
  },
};

export const conditionsMock: TCondition[] = [
  defaultConditionMock,
  {
    ...timeConditionMock,
    conditionKey: 'Last Visit Timestamp-0',
  },
];

export const rulesDisplayMock: TRule[] = [
  {
    addNewMode: false,
    conditions: conditionsMock,
    options: ruleOptionsMock,
    optionsSidebarTitle: 'Rule Options',
    ruleKey: 0,
    title: 'Rule #1',
  },
  {
    addNewMode: false,
    conditions: [
      timeConditionMock,
      {
        comparator: '>=',
        conditionKey: 'Total Visits-1',
        conditionReadOnly: false,
        logicalOperator: 'and',
        logicalOperatorReadOnly: false,
        mode: 'view',
        title: 'Total Visits',
        type: 'Basic Information',
        values: {
          profile: {
            comparator: '>=',
            fieldKey: 'profile.VisitAttributes.TotalVisits',
            value: 100,
          },
        },
      },
      {
        comparator: '=',
        conditionKey: 'Active Last 2 Weeks-1',
        conditionReadOnly: false,
        logicalOperator: 'and',
        logicalOperatorReadOnly: false,
        mode: 'view',
        title: 'Active Last 2 Weeks',
        type: 'Visit Attributes',
        values: {
          profile: {
            comparator: '=',
            fieldKey: 'profile.VisitAttributes.ActiveLast2Weeks',
            value: true,
          },
        },
      },
      dateConditionMock,
    ],
    options: ruleOptionsMock,
    optionsSidebarTitle: 'Rule Options',
    ruleKey: 1,
    title: 'Rule #2',
  },
];

export const customerRulesConfigAPIResponseMock: CustomerRulesConfigAPIResponseType = [
  {
    name: 'Visit Attributes',
    rules: {
      'profile.VisitAttributes.FirstPlatformDevice': {
        display_name: 'First Platform Device',
        supported_comparator: ['=', '!=', 'in'],
        supported_type: 'string',
        values: [
          { name: 'Android', value: 'android' },
          { name: 'iOS', value: 'ios' },
          { name: 'Mobile Web', value: 'mweb' },
        ],
        section: 'Visit Attributes',
      },
      'profile.VisitAttributes.TotalVisits': {
        display_name: 'Total Visits',
        supported_comparator: ['>', '<', '>=', '<=', '=', '!=', 'in'],
        supported_type: 'int',
        values: null as unknown as { name: string; value: string }[],
        section: 'Visit Attributes',
      },
      'profile.VisitAttributes.LastVisitTimestamp': {
        display_name: 'Last Visited Timestamp',
        supported_comparator: ['>', '<', '>=', '<=', '=', '!=', 'in'],
        supported_type: 'time',
        values: [],
        section: 'Visit Attributes',
      },
      'profile.VisitAttributes.SignedUpDateLocal': {
        display_name: 'Signed Up Date',
        supported_comparator: ['>', '<', '>=', '<=', '=', '!=', 'in'],
        supported_type: 'date',
        values: [],
        section: 'Visit Attributes',
      },
    },
  },
  {
    name: 'Customer',
    rules: {
      'profile.VisitAttributes.IsGuest': {
        display_name: 'Guest',
        supported_comparator: ['=', '!='],
        supported_type: 'bool',
        values: [],
        section: 'Customer',
      },
    },
  },
  {
    name: 'Order Attributes',
    rules: {
      'profile.OrderAttributes.NightHourOrderRate': {
        display_name: 'Night Hour Order Rate',
        supported_comparator: ['>', '<', '>=', '<=', '=', '!=', 'in'],
        supported_type: 'float',
        values: [
          { name: 'min', value: '0' },
          { name: 'max', value: '1' },
        ],
        section: 'Order Attributes',
      },
      'dummyProfile.freeTextInput': {
        display_name: 'Free Text Input',
        supported_comparator: [' == ', ' not '],
        supported_type: 'string',
        values: [],
        section: 'Order Attributes',
      },
    },
  },
];

export const customerStatisticsDataMock: CustomerStatisticsState = {
  count: 1000,
  lastUpdated: '',
  links: [],
};

export const customerStatisticsAPIDataMock: CustomerStatisticsState = {
  count: 800,
  lastUpdated: '2021-05-10T12:58:26+08:00',
  links: [],
};

export const customerStatisticsAPIDataWithLinksMock: CustomerStatisticsState = {
  count: 800,
  lastUpdated: '2021-05-10T12:58:26+08:00',
  links: ['https://www.google.com', 'https://www.foodpanda.sg'],
};

export const customerStatisticsAPIResponseWithoutLinksMock: { data: CustomerStatisticsAPIResponse } = {
  data: {
    data: {
      final_count: 800,
      queried_at: '2021-05-10T12:58:26+08:00',
      profile_rule_counts: [],
    },
  },
};

export const customerStatisticsAPIResponseWithLinksMock: { data: CustomerStatisticsAPIResponse } = {
  data: {
    data: {
      final_count: 800,
      queried_at: '2021-05-10T12:58:26+08:00',
      customer_codes_s3_url: 'https://www.google.com,https://www.foodpanda.sg',
      profile_rule_counts: [],
    },
  },
};
