import React, { useEffect, useState } from "react";
import { Button, Skeleton } from "@deliveryhero/armor";
import { InfoOutlineIcon } from "@deliveryhero/armor-icons";
// import "./CustomerStatistics.scss";
import "./CustomerStatistics.css";
import { checkIfRulesAreEqual, isRuleFilled } from "../utils/helper";
import { UIStatus, CustomerTargetingRules } from "../types";
import { CustomerStatisticsProps, CustomerStatisticsState } from "./types";
import { fetchCount } from "./api";
import { shouldEnableGetCountButton, getFormattedDate } from "./helpers";
import { CustomerStatisticsModal } from "./CustomerStatisticsModal";
import { ListDownloadButton } from "./ListDownloadButton";

export const CustomerStatistics: React.FC<CustomerStatisticsProps> = ({
  profileRules,
  uiStatus,
  setUiStatus,
  areRulesValidCallback,
  pluginType,
  areRulesEdited,
  hideFetchCountButton = false,
  customerStatisticsData = null,
  ...props
}) => {
  const [customerStatistics, setCustomerStatistics] =
    useState<CustomerStatisticsState | null>(customerStatisticsData);
  const [haveRulesChanged, setHaveRulesChanged] = useState(false);
  const [showCustomerCodeDownloadModal, setShowCustomerCodeDownloadModal] =
    useState(false);
  const [rulesForCurrentStatistics, setRulesForCurrentStatistics] = useState<
    CustomerTargetingRules[]
  >([]);
  const pluginId = props.pluginId || "";
  const getStatistics = async () => {
    try {
      setUiStatus(UIStatus.LOADING);
      const statistics = await fetchCount({
        profileRules,
        pluginId,
        pluginType,
      });
      setCustomerStatistics(statistics);
      areRulesValidCallback(true);
      setRulesForCurrentStatistics(profileRules);
      setHaveRulesChanged(false);
      setUiStatus(
        statistics.links.length > 0 ? UIStatus.READONLY : UIStatus.NORMAL
      );
    } catch (e) {
      console.log(e);
      setUiStatus(UIStatus.NORMAL);
    }
  };

  useEffect(() => {
    setCustomerStatistics(customerStatisticsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerStatisticsData?.count, customerStatisticsData?.lastUpdated]);

  useEffect(() => {
    // to fetch automatically on rendering in the update flow
    const cleanedNewRules = profileRules.filter(isRuleFilled);
    if (
      pluginId &&
      pluginId.length > 0 &&
      cleanedNewRules.length > 0 &&
      !customerStatistics &&
      !areRulesEdited
    ) {
      getStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const cleanedRulesForCurrentStatistics =
      rulesForCurrentStatistics.filter(isRuleFilled);
    const cleanedNewRules = profileRules.filter(isRuleFilled);
    const rulesAreEqual = checkIfRulesAreEqual(
      cleanedRulesForCurrentStatistics,
      cleanedNewRules
    );
    const rulesChanged = !rulesAreEqual;
    rulesChanged && setHaveRulesChanged(true);
    rulesChanged && areRulesValidCallback(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileRules]);

  const openModal = () => {
    setShowCustomerCodeDownloadModal(true);
  };
  const closeModal = () => {
    setShowCustomerCodeDownloadModal(false);
  };
  const areCustomerCodesProcessed = Boolean(
    customerStatistics &&
      customerStatistics.links &&
      customerStatistics.links.length > 0
  );
  const enableGetCountButton = shouldEnableGetCountButton({
    areCustomerCodesProcessed,
    haveRulesChanged,
    backendApiLoading: uiStatus === UIStatus.LOADING,
    customerStatistics,
    profileRules,
    isDisabled: uiStatus === UIStatus.DISABLED,
  });
  const isApiCallInProgress = uiStatus === UIStatus.LOADING;
  const showCount =
    customerStatistics && !isApiCallInProgress && !haveRulesChanged;
  const showCustomerCodeDownloadLinks =
    !isApiCallInProgress && areCustomerCodesProcessed;
  const showInfoBox = showCount && !showCustomerCodeDownloadLinks;
  const customerDownloadLinks: string[] = customerStatistics
    ? customerStatistics.links
    : [];
  const formattedDate = customerStatistics
    ? getFormattedDate(customerStatistics.lastUpdated)
    : "";
  const showPreviewCountButton =
    !isApiCallInProgress && !showCustomerCodeDownloadLinks;
  return (
    <>
      <div
        className="customer-statistics-display-wrapper"
        data-testid="customer-statistics-display-wrapper"
      >
        <div className="customer-count-display-wrapper">
          {showCount && (
            <>
              <h5
                className="customer-count-text"
                data-testid="customer-count-text"
              >
                Total Audience Size is {customerStatistics?.count}
              </h5>
              <p
                className="customer-count-updated-text"
                data-testid="customer-count-updated-text"
              >
                Last Updated - {formattedDate}
              </p>
            </>
          )}
        </div>
        {isApiCallInProgress && (
          <Skeleton
            className="customer-statistics-loading"
            data-testid="loading-spinner"
          />
        )}
        {showPreviewCountButton && !hideFetchCountButton && (
          <Button
            secondary
            onClick={getStatistics}
            disabled={!enableGetCountButton}
            data-testid="fetch-statistics-button"
            className="preview-count-button"
          >
            Preview Audience Size
          </Button>
        )}
        {showCustomerCodeDownloadLinks && (
          <>
            <ListDownloadButton onClick={openModal} />
            <CustomerStatisticsModal
              show={showCustomerCodeDownloadModal}
              onHide={closeModal}
              customerDownloadLinks={customerDownloadLinks}
              pluginType={pluginType}
              pluginId={pluginId}
            />
          </>
        )}
      </div>
      {showInfoBox && (
        <div className="customer-statistics-info-wrapper">
          <InfoOutlineIcon />
          <h5
            className="customer-statistics-info-text"
            data-testid="customer-statistics-notification-message"
          >
            You will receive a notification on{" "}
            <a
              className="customer-statistics-info-text-inline-link"
              href="https://deliveryhero.slack.com/archives/CM7GZF675"
              target="_blank"
              rel="noreferrer"
            >
              slack
            </a>{" "}
            once the audience list is ready for download. Please note that you
            will not be able to edit the rules & conditions 24 hours before
            start / launch date & time.
          </h5>
        </div>
      )}
    </>
  );
};
