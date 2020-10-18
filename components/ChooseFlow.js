import FormRadio from "./FormRadio";

const ChooseFlow = ({ onChoice }) => (
    <div className="grid gap-4">
        <p className="mb-4">I would like to</p>
        <FormRadio
            name="chooseFlow"
            value="hide"
            label="hide files inside an image"
            onChange={onChoice}
        />
        <FormRadio
            name="chooseFlow"
            value="show"
            label="retrieve files from an image"
            onChange={onChoice}
        />
    </div>
);

export default ChooseFlow;
