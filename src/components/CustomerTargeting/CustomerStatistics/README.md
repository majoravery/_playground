# Customer Statistics

Customer Statistics component is the frontend component that displays the total audience size.

### Getting Started

```
yarn install @deliveryhero/@deliveryhero/mmt-widgets
```

### Usage

This component can be used standalone aside from the parent `CustomerTargeting` component

```typescript
import {CustomerStatistics, PluginType} from @deliveryhero/@deliveryhero/mmt-widgets


// rendering the component

<CustomerStatistics
  profileRules={state.profileRules}
  pluginId="campaign-id-1"
  pluginType={PluginType.Campaign}
  disabled={false}
/>

```

#### Alternative Usage

```typescript
import {CustomerStatistics, PluginType, fetchCount, CustomerStatisticsState} from @deliveryhero/@deliveryhero/mmt-widgets

const [mockCustomerStatisticData, setMockCustomerStatisticData] = useState<CustomerStatisticsState | null>(null);
// Manually fetch the data

const mockFunctionCall = async () => {
  try {
    const res = await fetchCount({
      profileRules: state.profileRules,
      pluginId: 'campaign-id-1',
      pluginType: PluginType.Campaign,
    });
    setMockCustomerStatisticData(res);
  } catch (error) {
    console.log(error)
  }
}

// rendering the component

<CustomerStatistics
  profileRules={state.profileRules}
  pluginId="campaign-id-1"
  pluginType={PluginType.Campaign}
  disabled={false}
  hideFetchCountButton
  customerStatisticsData={mockCustomerStatisticData}
/>
```

| Props                    | Description                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profileRules`          | This is the property in your state which contains the customer targeting rules configuration. If there are no rules, the default value to be sent will be `[]`. The configuration data can be retrieved from `updateUserTargets` callback function.                       |
| `rulesConfigAPIResponse` | This is the property containing the configs of all the rules we will be displaying in the frontend. This values will be provided by the plugin backend through an api. |
| `disabled`               | This is to determine whether we should make the UI disabled/readonly                                                                                                   |
| `pluginType`             | Unique property to determine what type of incentive/object will contain this customer targeting                                                                        |
| `pluginId`               | Unique identifier for the plugin object/incentive such as `campaign_id` for campaigns or `voucher_id` for vouchers                                                     |
| `updateCallbacks`        | Object that contains callbacks which are triggered when the rules are updated by the user                                                                              |

| Optional Props                    | Description                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hideFetchCountButton`          | This is the property hides the Preview Audience Size button for manual fetching using the exposed `fetchCount()` API                     |
| `customerStatisticsData` | This is the property accepts the response object returned by the `fetchCount()` API to populate the values onto the component UI. |
