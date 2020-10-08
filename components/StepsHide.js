import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";

const StepsHide = () => (
    <>
        <FlowStep>
            <p className="mb-8">Upload the files you would like to hide</p>
            <FormFiles id="hideFiles" name="hideFiles" multiple />
        </FlowStep>
        <FlowStep>Second hide step</FlowStep>
    </>
);

export default StepsHide;
