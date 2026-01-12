import Swal from "sweetalert2";
const useToast = () => {
    const isDark = document.documentElement.classList.contains("dark");

    const baseConfig = {
        timer: 1500,
        showConfirmButton: false,
        background: isDark ? "#262626" : "#ffffff",
        color: isDark ? "#ffffff" : "#262626",
    };

    const success = (title, text) =>
        Swal.fire({
            ...baseConfig,
            icon: "success",
            title,
            text,
        });

    const warning = (title, text) =>
        Swal.fire({
            ...baseConfig,
            icon: "warning",
            iconColor: "#facc15",
            title,
            text,
        });

    const error = (title, text) =>
        Swal.fire({
            background: baseConfig.background,
            color: baseConfig.color,
            icon: "error",
            iconColor: "#fb2c36",
            confirmButtonColor: "#fb2c36",
            title,
            text,
        });

    const info = (title, text) =>
        Swal.fire({
            ...baseConfig,
            icon: "info",
            title,
            text,
        });

    return {
        success,
        warning,
        error,
        info,
    };
};

export default useToast;
