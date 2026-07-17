const Badge = ({ children }) => {
    return (
        <span
            className="
            inline-flex
            items-center
            gap-1.5
            bg-blue-50/80
            backdrop-blur-md
            border
            border-blue-100/80
            text-blue-600
            px-4
            py-1.5
            rounded-full
            text-xs
            font-semibold
            tracking-wider
            uppercase
            shadow-sm
            "
        >
            {children}
        </span>
    );
};

export default Badge;