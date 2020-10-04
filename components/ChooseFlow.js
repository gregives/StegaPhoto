import FormRadio from './FormRadio'

const ChooseFlow = ({ onChoice }) => (
    <div>
        <p>I would like to</p>
        <div className="flex flex-row items-center mt-8">
            <FormRadio id="chooseHideFlow" name="chooseFlow" label="hide files inside an image" onClick={() => onChoice('hide')} />
        </div>
        <div className="flex flex-row items-center mt-4">
            <FormRadio id="chooseShowFlow" name="chooseFlow" label="retrieve files from an image" onClick={() => onChoice('show')} />
        </div>
    </div>
)

export default ChooseFlow
