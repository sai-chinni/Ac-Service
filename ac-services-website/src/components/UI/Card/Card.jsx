const Card = ({
    children,
    className = "",
    hover = true,
    glass = false,
    ...props
}) => {
    return (
        <div
            className={`
                rounded-3xl
                p-8
                border
                transition-all
                duration-400
                ease-out
                ${glass 
                    ? "glass-card" 
                    : "bg-white border-slate-100/80 shadow-premium"
                }
                ${hover
                    ? "hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-100/50 hover:bg-white"
                    : ""
                }
                ${className}
            `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;