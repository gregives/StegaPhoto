import Head from 'next/head'

export default function Layout(props) {
    return <div className="min-h-screen bg-gray-800 text-gray-100">
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>StegaPhoto</title>
        </Head>

        <header className="w-full bg-gray-700 shadow-md">
            <div className="container flex flex-row justify-between items-center mx-auto p-4">
                <h1 className="text-lg">StegaPhoto</h1>
                <a href="https://github.com/gregives/StegaPhoto" target="_blank" rel="noopener noreferrer">
                    <img alt="GitHub stars" src="https://img.shields.io/github/stars/gregives/StegaPhoto?style=social" />
                </a>
            </div>
        </header>

        <main className="container mx-auto px-4 py-6">{props.children}</main>
    </div>
}
