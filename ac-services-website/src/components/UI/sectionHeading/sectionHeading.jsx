const SectionHeading = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-dark leading-tight">
                {title}
            </h2>
            
            {/* Decorative cooling accent bar */}
            <div className="flex justify-center items-center gap-1.5 mt-2">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse-slow"></div>
                <div className="w-12 h-1 bg-gradient-to-l from-blue-500 to-cyan-400 rounded-full"></div>
            </div>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    );
};

export default SectionHeading;