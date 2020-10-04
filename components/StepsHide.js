import FlowStep from "./FlowStep";
import FormFile from "./FormFile";

const StepsHide = () => (
    <>
        <FlowStep>
            <p className="mb-8">Upload the files you would like to hide</p>
            <FormFile id="hideFiles" name="hideFiles" multiple />
        </FlowStep>
        <FlowStep>Second hide step</FlowStep>
    </>
);

export default StepsHide;
