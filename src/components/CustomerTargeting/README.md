# Customer Targeting

Customer targeting component is the frontend component that supports the static customer targeting feature.

### Getting Started

```
yarn install @deliveryhero/mmt-widgets
```

### Usage

#### Setting up the environment

- Add `REACT_APP_MMT_MGMT_API` as a new environment variable in the `.env` file. Refer to the table below for the value of the variable.
- Update `REACT_APP_MMT_MGMT_API` in your drone or CI file to have the correct values when building for different environments

| Environment         | Value                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| Development/Staging | `https://{COUNTRY_CODE}-st.fd-api.com/mmt-mgmt-api/customer-targeting/count` |
| Production          | `https://{COUNTRY_CODE}.fd-api.com/mmt-mgmt-api/customer-targeting/count`    |

#### Usage of the component

```typescript
import {CustomerTargeting, PluginType} from @deliveryhero/@deliveryhero/mmt-widgets


// rendering the component

<CustomerTargeting
    profileRules={state.profileRules}
    rulesConfigAPIResponse={state.customerRulesConfigAPIResponse}
    disabled={false}
    pluginType={PluginType.Campaign}
    pluginId="campaign-id-1"
    updateCallbacks={{
        updateUserTargets: (profileRules) => setState({profileRules}),
    }}
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
| `hideFetchCountButton`          | This property hides the fetch count preview component.      |
