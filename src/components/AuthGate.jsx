import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import PageLoader from "../pages/PageLoader/PageLoader";
import useAuthRole from "../hooks/useAuthRole";


const AuthGate = ({ children }) => {
    const { loading } = useAuth();
    const [showLoader, setShowLoader] = useState(false);
    const { backendLoading } = useAuthRole();


    useEffect(() => {
        let timer;

        if (loading || backendLoading) {
            setShowLoader(true);
        } else {
            timer = setTimeout(() => setShowLoader(false), 500);
        }

        return () => clearTimeout(timer);
    }, [loading, backendLoading]);

    if (showLoader) return <PageLoader />;
    return children;
};

export default AuthGate;

