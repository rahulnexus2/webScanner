const Background = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-background overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-40 animate-pulse-fast"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] opacity-30 animate-pulse-fast delay-700"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
        </div>
    );
};

export default Background;
