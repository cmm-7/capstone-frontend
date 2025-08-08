import { Navigate } from "react-router-dom";

const HomeRedirect = ({ currentUser }) => {
  if (currentUser?.id) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default HomeRedirect;
