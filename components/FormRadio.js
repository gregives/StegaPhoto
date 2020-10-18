const FormRadio = ({ name, label, onChange }) => (
    <label className="flex flex-row items-center">
        <input
            type="radio"
            name={name}
            className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500 mr-4"
            onChange={(event) => onChange(event)}
        />
        {label}
    </label>
);

export default FormRadio;
