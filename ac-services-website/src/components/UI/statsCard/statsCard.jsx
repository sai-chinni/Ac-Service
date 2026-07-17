const StatsCard = ({ number, label }) => {
    return (
        <div
            className="
            group
            bg-white/80
            backdrop-blur-md
            border
            border-slate-100
            rounded-2xl
            shadow-premium
            p-6
            text-center
            transition-all
            duration-300
            hover:-translate-y-1.5
            hover:shadow-xl
            hover:border-blue-100/50
            min-w-[150px]
        "
        >
            <h3 className="text-3xl lg:text-4xl font-extrabold text-gradient-blue">
                {number}
            </h3>

            <p className="mt-2 text-xs lg:text-sm font-semibold tracking-wide text-slate-500 uppercase">
                {label}
            </p>
        </div>
    );
};

export default StatsCard;