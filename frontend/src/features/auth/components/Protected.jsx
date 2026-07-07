import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <p>Error occurred while loading user data.</p>;
  }

  if (!user  ) {
    return <Navigate to="/login"  />;
  }

  return children;
};

export default Protected;