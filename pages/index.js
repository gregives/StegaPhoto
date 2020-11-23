import Banner from "../components/Banner";
import Flow from "../components/Flow";
import Footer from "../components/Footer";
import Page from "../components/Page";

const Home = ({ stars }) => (
    <Page>
        <div>
            <Banner stars={stars} />
            <Flow />
        </div>
        <Footer />
    </Page>
);

const STARS_URL = "https://api.github.com/repos/gregives/StegaPhoto";

export const getStaticProps = async () => {
    const response = await fetch(STARS_URL);
    const { stargazers_count: stars } = await response.json();
    return {
        props: {
            stars,
        },
    };
};

export default Home;
