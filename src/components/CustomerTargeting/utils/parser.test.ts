// import {
//   mapAPIResponseToRulesConfig,
//   mapConfigToRuleOptions,
//   mapDisplayToRuleSet,
//   mapFormStateToRuleSet,
//   mapRuleSetToDisplay,
//   mapRuleSetToFormState,
// } from './parser';
// import {
//   customerTargetFormStateMock,
//   customerTargetRuleSetMock,
//   ruleOptionsMock,
//   rulesDisplayMock,
//   rulesConfigMock,
//   customerRulesConfigAPIResponseMock,
// } from '../__mocks__';
// import { CustomerTargetingRulesConfig } from '../types';

// describe('Parser', () => {
//   describe('mapFormStateToRules', () => {
//     it('should transform form state to rule sets', () => {
//       expect(mapFormStateToRuleSet(customerTargetFormStateMock)).toEqual(customerTargetRuleSetMock);
//     });
//   });

//   describe('mapRuleSetToFormState', () => {
//     it('should transform rule set back to form state', () => {
//       expect(mapRuleSetToFormState(customerTargetRuleSetMock)).toEqual(customerTargetFormStateMock);
//     });
//   });

//   describe.skip('mapRuleSetToDisplay', () => {
//     it('should transform rule set into component display props', () => {
//       expect(mapRuleSetToDisplay(customerTargetRuleSetMock, ruleOptionsMock, rulesConfigMock)).toEqual(
//         rulesDisplayMock
//       );
//     });
//   });

//   describe('mapDisplayToRuleSet', () => {
//     it('should transform component display props back to rule set', () => {
//       expect(mapDisplayToRuleSet(rulesDisplayMock)).toEqual(customerTargetRuleSetMock);
//     });
//   });

//   describe('mapConfigToRuleOptions', () => {
//     it('should transform config from API into component rule options', () => {
//       const ruleOption = JSON.stringify(mapConfigToRuleOptions(rulesConfigMock));
//       expect(ruleOption).toEqual(JSON.stringify(ruleOptionsMock));
//     });
//   });

//   describe('mapAPIResponseToRulesConfig', () => {
//     it('should transform the api response to the expected component state', () => {
//       const expectedResult: CustomerTargetingRulesConfig[] = [
//         {
//           name: 'Visit Attributes',
//           rules: [
//             {
//               key: 'profile.VisitAttributes.FirstPlatformDevice',
//               name: 'First Platform Device',
//               supported_conditions: ['=', '!=', 'in'],
//               type: 'string',
//               values: [
//                 {
//                   name: 'Android',
//                   value: 'android',
//                 },
//                 {
//                   name: 'iOS',
//                   value: 'ios',
//                 },
//                 {
//                   name: 'Mobile Web',
//                   value: 'mweb',
//                 },
//               ],
//             },
//             {
//               key: 'profile.VisitAttributes.TotalVisits',
//               name: 'Total Visits',
//               supported_conditions: ['>', '<', '>=', '<=', '=', '!=', 'in'],
//               type: 'int',
//               values: [],
//             },
//             {
//               key: 'profile.VisitAttributes.LastVisitTimestamp',
//               name: 'Last Visited Timestamp',
//               supported_conditions: ['>', '<', '>=', '<=', '=', '!=', 'in'],
//               type: 'time',
//               values: [],
//             },
//             {
//               key: 'profile.VisitAttributes.SignedUpDateLocal',
//               name: 'Signed Up Date',
//               supported_conditions: ['>', '<', '>=', '<=', '=', '!=', 'in'],
//               type: 'date',
//               values: [],
//             },
//           ],
//         },
//         {
//           name: 'Customer',
//           rules: [
//             {
//               key: 'profile.VisitAttributes.IsGuest',
//               name: 'Guest',
//               supported_conditions: ['=', '!='],
//               type: 'bool',
//               values: [],
//             },
//           ],
//         },
//         {
//           name: 'Order Attributes',
//           rules: [
//             {
//               key: 'profile.OrderAttributes.NightHourOrderRate',
//               name: 'Night Hour Order Rate',
//               supported_conditions: ['>', '<', '>=', '<=', '=', '!=', 'in'],
//               type: 'float',
//               values: [
//                 {
//                   name: 'min',
//                   value: '0',
//                 },
//                 {
//                   name: 'max',
//                   value: '1',
//                 },
//               ],
//             },
//             {
//               key: 'dummyProfile.freeTextInput',
//               name: 'Free Text Input',
//               supported_conditions: [' == ', ' not '],
//               type: 'string',
//               values: [],
//             },
//           ],
//         },
//       ];
//       expect(mapAPIResponseToRulesConfig(customerRulesConfigAPIResponseMock)).toStrictEqual(expectedResult);
//     });
//   });
// });
export {};
