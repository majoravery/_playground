// /* eslint-disable testing-library/no-node-access */
// /* eslint-disable testing-library/prefer-screen-queries */
// /* eslint-disable jest/no-mocks-import */
// import React from "react";
// import { render, waitFor, fireEvent, cleanup } from "@testing-library/react";
// import { CustomerStatistics } from "./CustomerStatistics";
// import { CustomerStatisticsProps, CustomerStatisticsState } from "./types";
// import { PluginType, UIStatus } from "../types";
// import {
//   customerStatisticsAPIDataMock,
//   customerStatisticsAPIDataWithLinksMock,
//   customerTargetFormStateMock,
// } from "../__mocks__";
// import * as apiHelpers from "./api";
// import * as helpers from "./helpers";

// const defaultProps: CustomerStatisticsProps = {
//   profileRules: customerTargetFormStateMock,
//   uiStatus: UIStatus.NORMAL,
//   setUiStatus: jest.fn(),
//   areRulesValidCallback: jest.fn(),
//   areRulesEdited: false,
//   pluginId: null,
//   pluginType: PluginType.Campaign,
// };

// describe("Customer Statistics Component", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//     cleanup();
//   });
//   it("allows user to fetch customer statistics if rules are filled", async () => {
//     const props = { ...defaultProps };
//     jest
//       .spyOn(apiHelpers, "fetchCount")
//       .mockResolvedValue(
//         customerStatisticsAPIDataMock as CustomerStatisticsState
//       );
//     jest.spyOn(helpers, "getFormattedDate");

//     const { getByText, getByTestId } = render(
//       <CustomerStatistics {...props} />
//     );

//     expect(getByText(/Preview Audience Size/i)).toBeVisible();

//     fireEvent.click(getByText(/Preview Audience Size/i));

//     await waitFor(() =>
//       expect(getByTestId("customer-count-text")).toBeVisible()
//     );

//     expect(props.setUiStatus).toHaveBeenCalledTimes(2);
//     expect(props.setUiStatus).toHaveBeenNthCalledWith(1, UIStatus.LOADING);
//     expect(props.setUiStatus).toHaveBeenNthCalledWith(2, UIStatus.NORMAL);
//     expect(apiHelpers.fetchCount).toHaveBeenCalledTimes(1);
//     expect(apiHelpers.fetchCount).toHaveBeenCalledWith({
//       profileRules: props.profileRules,
//       pluginId: "",
//       pluginType: props.pluginType,
//     });

//     expect(getByTestId("customer-count-text")).toHaveTextContent(
//       "Total Audience Size is 800"
//     );
//     expect(getByTestId("customer-count-updated-text")).toHaveTextContent(
//       "Last Updated"
//     );
//     expect(helpers.getFormattedDate).toHaveBeenCalled();
//     expect(helpers.getFormattedDate).toHaveBeenLastCalledWith(
//       customerStatisticsAPIDataMock.lastUpdated
//     );

//     expect(
//       getByTestId("customer-statistics-notification-message")
//     ).toHaveTextContent(
//       "You will receive a notification on slack once the audience list is ready for download"
//     );
//   });
//   it("allows user to fetch customer statistics again if rules have been changed", async () => {
//     const props = { ...defaultProps };
//     jest
//       .spyOn(apiHelpers, "fetchCount")
//       .mockResolvedValue(
//         customerStatisticsAPIDataMock as CustomerStatisticsState
//       );

//     const { getByText, getByTestId, queryByTestId, rerender } = render(
//       <CustomerStatistics {...props} />
//     );

//     fireEvent.click(getByText(/Preview Audience Size/i));

//     await waitFor(() =>
//       expect(getByTestId("customer-count-text")).toBeVisible()
//     );

//     expect(getByText(/Preview Audience Size/i)).toBeDisabled();
//     expect(getByTestId("customer-count-text")).toHaveTextContent(
//       "Total Audience Size is 800"
//     );
//     expect(getByTestId("customer-count-updated-text")).toHaveTextContent(
//       "Last Updated"
//     );

//     const changedProfileRules = JSON.parse(
//       JSON.stringify([...defaultProps.profileRules])
//     );
//     changedProfileRules[1].conditions[1].value = 50;
//     props.profileRules = changedProfileRules;
//     rerender(<CustomerStatistics {...props} />);

//     await waitFor(() =>
//       expect(getByText(/Preview Audience Size/i)).not.toBeDisabled()
//     );

//     expect(queryByTestId("customer-count-text")).not.toBeInTheDocument();
//     expect(
//       queryByTestId("customer-count-updated-text")
//     ).not.toBeInTheDocument();
//   });
//   it("auto fetches the customer count when the rules are already configured", async () => {
//     const props: CustomerStatisticsProps = {
//       ...defaultProps,
//       pluginId: "testPluginId",
//     };

//     jest
//       .spyOn(apiHelpers, "fetchCount")
//       .mockResolvedValue(
//         customerStatisticsAPIDataMock as CustomerStatisticsState
//       );

//     const { getByTestId } = render(<CustomerStatistics {...props} />);

//     await waitFor(() =>
//       expect(getByTestId("customer-count-text")).toBeVisible()
//     );

//     expect(apiHelpers.fetchCount).toHaveBeenCalledTimes(1);
//     expect(props.setUiStatus).toHaveBeenCalledTimes(2);
//     expect(props.setUiStatus).toHaveBeenLastCalledWith(UIStatus.NORMAL);

//     expect(getByTestId("customer-count-text")).toHaveTextContent(
//       "Total Audience Size is 800"
//     );
//   });
//   it("displays all the customer code download links in a modal", async () => {
//     const props: CustomerStatisticsProps = {
//       ...defaultProps,
//       pluginId: "testPluginId",
//     };
//     const mockCountAPIResponse =
//       customerStatisticsAPIDataWithLinksMock as CustomerStatisticsState;
//     jest
//       .spyOn(apiHelpers, "fetchCount")
//       .mockResolvedValue(mockCountAPIResponse);

//     const { getByText, getByTestId } = render(
//       <CustomerStatistics {...props} />
//     );

//     await waitFor(() =>
//       expect(getByText(/Download Audience List/i)).toBeVisible()
//     );

//     expect(apiHelpers.fetchCount).toHaveBeenCalledTimes(1);
//     expect(props.setUiStatus).toHaveBeenLastCalledWith(UIStatus.READONLY);

//     fireEvent.click(getByText(/Download Audience List/i));

//     await waitFor(() =>
//       expect(getByTestId("customer-code-download-links-modal")).toBeVisible()
//     );
//     const expectedDownloadLinks = customerStatisticsAPIDataWithLinksMock.links;
//     expect(
//       getByTestId("customer-code-download-links-wrapper").children
//     ).toHaveLength(2);
//     expect(getByText("campaign-testPluginId-1")).toHaveAttribute(
//       "href",
//       expectedDownloadLinks[0]
//     );
//     expect(getByText("campaign-testPluginId-2")).toHaveAttribute(
//       "href",
//       expectedDownloadLinks[1]
//     );
//   });
// });
export {};
