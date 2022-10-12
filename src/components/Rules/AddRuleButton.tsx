import React, { ComponentProps } from "react";
import { Button } from "@deliveryhero/armor";
import { PlusIcon } from "@deliveryhero/armor-icons";

interface AddRuleButtonProps extends ComponentProps<typeof Button> {
  title?: string;
}

const AddRuleButton: React.FC<AddRuleButtonProps> = ({
  title = "Add rule",
  ...props
}) => (
  <Button marginTop={4} secondary small {...props}>
    <PlusIcon /> {title}
  </Button>
);

export default AddRuleButton;
