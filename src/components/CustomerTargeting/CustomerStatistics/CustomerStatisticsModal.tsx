import React from "react";
import * as Bootstrap from "react-bootstrap";

const { Modal } = Bootstrap;

export interface CustomerStatisticsModalProps {
  show: boolean;
  onHide: () => void;
  customerDownloadLinks?: string[];
  pluginType?: string;
  pluginId?: string;
  children?: React.ReactNode;
}

export const CustomerStatisticsModal: React.FC<
  CustomerStatisticsModalProps
> = ({
  show,
  onHide,
  customerDownloadLinks,
  pluginType,
  pluginId,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="customer-code-download-links-modal"
      data-testid="customer-code-download-links-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Download Audience List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="customer-code-download-links-wrapper"
          data-testid="customer-code-download-links-wrapper"
        >
          {children ||
            (customerDownloadLinks &&
              customerDownloadLinks.map((link, index) => (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                  href={link}
                  key={link}
                  target="_blank"
                  style={{ color: "rgba(0, 0, 0, 0.87)" }}
                >
                  {`${pluginType}-${pluginId}-${index + 1}`}
                </a>
              )))}
        </div>
      </Modal.Body>
    </Modal>
  );
};
