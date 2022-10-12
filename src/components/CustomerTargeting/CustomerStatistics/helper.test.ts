// import { getFormattedDate, shouldEnableGetCountButton } from './helpers';
// import { customerStatisticsDataMock, customerTargetFormStateMock } from '../__mocks__';

// describe('helpers', () => {
//   describe('shouldEnableGetCountButton', () => {
//     const defaultArgs = {
//       areCustomerCodesProcessed: false,
//       haveRulesChanged: false,
//       backendApiLoading: false,
//       customerStatistics: null,
//       profileRules: [],
//     };

//     it('returns false if there is an api call in progress', () => {
//       const args = { ...defaultArgs, backendApiLoading: true };
//       expect(shouldEnableGetCountButton(args)).toBeFalsy();
//     });
//     it('returns false if customer codes are processed', () => {
//       const args = { ...defaultArgs, areCustomerCodesProcessed: true };
//       expect(shouldEnableGetCountButton(args)).toBeFalsy();
//     });
//     it('returns false if no rules are configured', () => {
//       const args = { ...defaultArgs };
//       expect(shouldEnableGetCountButton(args)).toBeFalsy();
//     });
//     it('returns true if rules are configured for the first time', () => {
//       const args = { ...defaultArgs, profileRules: customerTargetFormStateMock };
//       expect(shouldEnableGetCountButton(args)).toBeTruthy();
//     });
//     it('returns true if rules are changed', () => {
//       const args = {
//         ...defaultArgs,
//         customerStatistics: customerStatisticsDataMock,
//         profileRules: customerTargetFormStateMock,
//         haveRulesChanged: true,
//       };
//       expect(shouldEnableGetCountButton(args)).toBeTruthy();
//     });
//   });
//   describe.skip('getFormattedDate', () => {
//     it('returns date in the expected format', () => {
//       const mockDate = '2021-05-10T12:58:26+08:00';
//       expect(getFormattedDate(mockDate)).toEqual('10/05/2021, 04:58:26');
//     });
//   });
// });
export {};
