import React from "react";
import { TextInput } from "@deliveryhero/armor";

interface Props {
  value: string;
  width?: number;
}

const Label: React.FC<Props> = ({ value, width }) => {
  return (
    <div className="rule-label__container" style={{ width: width || "auto" }}>
      {value}
    </div>
  );
};

export default Label;
