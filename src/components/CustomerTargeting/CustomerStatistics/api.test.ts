// /* eslint-disable jest/no-mocks-import */
// import { customerTargetFormStateMock } from "../__mocks__";
// import { PluginType } from "../types";
// import axios from "axios";
// import { fetchCount } from "./api";
// import * as graphqlHelpers from "../../../graphql/constants";
// import * as utils from "../../../utils/country/getActiveCountry";
// import { Country } from "../../../utils/country";
// import mmtSdk from "../../../mmtSdk";

// describe("fetchCount", () => {
//   afterAll(() => {
//     process.env.REACT_APP_MMT_MGMT_API = "";
//     jest.clearAllMocks();
//   });

//   it("calls the backend endpoint with the correct params", () => {
//     process.env.REACT_APP_MMT_MGMT_API = "{COUNTRY_CODE}.test.com";
//     mmtSdk.getToken = jest.fn().mockReturnValue("test-token");

//     const mockPluginId = "test-pluginId";
//     const mockPluginType = PluginType.Campaign;
//     jest.spyOn(axios, "post").mockImplementation(jest.fn());
//     jest.spyOn(graphqlHelpers, "getCountryCode").mockReturnValue("sg");
//     jest.spyOn(utils, "getActiveCountry").mockReturnValue(Country.Singapore);

//     fetchCount({
//       profileRules: customerTargetFormStateMock,
//       pluginId: "",
//       pluginType: mockPluginType,
//     });
//     expect(axios.post).toHaveBeenCalledTimes(1);
//     expect(axios.post).toHaveBeenCalledWith(
//       "sg.test.com",
//       {
//         plugin_type: "campaign",
//         profile_rules: [
//           {
//             conditions: [
//               {
//                 comparator: "=",
//                 field: "profile.VisitAttributes.FirstPlatformDevice",
//                 operator: "and_not",
//                 value: "android",
//               },
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.LastVisitTimestamp",
//                 operator: "and",
//                 value: "2020-11-05T00:00:00.000Z",
//               },
//             ],
//           },
//           {
//             conditions: [
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.LastVisitTimestamp",
//                 operator: "and",
//                 value: "2020-11-05T00:00:00.000Z",
//               },
//               {
//                 comparator: ">=",
//                 field: "profile.VisitAttributes.TotalVisits",
//                 operator: "and",
//                 value: 100,
//               },
//               {
//                 comparator: "=",
//                 field: "profile.VisitAttributes.ActiveLast2Weeks",
//                 operator: "and",
//                 value: true,
//               },
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.SignedUpDateLocal",
//                 operator: "and",
//                 value: "2020-11-05",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: "Bearer test-token",
//           "Content-Type": "application/json",
//           "X-Global-Entity-ID": "FP_SG",
//         },
//       }
//     );

//     mmtSdk.getToken = jest.fn().mockReturnValue(null);
//     fetchCount({
//       profileRules: customerTargetFormStateMock,
//       pluginId: mockPluginId,
//       pluginType: mockPluginType,
//     });
//     expect(axios.post).toHaveBeenLastCalledWith(
//       "sg.test.com",
//       {
//         plugin_object_id: "test-pluginId",
//         plugin_type: "campaign",
//         profile_rules: [
//           {
//             conditions: [
//               {
//                 comparator: "=",
//                 field: "profile.VisitAttributes.FirstPlatformDevice",
//                 operator: "and_not",
//                 value: "android",
//               },
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.LastVisitTimestamp",
//                 operator: "and",
//                 value: "2020-11-05T00:00:00.000Z",
//               },
//             ],
//           },
//           {
//             conditions: [
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.LastVisitTimestamp",
//                 operator: "and",
//                 value: "2020-11-05T00:00:00.000Z",
//               },
//               {
//                 comparator: ">=",
//                 field: "profile.VisitAttributes.TotalVisits",
//                 operator: "and",
//                 value: 100,
//               },
//               {
//                 comparator: "=",
//                 field: "profile.VisitAttributes.ActiveLast2Weeks",
//                 operator: "and",
//                 value: true,
//               },
//               {
//                 comparator: ">",
//                 field: "profile.VisitAttributes.SignedUpDateLocal",
//                 operator: "and",
//                 value: "2020-11-05",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: "",
//           "Content-Type": "application/json",
//           "X-Global-Entity-ID": "FP_SG",
//         },
//       }
//     );
//   });
// });
export {};
