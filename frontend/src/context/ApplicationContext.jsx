import axios from "axios";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useUserContext } from "./user_context";
import { useNavigate } from "react-router-dom";

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState("MSAT_PENDING");
  const [isLoading, setIsLoading] = useState(false);

  const CreateApplication = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("currentUser")).token;
      console.log(token);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/applications/create`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      if (data) {
        console.log("Created the application successfully");
        setApplicationStatus("MSAT_PROGRESS");
        console.log("handleGenerate");
        handleGenerateTest();
      }
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const handleGenerateTest = () => {
    const data = {
      uniqueID: currentUser.user._id,
      assessmentTemplateId: process.env.REACT_APP_test_platform_assessment_id,
      redirectClientUrl: process.env.REACT_APP_redirectClientUrl,
      email: currentUser.user.email,
      callback_url: process.env.REACT_APP_callback_url,
    };

    axios({
      method: "post",
      url: `${process.env.REACT_APP_ASSESMENT_API_BASE_URL}/student/assessments/generate-test`,
      headers: {
        "client-id": process.env.REACT_APP_ASSESMENT_PLATFROM_CLIENT_ID,
        "Content-Type": "application/json",
      },
      data: { ...data },
    })
      .then(function (response) {
        console.log(response);
        window.location.href = response.data.url;
      })
      .catch(function (error) {
        console.log(error);
      });

    // const response =  fetch(`${ASSESMENT_API_BASE_URL}/student/assessments/generate-test`, {
    //   method: "POST",
    //   headers: {
    //     "client-id": ASSESMENT_PLATFROM_CLIENT_ID,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // const responseData = await response.json();
    // console.log(responseData);
    // window.location.href = responseData.url;
  };

  const getEndpoint = (status) => {
    if (status === "MSAT_PROGRESS") {
      return "applications/msat1-progress";
    } else if (status === "MSAT_DECISION_PENDING") {
      return "applications/msat1-decision-pending";
    } else if (status === "MSAT_CLEARED") {
      return "applications/msat1-cleared";
    } else if (status === "MSAT_FAILED") {
      return "applications/msat1-failed";
    } else if (status === "MSAT_SECOND_ATTEMPT_PENDING") {
      return "applications/msat2-pending";
    } else if (status === "MSAT_SECOND_ATTEMPT_PROGRESS") {
      return "applications/msat2-progress";
    } else if (status === "MSAT_SECOND_ATTEMPT_DECISION_PENDING") {
      return "applications/msat2-decision-pending";
    } else if (status === "MSAT_SECOND_ATTEMPT_CLEARED") {
      return "applications/msat2-cleared";
    } else if (status === "MSAT_SECOND_ATTEMPT_FAILED") {
      return "applications/msat2-failed";
    }
  };

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

  const UpdateApplicationStatus = async (status) => {
    // setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    if (ValidateStatus(status)) {
      try {
        let endPoint = getEndpoint(status);
        const res = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/${endPoint}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        if (data) {
          setApplicationStatus(status);
        }
      } catch (error) {
        console.log("Error in updating application status");
      } finally {
        // setIsLoading(false);
      }
    } else {
      console.log("invalid status for application");
    }
  };

  const handleApplicationStatus = (status) => {
    setApplicationStatus(status);
  };

  useEffect(() => {
    if (currentUser?.user?.applications?.length > 0) {
      const currentStatus =
        currentUser.user.applications[currentUser.user.applications.length - 1].applicationStatus;
      setApplicationStatus(currentStatus);
    }
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        applicationStatus,
        isLoading,
        handleApplicationStatus,
        CreateApplication,
        UpdateApplicationStatus,
        handleGenerateTest,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(ApplicationContext);
};

export default ApplicationContextProvider;
