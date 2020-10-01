import Banner from '../components/Banner'
import ChooseFlow from '../components/ChooseFlow'
import Flow from '../components/Flow'
import FlowStep from '../components/FlowStep'
import FlowStepList from '../components/FlowStepList'
import Page from '../components/Page'

const Home = () => (
    <Page>
        <Banner />
        <Flow>
            <FlowStepList>
                <FlowStep>
                    <ChooseFlow />
                </FlowStep>
            </FlowStepList>
        </Flow>
    </Page>
)

export default Home
