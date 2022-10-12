// import { fireEvent, render, waitFor, screen } from '@testing-library/react';
// import user from '@testing-library/user-event';
// import { CustomerTargeting } from './CustomerTargeting';
// import mmtSdk from '../../mmtSdk';
// import {
//   customerTargetFormStateMock,
//   customerRulesConfigAPIResponseMock,
//   customerStatisticsAPIDataMock,
//   customerStatisticsAPIDataWithLinksMock,
// } from './__mocks__/mocks';
// import { CustomerTargetingProps, PluginType } from './types';
// import * as apiHelpers from './CustomerStatistics/api';
// import { CustomerStatisticsState } from '.';

// jest.spyOn(mmtSdk, 'getActiveCountry').mockImplementation(() => ({ geid: 'FP_SG', code: 'sg' }));

// const defaultComponentProps: CustomerTargetingProps = {
//   profileRules: customerTargetFormStateMock,
//   disabled: false,
//   rulesConfigAPIResponse: customerRulesConfigAPIResponseMock,
//   updateCallbacks: {
//     updateProfileRules: jest.fn(),
//   },
//   pluginType: PluginType.Campaign,
//   pluginId: null,
// };

// describe('CustomerTargeting', () => {
//   it('renders', () => {
//     render(<CustomerTargeting {...defaultComponentProps} />);
//     expect(screen.getByText('Rule #1')).toBeInTheDocument();
//     expect(screen.getByText('First Platform Device')).toBeInTheDocument();
//     expect(screen.getAllByText('Last Visited Timestamp')).toHaveLength(2);
//     expect(screen.getByText('Signed Up Date')).toBeInTheDocument();
//     expect(screen.getByText('Rule #2')).toBeInTheDocument();
//     expect(screen.getByText('Total Visits')).toBeInTheDocument();
//     // active last 2 weeks is in profile rules but not in rule config, so the text should not render
//     expect(screen.queryByText('Active Last 2 Weeks')).not.toBeInTheDocument();
//   });

//   it('renders nothing when theres no rulesConfig', async () => {
//     render(<CustomerTargeting {...defaultComponentProps} rulesConfigAPIResponse={[]} />);
//     expect(screen.queryByText('Rule #1')).not.toBeInTheDocument();
//     expect(screen.queryByText('First Platform Device')).not.toBeInTheDocument();
//     expect(screen.queryByText('Last Visited Timestamp')).not.toBeInTheDocument();
//     expect(screen.queryByText('Rule #2')).not.toBeInTheDocument();
//     expect(screen.queryByText('Total Visits')).not.toBeInTheDocument();
//   });

//   describe('when it recreates profile rules when updated', () => {
//     let modifiedComponentProps: CustomerTargetingProps;
//     beforeEach(() => {
//       modifiedComponentProps = { ...defaultComponentProps };
//       modifiedComponentProps.updateCallbacks = {
//         updateProfileRules: profileRules => {
//           modifiedComponentProps.profileRules = [...profileRules];
//         },
//       };
//     });

//     it('renders correctly when rulesConfig is loaded asynchronously', () => {
//       const { rerender } = render(<CustomerTargeting {...modifiedComponentProps} rulesConfigAPIResponse={[]} />);
//       rerender(<CustomerTargeting {...defaultComponentProps} />);
//       expect(screen.getByText('Rule #1')).toBeInTheDocument();
//       expect(screen.getByText('First Platform Device')).toBeInTheDocument();
//       expect(screen.getAllByText('Last Visited Timestamp')).toHaveLength(2);
//       expect(screen.getByText('Rule #2')).toBeInTheDocument();
//       expect(screen.getByText('Total Visits')).toBeInTheDocument();
//     });

//     it('renders correctly when profile rules are loaded asynchronously', () => {
//       const { rerender } = render(<CustomerTargeting {...modifiedComponentProps} profileRules={[]} />);
//       rerender(<CustomerTargeting {...modifiedComponentProps} profileRules={customerTargetFormStateMock} />);
//       expect(screen.getByText('Rule #1')).toBeInTheDocument();
//       expect(screen.getByText('First Platform Device')).toBeInTheDocument();
//       expect(screen.getAllByText('Last Visited Timestamp')).toHaveLength(2);
//       expect(screen.getByText('Rule #2')).toBeInTheDocument();
//       expect(screen.getByText('Total Visits')).toBeInTheDocument();
//     });

//     it('renders profile rules that are already loaded', () => {
//       modifiedComponentProps.rulesConfigAPIResponse = [
//         {
//           name: 'Customer',
//           rules: {
//             'qubik.customer.active_last_2_weeks': {
//               display_name: 'Active L2W',
//               supported_comparator: ['=', '!='],
//               supported_type: 'bool',
//               values: [],
//               section: 'Customer',
//             },
//             'qubik.customer.guest': {
//               display_name: 'Guest',
//               supported_comparator: ['=', '!='],
//               supported_type: 'bool',
//               values: [],
//               section: 'Customer',
//             },
//             'qubik.customer.subscriber_status': {
//               display_name: 'Subscriber Status',
//               supported_comparator: ['=', '!=', 'in'],
//               supported_type: 'string',
//               values: [],
//               section: 'Customer',
//             },
//           },
//         },
//       ];
//       const { rerender } = render(<CustomerTargeting {...modifiedComponentProps} />);
//       rerender(
//         <CustomerTargeting {...modifiedComponentProps} rulesConfigAPIResponse={customerRulesConfigAPIResponseMock} />
//       );
//       expect(screen.getByText('Rule #1')).toBeInTheDocument();
//       expect(screen.getByText('First Platform Device')).toBeInTheDocument();
//       expect(screen.getAllByText('Last Visited Timestamp')).toHaveLength(2);
//       expect(screen.getByText('Rule #2')).toBeInTheDocument();
//       expect(screen.getByText('Total Visits')).toBeInTheDocument();
//     });

//     it('does not output display name when rules are changed', async () => {
//       render(
//         <CustomerTargeting {...defaultComponentProps} rulesConfigAPIResponse={customerRulesConfigAPIResponseMock} />
//       );

//       user.click(screen.getAllByTestId('rule--add-condition-button')[0]);
//       user.click(screen.getByText('Order Attributes'));
//       user.click(screen.getByTestId('tab-content-footer-select-btn'));
//       const updateProfileRulesMock = defaultComponentProps.updateCallbacks.updateProfileRules as jest.MockedFunction<
//         CustomerTargetingProps['updateCallbacks']['updateProfileRules']
//       >;
//       const latestCall = updateProfileRulesMock.mock.calls[updateProfileRulesMock.mock.calls.length - 1];
//       expect(latestCall[0][0]).not.toHaveProperty('display_name');
//       expect(latestCall[0][1]).not.toHaveProperty('display_name');
//     });
//   });

//   describe('Customer Statistics Integration', () => {
//     it('does not render the account if there are no rules configured', () => {
//       const props = { ...defaultComponentProps, profileRules: [] };
//       const { queryByTestId } = render(<CustomerTargeting {...props} />);
//       expect(queryByTestId('customer-statistics-display-wrapper')).toBeNull();
//     });
//     it('sets the UI to loading when the count api call is in progress', async () => {
//       const props = { ...defaultComponentProps };

//       jest.spyOn(apiHelpers, 'fetchCount').mockResolvedValue(customerStatisticsAPIDataMock as CustomerStatisticsState);

//       const { getByText, getByTestId, queryByTestId } = render(<CustomerTargeting {...props} />);

//       fireEvent.click(getByText(/Preview Audience Size/i));

//       expect(getByTestId('customer-profiling-rules-loading')).toBeVisible();
//       await waitFor(() => expect(getByTestId('customer-count-text')).toBeVisible());
//       expect(queryByTestId('customer-profiling-rules-loading')).toBeNull();
//     });
//     it('makes the UI readonly if the customer codes are processed', async () => {
//       const props = { ...defaultComponentProps, pluginId: 'testPluginId' };
//       jest
//         .spyOn(apiHelpers, 'fetchCount')
//         .mockResolvedValue(customerStatisticsAPIDataWithLinksMock as CustomerStatisticsState);

//       const { getByText, getByTestId, queryByTestId } = render(<CustomerTargeting {...props} />);

//       expect(getByTestId('customer-profiling-rules-loading')).toBeVisible();
//       await waitFor(() => expect(getByText(/Download Audience List/i)).toBeVisible());
//       expect(queryByTestId('customer-profiling-rules-loading')).toBeNull();
//       expect(queryByTestId('rules--add-rule-button')).toBeNull();
//     });
//   });
// });
export {};
