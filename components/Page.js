import Head from 'next/head'

const Page = (props) => (
    <div className="min-h-screen flex flex-col justify-between bg-gray-800 text-gray-100 text-xl lg:text-2xl">
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>StegaPhoto</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" media="print" onLoad="this.media='all'" />
            <noscript>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" />
            </noscript>
            <meta name="description" content="Hide files inside images easily using StegaPhoto, using in-browser steganography techniques." />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
        {props.children}
    </div>
)

export default Page
