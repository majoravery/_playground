import React, { ReactNode } from "react";
import RuleStateContext from "./context";
import { IRuleState } from "../../types";

interface Props {
  ruleState: IRuleState;
  children?: ReactNode;
}

const RuleStateProvider: React.FC<Props> = ({ ruleState, children }) => {
  return (
    <RuleStateContext.Provider value={ruleState}>
      {children}
    </RuleStateContext.Provider>
  );
};

export default RuleStateProvider;
