import { Box, Skeleton } from "@chakra-ui/react";
import { useApplicationContext } from "../context/ApplicationContext";
import MasaiOnboardingPage from "./Onboarding";
import Greetings from "./Greetings/Greetings";
import CouncellingBanner from "./Greetings/CouncellingBanner";
import Home from "../pages/Home";
import LayoutWithRightSidebar from "./LayoutWithRightSidebar";
import LayoutWithoutRightSidebar from "./LayoutWithoutRightSidebar";
import PlainLayout from "./PlainLayout";
import MsatResultsPage from "./MsatResultsPage";

const ValidateStatus = (status) => {
  const validStatuses = [
    "MSAT_PENDING",
    "MSAT_PROGRESS",
    "MSAT_DECISION_PENDING",
    "MSAT_CLEARED",
    "MSAT_FAILED",
    "MSAT_SECOND_ATTEMPT_PENDING",
    "MSAT_SECOND_ATTEMPT_PROGRESS",
    "MSAT_SECOND_ATTEMPT_DECISION_PENDING",
    "MSAT_SECOND_ATTEMPT_CLEARED",
    "MSAT_SECOND_ATTEMPT_FAILED",
    "ONBOARDING_PENDING",
    "ONBOARDING_STARTED",
    "ONBOARDING_COMPLETE",
    "APPLICATION_CLOSED",
  ];

  return validStatuses.includes(status);
};

const DashboardContent = () => {
  const { applicationStatus, isLoading } = useApplicationContext();

  const getUsersCurrentPage = (applicationStatus) => {
    if (ValidateStatus(applicationStatus)) {
      switch (applicationStatus) {
        case "MSAT_PENDING" || "MSAT_SECOND_ATTEMPT_PENDING":
          return (
            <LayoutWithRightSidebar>
              <Home />
            </LayoutWithRightSidebar>
          );
        case "MSAT_PROGRESS" || "MSAT_SECOND_ATTEMPT_PROGRESS":
          return (
            <LayoutWithRightSidebar>
              <Home />
            </LayoutWithRightSidebar>
          );
        case "MSAT_DECISION_PENDING" || "MSAT_SECOND_ATTEMPT_DECISION_PENDING":
          return (
            <LayoutWithRightSidebar>
              <Home />
            </LayoutWithRightSidebar>
          );
        case "MSAT_CLEARED" || "MSAT_SECOND_ATTEMPT_CLEARED":
          return (
            <LayoutWithRightSidebar>
              <Home />
            </LayoutWithRightSidebar>
          );
        case "MSAT_FAILED" || "MSAT_SECOND_ATTEMPT_FAILED":
          return (
            <LayoutWithRightSidebar>
              <Home />
            </LayoutWithRightSidebar>
          );
        case "ONBOARDING_STARTED":
          return (
            <LayoutWithoutRightSidebar>
              <MasaiOnboardingPage />
            </LayoutWithoutRightSidebar>
          );
        case "ONBOARDING_PENDING":
          return (
            <LayoutWithoutRightSidebar>
              <CouncellingBanner />
            </LayoutWithoutRightSidebar>
          );
        case "ONBOARDING_COMPLETE":
          return (
            <PlainLayout>
              <MsatResultsPage />
            </PlainLayout>
          );
        default:
          return;
      }
    }
  };

  if (isLoading) {
    return (
      <Skeleton>
        <Box minH={"100vh"} flex={1}></Box>
      </Skeleton>
    );
  }
  return <>{getUsersCurrentPage(applicationStatus)}</>;
};

export default DashboardContent;

/**
 *      "MSAT_PENDING",
        "MSAT_PROGRESS",
        "MSAT_DECISION_PENDING",
        "MSAT_CLEARED",
        "MSAT_FAILED",
        "MSAT_SECOND_ATTEMPT_PENDING",
        "MSAT_SECOND_ATTEMPT_PROGRESS",
        "MSAT_SECOND_ATTEMPT_DECISION_PENDING",
        "MSAT_SECOND_ATTEMPT_CLEARED",
        "MSAT_SECOND_ATTEMPT_FAILED",
        "ONBOARDING_PENDING", 
		"ONBOARDING_STARTED", 
		"ONBOARDING_COMPLETE",
		"APPLICATION_CLOSED"
 */
