import Head from 'next/head'

const Page = (props) =>
    <div className="min-h-screen bg-gray-800 text-gray-100">
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>StegaPhoto</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" media="print" onLoad="this.media='all'" />
            <noscript>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" />
            </noscript>
        </Head>
        {props.children}
    </div>

export default Page
