const FormRadio = ({ id, name, label, onChange }) => (
    <>
        <input
            type="radio"
            id={id}
            name={name}
            className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500"
            onChange={(event) => onChange(event)}
        />
        <label htmlFor={id} className="pl-4">
            {label}
        </label>
    </>
);

export default FormRadio;
