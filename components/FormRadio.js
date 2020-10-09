const FormRadio = (props) => (
    <>
        <div className="relative">
            <div className="absolute w-full h-full border-2 border-transparent pointer-events-none">
                <div className="w-full h-full border-2 border-gray-800 rounded-full"></div>
            </div>
            <input
                type="radio"
                id={props.id}
                name={props.name}
                className="block appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500"
                onChange={(event) => props.onChange(event)}
            />
        </div>
        <label htmlFor={props.id} className="pl-4">
            {props.label}
        </label>
    </>
);

export default FormRadio;
