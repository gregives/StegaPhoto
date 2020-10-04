const FormRadio = (props) => (
    <>
        <input type="radio" id={props.id} name={props.name} className="appearance-none focus:outline-none focus-visible:shadow-outline rounded-full border-2 border-current p-3 checked:bg-orange-500" onClick={(event) => props.onClick(event)} />
        <label htmlFor={props.id} className="pl-4">{props.label}</label>
    </>
)

export default FormRadio
