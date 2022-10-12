// import { head, nth, omit } from 'ramda';
// import mmtSdk from '../../../mmtSdk';
// import {
//   getConfigByKey,
//   getRuleKey,
//   findProfileFromConditions,
//   getDefaultProfile,
//   findConfigByKey,
//   getLocalDateTime,
//   formatForDisplay,
//   getFilledRules,
//   getIsAnyRuleFilled,
//   checkIfRulesAreEqual,
//   isRuleFilled,
// } from './helper';
// import {
//   profileConfigsMock,
//   conditionsMock,
//   basicRulesMock,
//   defaultProfileWithStringValueMock,
//   defaultProfileWithMultipleValuesMock,
//   profileWithIntValueMock,
//   profileWithDatetimeValueMock,
//   profileWithDateValueMock,
//   profileWithSingleSelectionValueMock,
//   profileWithBoolValueMock,
//   rulesDisplayMock,
// } from 'components/CustomerTargeting/__mocks__/mocks';
// import { CustomerTargetingRulesConfig } from '../types';
// import { TRule } from '../../Rules';

// describe('helper', () => {
//   beforeEach(() => {
//     jest.spyOn(mmtSdk, 'getActiveCountry').mockImplementation(() => ({ geid: 'FP_TH', code: 'th' }));
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('returns findConfigByKey correctly', () => {
//     const result = findConfigByKey('profile.VisitAttributes.FirstPlatformDevice', profileConfigsMock);
//     const EXPECTED_CONFIG_INDEX = 0;
//     const expected = nth(EXPECTED_CONFIG_INDEX, profileConfigsMock);
//     expect(result).toEqual(expected);
//   });

//   it('returns undefined findConfigByKey', () => {
//     const result = findConfigByKey('some-random-config-key', profileConfigsMock);
//     expect(result).not.toBeDefined();
//   });

//   it('returns empty config', () => {
//     const result = getConfigByKey('some-random-config-key', []);
//     expect(result).toEqual({
//       name: '',
//       key: '',
//       supported_conditions: [],
//       type: 'string',
//       values: [],
//     });
//   });

//   it('returns getConfigByKey correctly', () => {
//     const result = getConfigByKey('profile.VisitAttributes.TotalVisits', profileConfigsMock);
//     const EXPECTED_CONFIG_INDEX = 1;
//     const expected = nth(EXPECTED_CONFIG_INDEX, profileConfigsMock);
//     expect(result).toEqual(expected);
//   });

//   it('returns default config if key not found', () => {
//     const result = getConfigByKey('some-random-config-key', profileConfigsMock);
//     const expected = head(profileConfigsMock);
//     expect(result).toEqual(expected);
//   });

//   it('returns getRuleKey correctly', () => {
//     const MOCK_RULE_INDEX = 0;
//     const result = getRuleKey(MOCK_RULE_INDEX);
//     const expected = MOCK_RULE_INDEX;
//     expect(result).toEqual(expected);
//   });

//   it('returns findProfileFromConditions correctly', () => {
//     const result = findProfileFromConditions('First Platform Device-0', conditionsMock);
//     const EXPECTED_CONDITION_INDEX = 0;
//     const expectedCondition = conditionsMock[EXPECTED_CONDITION_INDEX];
//     const expectedProfile = expectedCondition.values?.profile;
//     expect(result).toEqual(expectedProfile);
//   });

//   it('returns getDefaultProfile with string value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, defaultProfileWithStringValueMock.fieldKey);
//     expect(result).toEqual(defaultProfileWithStringValueMock);
//   });

//   it('returns getDefaultProfile with single selection value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, profileWithSingleSelectionValueMock.fieldKey);
//     expect(result).toEqual(profileWithSingleSelectionValueMock);
//   });

//   it('returns getDefaultProfile with int value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, profileWithIntValueMock.fieldKey);
//     expect(result).toEqual(profileWithIntValueMock);
//   });

//   it('returns getDefaultProfile with boolean value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, profileWithBoolValueMock.fieldKey);
//     expect(result).toEqual(profileWithBoolValueMock);
//   });

//   it('returns getDefaultProfile with datetime value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, profileWithDatetimeValueMock.fieldKey);
//     const resultWithoutValue = omit(['value'], result);
//     const expectedProfileWithoutValue = omit(['value'], profileWithDatetimeValueMock);
//     const dateValue = new Date(`${result.value}`);
//     expect(resultWithoutValue).toEqual(expectedProfileWithoutValue);
//     expect(dateValue instanceof Date).toBeTruthy();
//   });

//   it('return getDefaultProfile with date value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock, profileWithDateValueMock.fieldKey);
//     const resultWithoutValue = omit(['value'], result);
//     const expectedProfileWithoutValue = omit(['value'], profileWithDateValueMock);
//     const dateValue = new Date(`${result.value}`);
//     expect(resultWithoutValue).toEqual(expectedProfileWithoutValue);
//     expect(dateValue instanceof Date).toBeTruthy();
//   });

//   it('returns getDefaultProfile with default value correctly', () => {
//     const result = getDefaultProfile(basicRulesMock);
//     expect(result).toEqual(profileWithSingleSelectionValueMock);
//   });

//   it('returns getDefaultProfile with multiple values correctly', () => {
//     const sectionWithMultipleValuesByDefault: CustomerTargetingRulesConfig = {
//       name: 'Basic Information',
//       rules: [
//         {
//           key: 'profile.VisitAttributes.FirstPlatformDevice',
//           name: 'Modified First Platform Device',
//           supported_conditions: [' in '],
//           type: 'string',
//           values: [
//             { name: 'Android', value: 'android' },
//             { name: 'iOS', value: 'ios' },
//           ],
//         },
//       ],
//     };
//     const result = getDefaultProfile(sectionWithMultipleValuesByDefault, defaultProfileWithMultipleValuesMock.fieldKey);
//     expect(result).toEqual(defaultProfileWithMultipleValuesMock);
//   });

//   it('returns fallback from getDefaultProfile if the config is missing some of the attributes', () => {
//     const sectionWithoutRules: CustomerTargetingRulesConfig = {
//       name: 'Corrupted Section',
//       rules: [],
//     };
//     expect(getDefaultProfile(sectionWithoutRules)).toEqual({
//       fieldKey: '',
//       comparator: '',
//       value: '',
//     });

//     const sectionWithoutComparator: CustomerTargetingRulesConfig = {
//       name: 'Corrupted Section',
//       rules: [
//         {
//           key: 'dummyProfile.Corrupted.Profile',
//           name: 'Corrupted Profile',
//           supported_conditions: [],
//           type: 'string',
//           values: [
//             { name: 'Android', value: 'android' },
//             { name: 'iOS', value: 'ios' },
//             { name: 'Mobile Web', value: 'mweb' },
//           ],
//         },
//       ],
//     };
//     expect(getDefaultProfile(sectionWithoutComparator)).toEqual({
//       fieldKey: 'dummyProfile.Corrupted.Profile',
//       comparator: '',
//       value: 'android',
//     });
//   });

//   it('returns getDefaultProfile when no type are matched', () => {
//     const result = getDefaultProfile(basicRulesMock, 'some-random-profile-key');
//     expect(result).toEqual(profileWithSingleSelectionValueMock);
//   });

//   it('returns getLocalDateTime correctly', () => {
//     const ISO_DATE_STRING = '2020-12-04T05:32:12.205Z';
//     const localDateTime = getLocalDateTime(ISO_DATE_STRING);
//     const result = localDateTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//     const ISO_DATE_STRING_THAILAND = '2020-12-04T12:32:12.205+07:00';
//     expect(result).toEqual(ISO_DATE_STRING_THAILAND);
//   });

//   it('returns SG local date time when sdk fails to return active country', () => {
//     jest.spyOn(mmtSdk, 'getActiveCountry').mockImplementation(() => null);
//     const ISO_DATE_STRING = '2020-12-04T05:32:12.205Z';
//     const localDateTime = getLocalDateTime(ISO_DATE_STRING);
//     const result = localDateTime.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
//     const ISO_DATE_STRING_SINGAPORE = '2020-12-04T13:32:12.205+08:00';
//     expect(result).toEqual(ISO_DATE_STRING_SINGAPORE);
//   });

//   it('returns formatForDisplay correctly', () => {
//     const ISO_DATE_STRING = '2020-12-04T05:32:12.205Z';
//     const FORMATTED_DATE_THAILAND = '2020/12/04 12:32 PM';

//     const localDateTime = getLocalDateTime(ISO_DATE_STRING);
//     const result = formatForDisplay(localDateTime);
//     expect(result).toEqual(FORMATTED_DATE_THAILAND);
//   });

//   it('checks whether a rule has filled conditions', () => {
//     const ruleWithoutCondition: TRule = { ...rulesDisplayMock[0], conditions: [] };
//     const ruleWithCondition = rulesDisplayMock[1];
//     expect(isRuleFilled(ruleWithoutCondition)).toBeFalsy();
//     expect(isRuleFilled(ruleWithCondition)).toBeTruthy();
//   });
//   it('returns all rules with valid conditions', () => {
//     const ruleWithoutCondition: TRule = { ...rulesDisplayMock[0], conditions: [] };
//     const mockRules = [ruleWithoutCondition, rulesDisplayMock[1]];
//     const expectedResult = [rulesDisplayMock[1]];
//     expect(getFilledRules(mockRules)).toStrictEqual(expectedResult);
//   });
//   it('checks whether at least one rule is filled with valid conditions', () => {
//     const ruleWithoutCondition: TRule = { ...rulesDisplayMock[0], conditions: [] };
//     expect(getIsAnyRuleFilled([ruleWithoutCondition])).toBeFalsy();
//     expect(getIsAnyRuleFilled(rulesDisplayMock)).toBeTruthy();
//   });
//   it('checks if two rules have same core attributes', () => {
//     expect(checkIfRulesAreEqual([rulesDisplayMock[1]], rulesDisplayMock)).toBeFalsy();
//     expect(checkIfRulesAreEqual(rulesDisplayMock, rulesDisplayMock)).toBeTruthy();
//   });
// });
export {};
