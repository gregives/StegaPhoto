import FormRadio from "./FormRadio";

const ChooseFlow = ({ onChoice }) => (
    <fieldset form="form" className="grid gap-4 mb-32">
        <p className="mb-4">I would like to</p>
        <FormRadio
            name="chooseFlow"
            value="hide"
            label="hide files inside an image"
            onChange={onChoice}
        />
        <FormRadio
            name="chooseFlow"
            value="find"
            label="retrieve files from an image"
            onChange={onChoice}
        />
    </fieldset>
);

export default ChooseFlow;
