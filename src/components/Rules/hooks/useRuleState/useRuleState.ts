/* istanbul ignore file */
import React from 'react';
import RuleStateContext from './context';
import { IRuleState } from '../../types';

const useRuleState = (): IRuleState => {
  const useRuleStateHook = React.useContext(RuleStateContext);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(useRuleStateHook);
  }

  return useRuleStateHook;
};

export default useRuleState;
