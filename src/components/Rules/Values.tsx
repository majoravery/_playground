import React from "react";
import { IconButton } from "@deliveryhero/armor";
import { DeleteIcon, EditIcon, IrisOnIcon } from "@deliveryhero/armor-icons";

interface RuleValueProps {
  onDelete: () => void;
  onEdit: () => void;
  readonly?: boolean;
  disableView?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  onView: () => void;
}

const Values: React.FC<React.PropsWithChildren<RuleValueProps>> = ({
  onEdit,
  onDelete,
  readonly = false,
  disableView = false,
  disableEdit = false,
  disableDelete = false,
  onView,
  children,
}) => {
  return (
    <div className="values__container">
      <div className="values__content-container">{children}</div>

      <div className={"values__button-container"}>
        {readonly && !disableView && (
          <IconButton onClick={onView}>
            <IrisOnIcon />
          </IconButton>
        )}
        {!readonly && (
          <>
            <IconButton disabled={disableEdit} onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton disabled={disableDelete} onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Values;
