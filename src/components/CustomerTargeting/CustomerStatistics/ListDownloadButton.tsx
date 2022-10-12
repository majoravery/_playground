import React from "react";
import { Button } from "@deliveryhero/armor";

export interface ListDownloadButtonProps {
  onClick: () => void;
  variant?: string;
  children?: React.ReactNode;
}

export const ListDownloadButton: React.FC<ListDownloadButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button
      secondary
      onClick={onClick}
      className="download-customer-codes-button"
    >
      {children || "Download Audience List"}
    </Button>
  );
};
