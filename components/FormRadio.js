const FormRadio = ({ name, label, value, onChange }) => (
    <label className="flex flex-row items-center">
        <input
            type="radio"
            name={name}
            value={value}
            className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500 mr-4"
            onChange={(event) => onChange(event.target.value)}
        />
        {label}
    </label>
);

export default FormRadio;
