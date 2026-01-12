import { useNavigate } from "react-router";
import useToast from "../../../utils/toast/useToast";
import useAuth from "../../../hooks/useAuth";

const useRequireAuth = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { warning } = useToast();

    return () => {
        if (!user) {
            warning("Login required", "Please login first");
            navigate("/login");
            return false;
        }
        return true;
    };
};

export default useRequireAuth;
