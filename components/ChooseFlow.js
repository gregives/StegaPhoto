const ChooseFlow = ({ onChoice }) => (
    <div>
        <p>I would like to</p>
        <div className="flex flex-row items-center mt-8">
            <input type="radio" id="chooseHideFlow" name="chooseFlow" className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500" onClick={() => onChoice('hide')} />
            <label htmlFor="chooseHideFlow" className="pl-4">hide files inside an image</label>
        </div>
        <div className="flex flex-row items-center mt-4">
            <input type="radio" id="chooseShowFlow" name="chooseFlow" className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500" onClick={() => onChoice('show')} />
            <label htmlFor="chooseShowFlow" className="pl-4">retrieve files from an image</label>
        </div>
    </div>
)

export default ChooseFlow
