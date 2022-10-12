// import React from "react";
// import "@testing-library/jest-dom";
// import { head } from "ramda";
// import { fireEvent, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { ProfileEditor } from ".";
// import { ProfileEditorProps } from "../types";
// import {
//   profileConfigsMock,
//   profileWithStringValueMock,
//   profileWithMultipleValuesMock,
//   profileWithSingleSelectionValueMock,
//   profileWithIntValueMock,
//   profileWithFloatValueMock,
//   profileWithDatetimeValueMock,
//   profileWithDateValueMock,
//   profileWithBoolValueMock,
// } from "../__mocks__";
// const defaultComponentProps: ProfileEditorProps = {
//   configs: profileConfigsMock,
//   profile: profileWithSingleSelectionValueMock,
//   onChange: jest.fn(),
// };

// jest.mock("../utils/helper", () => {
//   const originalModule = jest.requireActual("../utils/helper");

//   return {
//     __esModule: true,
//     ...originalModule,
//     formatDate: jest.fn(() => "31/12/2021"),
//   };
// });

// describe("ProfileEditor", () => {
//   it("renders", () => {
//     const { asFragment } = render(<ProfileEditor {...defaultComponentProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it("triggers change for fieldKey", () => {
//     const onChangeMock = jest.fn();
//     const { getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         configs={profileConfigsMock}
//         onChange={onChangeMock}
//       />
//     );
//     const fieldKeyInput = getByTestId("profile-editor-field-key-control");
//     expect(fieldKeyInput).not.toBeNull();

//     const NEW_FIELD_KEY_MOCK_1 = profileConfigsMock[1].key;
//     const NEW_FIELD_KEY_MOCK_2 = profileConfigsMock[0].key;
//     userEvent.selectOptions(fieldKeyInput, NEW_FIELD_KEY_MOCK_1);
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { fieldKey: NEW_FIELD_KEY_MOCK_1 },
//       profileConfigsMock[0]
//     );
//     userEvent.selectOptions(fieldKeyInput, NEW_FIELD_KEY_MOCK_2);
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { fieldKey: NEW_FIELD_KEY_MOCK_2 },
//       profileConfigsMock[0]
//     );
//   });

//   it("triggers change for comparator", () => {
//     const onChangeMock = jest.fn();
//     const { getByTestId } = render(
//       <ProfileEditor {...defaultComponentProps} onChange={onChangeMock} />
//     );
//     const comparatorInput = getByTestId("profile-editor-comparator-control");
//     expect(comparatorInput).not.toBeNull();

//     const NEW_COMPARATOR_MOCK_1 = "in";
//     const NEW_COMPARATOR_MOCK_2 = "=";
//     userEvent.selectOptions(comparatorInput, NEW_COMPARATOR_MOCK_1);
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { comparator: NEW_COMPARATOR_MOCK_1 },
//       profileConfigsMock[0]
//     );
//     userEvent.selectOptions(comparatorInput, NEW_COMPARATOR_MOCK_2);
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { comparator: NEW_COMPARATOR_MOCK_2 },
//       profileConfigsMock[0]
//     );
//   });

//   it("renders text input", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithStringValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     const firstSnapshot = asFragment();
//     expect(firstSnapshot).toMatchSnapshot();
//     const textInput = getByTestId("profile-editor-text-input-control");
//     expect(textInput).not.toBeNull();

//     const NEW_TEXT_MOCK_1 = "brand new text";
//     fireEvent.change(textInput, { target: { value: NEW_TEXT_MOCK_1 } });
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { value: NEW_TEXT_MOCK_1 },
//       profileConfigsMock[5]
//     );

//     const NEW_TEXT_MOCK_2 = "another text";
//     fireEvent.change(textInput, { target: { value: NEW_TEXT_MOCK_2 } });
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { value: NEW_TEXT_MOCK_2 },
//       profileConfigsMock[5]
//     );
//   });

//   it("renders select input", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithSingleSelectionValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const selectionInput = getByTestId("profile-editor-select-control");
//     expect(selectionInput).not.toBeNull();

//     const NEW_SELECTION_MOCK = "ios";
//     userEvent.selectOptions(selectionInput, NEW_SELECTION_MOCK);
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_SELECTION_MOCK },
//       profileConfigsMock[0]
//     );
//   });

//   it("renders number input", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithIntValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const numberInput = getByTestId("profile-editor-number-input-control");
//     expect(numberInput).not.toBeNull();

//     const NEW_NUMBER_MOCK = "5";
//     fireEvent.change(numberInput, { target: { value: NEW_NUMBER_MOCK } });
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_NUMBER_MOCK },
//       profileConfigsMock[1]
//     );
//   });

//   it("renders float number input", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithFloatValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const numberInput = getByTestId("profile-editor-number-input-control");
//     expect(numberInput).not.toBeNull();

//     const NEW_NUMBER_MOCK = "0.3";
//     fireEvent.change(numberInput, { target: { value: NEW_NUMBER_MOCK } });
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_NUMBER_MOCK },
//       profileConfigsMock[4]
//     );
//   });

//   it("renders boolean selection input", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithBoolValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const booleanInput = getByTestId("profile-editor-bool-input-control");
//     expect(booleanInput).not.toBeNull();

//     const NEW_BOOL_MOCK = "false";
//     userEvent.selectOptions(booleanInput, NEW_BOOL_MOCK);
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_BOOL_MOCK },
//       profileConfigsMock[3]
//     );
//   });

//   it("renders datepicker for time inputs", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithDatetimeValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const datepickerContainer = getByTestId(
//       "profile-editor-datepicker-control"
//     );
//     expect(datepickerContainer).not.toBeNull();

//     const NEW_DATETIME_STRING_MOCK = "2020-12-04T00:00:00.205Z";
//     const datepickerInput = datepickerContainer.querySelector("input");
//     fireEvent.change(datepickerInput, {
//       target: { value: NEW_DATETIME_STRING_MOCK },
//     });
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_DATETIME_STRING_MOCK },
//       profileConfigsMock[2]
//     );
//   });

//   it("renders datepicker for date inputs", () => {
//     const onChangeMock = jest.fn();
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithDateValueMock}
//         onChange={onChangeMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const datepickerContainer = getByTestId(
//       "profile-editor-datepicker-control"
//     );
//     expect(datepickerContainer).not.toBeNull();

//     const NEW_DATE_STRING_MOCK = "2020-12-04";
//     const datepickerInput = datepickerContainer.querySelector("input");
//     fireEvent.change(datepickerInput, {
//       target: { value: NEW_DATE_STRING_MOCK },
//     });
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: NEW_DATE_STRING_MOCK },
//       profileConfigsMock[6]
//     );
//   });
// });

// describe("ProfileEditor: multiple selection options", () => {
//   it("renders correctly", () => {
//     const { asFragment, getByTestId, queryByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithMultipleValuesMock}
//       />
//     );
//     const multipleSelectorControl = getByTestId(
//       "profile-editor-multiple-select-control"
//     );
//     expect(multipleSelectorControl).toHaveValue("2 selected");
//     expect(asFragment()).toMatchSnapshot();
//     const optionsModalBody = queryByTestId(
//       "profile-editor-multiple-select-options-modal-body"
//     );
//     expect(optionsModalBody).toBeNull();
//   });

//   it("renders empty value", () => {
//     const emptyProfileWithMultipleValuesMock = {
//       ...profileWithMultipleValuesMock,
//       value: [],
//     };
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={emptyProfileWithMultipleValuesMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const multipleSelectorControl = getByTestId(
//       "profile-editor-multiple-select-control"
//     );
//     expect(multipleSelectorControl).toHaveValue("0 selected");
//   });

//   it("renders fallback value", () => {
//     const corruptedProfileWithMultipleValuesMock = {
//       ...profileWithMultipleValuesMock,
//       value: "",
//     };
//     const { asFragment, getByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={corruptedProfileWithMultipleValuesMock}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//     const multipleSelectorControl = getByTestId(
//       "profile-editor-multiple-select-control"
//     );
//     expect(multipleSelectorControl).toHaveValue("0 selected");
//   });

//   it("renders options modal correctly", () => {
//     const onChangeMock = jest.fn();
//     const { getByTestId, queryByTestId, getAllByTestId, getByRole } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithMultipleValuesMock}
//         onChange={onChangeMock}
//       />
//     );
//     const multipleSelectorControl = getByTestId(
//       "profile-editor-multiple-select-control"
//     );

//     userEvent.click(multipleSelectorControl);

//     const optionsModalBody = queryByTestId(
//       "profile-editor-multiple-select-options-modal-body"
//     );
//     expect(optionsModalBody).not.toBeNull();
//     const optionsCount = head(defaultComponentProps.configs).values.length;
//     const selectorOption = getAllByTestId(
//       "profile-editor-multiple-select-option"
//     );
//     expect(selectorOption).toHaveLength(optionsCount);

//     const modalBackdrop = getByRole("dialog");
//     userEvent.click(modalBackdrop);

//     const optionsModalBody2 = queryByTestId(
//       "profile-editor-multiple-select-options-modal-body"
//     );
//     expect(optionsModalBody2).toBeNull();
//   });

//   it("triggers change events correctly", () => {
//     const onChangeMock = jest.fn();
//     const { getByTestId, getAllByTestId } = render(
//       <ProfileEditor
//         {...defaultComponentProps}
//         profile={profileWithMultipleValuesMock}
//         onChange={onChangeMock}
//       />
//     );
//     const multipleSelectorControl = getByTestId(
//       "profile-editor-multiple-select-control"
//     );

//     userEvent.click(multipleSelectorControl);

//     const selectorOption = getAllByTestId(
//       "profile-editor-multiple-select-option"
//     );

//     const IOS_OPTION_INDEX = 1;
//     userEvent.click(selectorOption[IOS_OPTION_INDEX]);
//     expect(onChangeMock).toHaveBeenLastCalledWith(
//       { value: ["ios", "android", "mweb"] },
//       profileConfigsMock[0]
//     );

//     const ANDROID_OPTION_INDEX = 0;
//     userEvent.click(selectorOption[ANDROID_OPTION_INDEX]);
//     expect(onChangeMock).toHaveBeenCalledWith(
//       { value: ["mweb"] },
//       profileConfigsMock[0]
//     );
//   });
// });
export {};
