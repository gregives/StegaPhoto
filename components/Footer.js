const Footer = () => (
    <footer className="bg-blue-900 bg-opacity-25 text-lg">
        <div className="container xl:max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between px-8 pt-16 pb-16">
            <p className="mb-4 sm:mb-0">
                Created by{" "}
                <a
                    href="https://gregives.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 focus:text-blue-300 focus-visible:underline focus:outline-none"
                >
                    Greg Ives
                </a>
            </p>
            <p>
                <a
                    href="https://github.com/gregives/StegaPhoto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 focus:text-blue-300 focus-visible:underline focus:outline-none"
                >
                    See how StegaPhoto was made
                </a>
            </p>
        </div>
    </footer>
);

export default Footer;
