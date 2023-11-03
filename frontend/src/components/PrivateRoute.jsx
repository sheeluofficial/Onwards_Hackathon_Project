import { useEffect } from "react";
import { useUserContext } from "../context/user_context";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  });
  return children;
};

export default PrivateRoute;
