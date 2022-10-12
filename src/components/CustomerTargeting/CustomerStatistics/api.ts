// import { CustomerStatisticsAPIResponse } from "./types";
import { CustomerTargetingRules, PluginType } from "../types";
// import { getCountryCode } from '../../../graphql/constants';
// import { getActiveCountry } from '../../../utils/country';
// import axios from 'axios';
// import mmtSdk from '../../../mmtSdk';

// type GetStatisticsRequestParams = {
//   profile_rules: CustomerTargetingRules[];
//   plugin_object_id?: string;
//   plugin_type: PluginType;
// };

// const getAPIUrl = () => {
//   const url = process.env.REACT_APP_MMT_MGMT_API || '';
//   return url.replace('{COUNTRY_CODE}', getCountryCode());
// };

// export const fetchCount = async ({
//   profileRules,
//   pluginId,
//   pluginType,
// }: {
//   profileRules: CustomerTargetingRules[];
//   pluginId: string;
//   pluginType: PluginType;
// }) => {
//   const url = getAPIUrl();
//   let params: GetStatisticsRequestParams = { plugin_type: pluginType, profile_rules: profileRules };
//   params = pluginId.length > 0 ? { ...params, plugin_object_id: pluginId } : params;
//   const token = mmtSdk.getToken();

//   try {
//     const res = await axios.post<CustomerStatisticsAPIResponse>(url, params, {
//       headers: {
//         'X-Global-Entity-ID': getActiveCountry(),
//         Authorization: token ? `Bearer ${token}` : '',
//         'Content-Type': 'application/json',
//       },
//     });
//     const { data } = res.data;
//     const links =
//       data.customer_codes_s3_url && data.customer_codes_s3_url.length > 0 ? data.customer_codes_s3_url.split(',') : [];
//     return {
//       count: data.final_count,
//       lastUpdated: data.queried_at,
//       links,
//     };
//   } catch (error) {
//     throw new Error(error as string);
//   }
// };

export const fetchCount = async ({
  profileRules,
  pluginId,
  pluginType,
}: {
  profileRules: CustomerTargetingRules[];
  pluginId: string;
  pluginType: PluginType;
}) => {
  return Promise.resolve({
    count: 1,
    lastUpdated: "",
    links: [],
  });
};
