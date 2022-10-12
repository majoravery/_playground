/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import React from 'react';
import { IRuleState, TCondition, TOption } from '../../types';

const dummySetter =
  <T>() =>
  (_: ((o: T) => T) | T): void => {
    return;
  };

const RuleStateContext = React.createContext<IRuleState>({
  ruleKey: '',
  options: [],
  conditions: [],
  addNewMode: true,
  setOptions: dummySetter<TOption[]>(),
  setConditions: dummySetter<TCondition[]>(),
  setAddNewMode: dummySetter<boolean>(),
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  RuleStateContext.displayName = 'RuleStateContext';
}

export default RuleStateContext;
