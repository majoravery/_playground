import React from "react";
import { Button } from "@deliveryhero/armor";
import { DeleteIcon } from "@deliveryhero/armor-icons";

export interface CustomerTargetingEditFooterProps {
  id?: string;
  onApply: () => void;
  onCancel: () => void;
  disableApplyButton?: boolean;
  deleteButtonText?: "Cancel" | "Remove";
}

const EditRuleFooter: React.FC<CustomerTargetingEditFooterProps> = ({
  id,
  onApply,
  onCancel,
  disableApplyButton,
  deleteButtonText = "Cancel",
}) => {
  const showDeleteIcon = deleteButtonText === "Remove";

  return (
    <div className="tab-content-footer">
      <Button
        data-testid="tab-content-footer-remove-btn"
        data-tab={id}
        className="tab-content-footer-remove-btn"
        onClick={onCancel}
        secondary
      >
        {showDeleteIcon && <DeleteIcon />}
        {deleteButtonText}
      </Button>
      <Button
        primary
        data-tab={id}
        data-testid="tab-content-footer-select-btn"
        className="tab-content-footer-select-btn"
        onClick={onApply}
        disabled={disableApplyButton}
      >
        Apply
      </Button>
    </div>
  );
};

export default EditRuleFooter;
