const EmptyState = ({ message }) => {
    return (
        <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-4 opacity-70">
                {/* Optional: Add an icon or illustration */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-full h-full text-gray-400 dark:text-gray-300"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                {message}
            </p>
        </div>
    );
};

export default EmptyState;
