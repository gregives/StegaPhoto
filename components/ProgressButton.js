const ProgressButton = ({ onClick, progress, download, children }) => {
    return download ? (
        <a
            className="block relative text-center bg-green-700 hover:bg-green-600 transition duration-300 transform hover:scale-105 text-2xl md:text-3xl lg:text-4xl p-6 md:p-8 mx-auto w-full max-w-screen-sm rounded-full shadow-lg focus:outline-none focus-visible:ring ring-blue-500 ring-opacity-50"
            href={download}
            download
        >
            <span className="absolute inset-0 rounded-full bg-green-400 animate-pulse bg-opacity-50 overflow-hidden"></span>
            <span className="relative">{children}</span>
        </a>
    ) : (
        <button
            className="block relative bg-blue-700 hover:bg-blue-600 focus:bg-blue-600 transition duration-300 transform hover:scale-105 focus:scale-105 text-2xl md:text-3xl lg:text-4xl p-6 md:p-8 mx-auto w-full max-w-screen-sm rounded-full shadow-lg focus:outline-none"
            type="button"
            onClick={onClick}
        >
            <span className="absolute inset-0 rounded-full bg-blue-400 hover:animate-pulse bg-opacity-25 overflow-hidden">
                <span
                    className="absolute inset-0 origin-left transition-transform ease-linear duration-700 bg-blue-900 bg-opacity-50"
                    style={{ transform: `scaleX(${progress / 100})` }}
                ></span>
            </span>
            {children}
        </button>
    );
};

export default ProgressButton;
