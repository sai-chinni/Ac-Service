const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const styles = {
        primary:
            "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 border border-transparent",

        secondary:
            "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 shadow-sm",

        outline:
            "border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-slate-100 hover:border-slate-300 shadow-sm",
    };

    return (
        <button
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-4
                rounded-xl
                font-semibold
                text-sm
                tracking-wide
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                active:translate-y-0
                active:scale-98
                cursor-pointer
                ${styles[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;