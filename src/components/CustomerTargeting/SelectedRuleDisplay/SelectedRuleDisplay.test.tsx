// import React from "react";
// import { render } from "@testing-library/react";
// import { head } from "ramda";
// import { SelectedRuleDisplay } from ".";
// import {
//   profileWithMultipleValuesMock,
//   profileWithSingleSelectionValueMock,
//   rulesConfigMock,
// } from "../__mocks__";
// import { CustomerTargetingRulesConfig } from "../types";

// const defaultProps = {
//   conditionKey: "",
//   conditionIndex: 0,
//   ruleKey: "",
//   options: [],
//   conditions: [],
//   values: {
//     profile: profileWithSingleSelectionValueMock,
//   },
//   addNewMode: false,
//   setOptions: jest.fn(),
//   setConditions: jest.fn(),
//   setAddNewMode: jest.fn(),
//   configs: (head(rulesConfigMock) as CustomerTargetingRulesConfig)?.rules || [],
// };

// describe("SelectedRuleDisplay", () => {
//   it("renders single tag", () => {
//     const { asFragment } = render(<SelectedRuleDisplay {...defaultProps} />);
//     expect(asFragment()).toMatchSnapshot();
//   });

//   it("renders multiple tags", () => {
//     const { asFragment } = render(
//       <SelectedRuleDisplay
//         {...defaultProps}
//         values={{ profile: profileWithMultipleValuesMock }}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
export {};
