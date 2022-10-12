// import React from 'react';
// import '@testing-library/jest-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { ConditionEditor } from './ConditionEditor';
// import { ConditionEditorProps } from '../types';
// import {
//   basicRulesMock,
//   defaultConditionMock,
//   conditionsMock,
//   ruleOptionsMock,
//   addedConditionMock,
//   freeTextConditionMock,
// } from '../__mocks__/mocks';

// export const defaultConditionEditorProps: ConditionEditorProps = {
//   section: basicRulesMock,
//   conditionKey: 'condition-key-0',
//   conditionIndex: 0,
//   ruleKey: 'rule-key-0',
//   options: ruleOptionsMock,
//   conditions: conditionsMock,
//   addNewMode: false,
//   setOptions: jest.fn(),
//   setConditions: jest.fn(),
//   setAddNewMode: jest.fn(),
// };

// describe('ConditionEditor', () => {
//   it('renders', () => {
//     const { asFragment } = render(<ConditionEditor {...defaultConditionEditorProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it('upon applying, triggers setCondition and setAddNewMode', () => {
//     const setConditionsMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor {...defaultConditionEditorProps} setConditions={setConditionsMock} />
//     );
//     userEvent.click(getByTestId('tab-content-footer-select-btn'));
//     expect(setConditionsMock).toHaveBeenCalledTimes(1);
//   });

//   it('upon applying, triggers setAddNewMode if its adding a new condition', () => {
//     const setAddNewModeMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor
//         {...defaultConditionEditorProps}
//         conditions={[]}
//         addNewMode={true}
//         setAddNewMode={setAddNewModeMock}
//       />
//     );
//     userEvent.click(getByTestId('tab-content-footer-select-btn'));
//     expect(setAddNewModeMock).toHaveBeenCalledTimes(1);
//   });

//   it('upon cancel, triggers setAddNewMode if its a new condition', () => {
//     const setConditionsMock = jest.fn();
//     const setAddNewModeMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor
//         {...defaultConditionEditorProps}
//         conditions={[]}
//         addNewMode={true}
//         setConditions={setConditionsMock}
//         setAddNewMode={setAddNewModeMock}
//       />
//     );
//     userEvent.click(getByTestId('tab-content-footer-remove-btn'));
//     expect(setAddNewModeMock).toHaveBeenCalledTimes(1);
//     expect(setConditionsMock).toHaveBeenCalledTimes(0);
//   });

//   it('upon cancel, triggers setCondition if its an existing condition', () => {
//     const setConditionsMock = jest.fn();
//     const setAddNewModeMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor
//         {...defaultConditionEditorProps}
//         setConditions={setConditionsMock}
//         setAddNewMods={setAddNewModeMock}
//       />
//     );
//     userEvent.click(getByTestId('tab-content-footer-remove-btn'));
//     expect(setAddNewModeMock).toHaveBeenCalledTimes(0);
//     expect(setConditionsMock).toHaveBeenCalledTimes(1);
//   });

//   it('upon delete, triggers setCondition', () => {
//     const setConditionsMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor {...defaultConditionEditorProps} setConditions={setConditionsMock} />
//     );
//     userEvent.click(getByTestId('profile-selector-delete-button'));
//     expect(setConditionsMock).toHaveBeenCalledTimes(1);
//   });

//   it('updates upon changing field key', () => {
//     const { getByTestId } = render(<ConditionEditor {...defaultConditionEditorProps} />);
//     const fieldKeyInput = getByTestId('profile-editor-field-key-control');
//     const defaultSelection = basicRulesMock.rules[0].key;
//     expect(fieldKeyInput).toHaveValue(defaultSelection);

//     const SECOND_INDEX = 1;
//     const newSelection = basicRulesMock.rules[SECOND_INDEX].key;
//     userEvent.selectOptions(fieldKeyInput, newSelection);
//     expect(fieldKeyInput).toHaveValue(newSelection);
//   });

//   it('updates upon changing single value', () => {
//     const { getByTestId } = render(<ConditionEditor {...defaultConditionEditorProps} />);
//     const selectInput = getByTestId('profile-editor-select-control');
//     const NEW_SELECTION_MOCK = 'ios';
//     expect(selectInput).not.toHaveValue(NEW_SELECTION_MOCK);

//     userEvent.selectOptions(selectInput, NEW_SELECTION_MOCK);
//     expect(selectInput).toHaveValue(NEW_SELECTION_MOCK);
//   });

//   it('updates upon changing comparator for multiple values', () => {
//     const { getByTestId } = render(<ConditionEditor {...defaultConditionEditorProps} />);

//     const FIELD_KEY_WITH_MULTIPLE_VALUES_SUPPORT = 'profile.VisitAttributes.FirstPlatformDevice';
//     const fieldKeyInput = getByTestId('profile-editor-field-key-control');
//     userEvent.selectOptions(fieldKeyInput, FIELD_KEY_WITH_MULTIPLE_VALUES_SUPPORT);

//     const comparatorInput = getByTestId('profile-editor-comparator-control');
//     const MULTIPLE_VALUES_COMPARATOR = 'in';

//     userEvent.selectOptions(comparatorInput, MULTIPLE_VALUES_COMPARATOR);
//     const valueInput = getByTestId('profile-editor-multiple-select-control');
//     expect(fieldKeyInput).toHaveValue(FIELD_KEY_WITH_MULTIPLE_VALUES_SUPPORT);
//     expect(comparatorInput).toHaveValue(MULTIPLE_VALUES_COMPARATOR);
//     expect(valueInput).toHaveValue('0 selected');
//   });
// });

// describe('ConditionEditor: applying condition', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('fire setCondition and addNewMode after confirming the prompt alert', () => {
//     jest.spyOn(window, 'confirm').mockImplementation(() => true);
//     const setConditionsMock = jest.fn();
//     const setAddNewModeMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor
//         {...defaultConditionEditorProps}
//         conditions={[defaultConditionMock]}
//         addNewMode={true}
//         setConditions={setConditionsMock}
//         setAddNewMode={setAddNewModeMock}
//       />
//     );
//     userEvent.click(getByTestId('tab-content-footer-select-btn'));
//     const SINGLE_CALL_COUNT = 1;
//     expect(setConditionsMock).toHaveBeenCalledTimes(SINGLE_CALL_COUNT);
//     expect(setConditionsMock).toHaveBeenCalledWith(addedConditionMock);
//     expect(setAddNewModeMock).toHaveBeenCalledTimes(SINGLE_CALL_COUNT);
//     expect(setAddNewModeMock).toHaveBeenCalledWith(false);
//   });

//   it('should trim whitespaces from string values', () => {
//     const setConditionsMock = jest.fn();
//     const { getByTestId } = render(
//       <ConditionEditor
//         {...defaultConditionEditorProps}
//         conditions={[defaultConditionMock]}
//         addNewMode={true}
//         setConditions={setConditionsMock}
//         setAddNewMode={jest.fn()}
//       />
//     );
//     userEvent.selectOptions(getByTestId('profile-editor-field-key-control'), 'Free Text Input');
//     userEvent.type(getByTestId('profile-editor-text-input-control'), ' android ');
//     userEvent.click(getByTestId('tab-content-footer-select-btn'));
//     expect(setConditionsMock).toHaveBeenCalledTimes(1);
//     expect(setConditionsMock).toHaveBeenCalledWith(freeTextConditionMock);
//   });
// });
export {};
