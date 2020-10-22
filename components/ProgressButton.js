const ProgressButton = ({ onClick, progress, download, children }) => {
    return download ? (
        <a
            className="relative text-center bg-blue-700 hover:bg-blue-600 transition duration-300 transform hover:scale-105 md:text-3xl lg:text-4xl p-8 mx-auto w-full max-w-screen-sm rounded-full shadow-lg focus:outline-none focus-visible:shadow-outline"
            href={download}
            download
        >
            <span className="absolute inset-0 rounded-full bg-blue-400 animate-pulse bg-opacity-50 overflow-hidden"></span>
            <span className="relative">{children}</span>
        </a>
    ) : (
        <button
            className="relative bg-orange-700 hover:bg-orange-600 transition duration-300 transform hover:scale-105 md:text-3xl lg:text-4xl p-8 mx-auto w-full max-w-screen-sm rounded-full shadow-lg focus:outline-none focus-visible:shadow-outline"
            type="button"
            onClick={onClick}
        >
            <span className="absolute inset-0 rounded-full bg-orange-400 animate-pulse bg-opacity-50 overflow-hidden">
                <span
                    className="absolute inset-0 origin-left transition-transform ease-linear duration-700 bg-orange-900 bg-opacity-50"
                    style={{ transform: `scaleX(${progress / 100})` }}
                ></span>
            </span>
            <span className="relative">{children}</span>
        </button>
    );
};

export default ProgressButton;
