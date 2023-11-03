import { useEffect } from "react";
import { useUserContext } from "../context/user_context";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });
  return children;
};
export default PublicRoute;
