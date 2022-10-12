import React from "react";
import { IRuleState, IViewCondition, TOption } from "./types";
import { Menu, MenuElement } from "@deliveryhero/armor";
import { useRuleState } from "./hooks";

interface Props {
  title: string;
  options: TOption[];
  activeIndex: number;
  onOptionClick: (i: number) => void;
}

const optionDisabled = (
  ruleState: IRuleState,
  disabled: IViewCondition["disabled"]
): boolean => {
  if (typeof disabled === "function") {
    return disabled(ruleState);
  } else {
    return !!disabled;
  }
};

const Options: React.FC<Props> = ({
  title,
  options,
  activeIndex,
  onOptionClick,
}) => {
  const handleOptionClick = (index: number) => () => {
    onOptionClick(index);
  };

  const ruleState = useRuleState();

  return (
    <>
      <Menu>
        {options.map((o, i) => (
          <MenuElement
            key={o.title}
            // disabled={optionDisabled(ruleState, o.disabled)}
            onClick={handleOptionClick(i)}
            selected={activeIndex === i}
          >
            {o.title}
          </MenuElement>
        ))}
      </Menu>
    </>
  );
};

export default Options;
