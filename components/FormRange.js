const FormRange = ({ min, max, step, value, onChange }) => {
    // Generate range of numbers
    const range = Array.from(
        new Array((max - min) / step + 1).keys(),
        (index) => min + index * step
    );

    return (
        <div>
            <input
                className="block rounded-full appearance-none cursor-pointer focus:outline-none focus-visible:ring ring-blue-500 ring-opacity-50 bg-gray-900 bg-opacity-25 shadow-inner w-full -mx-4 px-4 h-4 box-content"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
            <div className="flex justify-between text-base cursor-default mt-4 -mx-1">
                {range.map((number) => (
                    <span
                        key={number}
                        className={
                            number === value
                                ? "text-gray-100 cursor-pointer text-center w-5"
                                : "text-gray-500 cursor-pointer text-center w-5"
                        }
                        onClick={() => onChange(number)}
                    >
                        {number}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FormRange;
