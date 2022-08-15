import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./context/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="retailservices/home" state={{ from: location }} replace />
                : <Navigate to="retailservices/" state={{ from: location }} replace />
    );
}

export default RequireAuth;