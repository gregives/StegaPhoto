import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";

const StepsHide = () => (
    <>
        <FlowStep>
            <p className="mb-8">
                Add the image you want to hide the files inside
            </p>
            <FormFiles id="hideImage" name="hideImage" label="Add image" />
        </FlowStep>
        <FlowStep>
            <p className="mb-8">Add the files you would like to hide</p>
            <FormFiles id="hideFiles" name="hideFiles" multiple />
        </FlowStep>
    </>
);

export default StepsHide;
