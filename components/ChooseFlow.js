import FormRadio from "./FormRadio";

const ChooseFlow = ({ onChoice }) => (
    <div className="grid gap-4">
        <p className="mb-4">I would like to</p>
        <FormRadio
            name="chooseFlow"
            label="hide files inside an image"
            onChange={() => onChoice("hide")}
        />
        <FormRadio
            name="chooseFlow"
            label="retrieve files from an image"
            onChange={() => onChoice("show")}
        />
    </div>
);

export default ChooseFlow;
