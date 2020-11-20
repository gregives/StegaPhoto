const FormPassword = ({ value, confirm, onChange, onConfirm, valid }) => (
    <div className={`-mx-4 grid gap-8 ${onConfirm ? "md:grid-cols-2" : ""}`}>
        <input
            className="bg-gray-900 bg-opacity-25 placeholder-gray-700 rounded-lg shadow-inner focus:outline-none focus-visible:ring ring-blue-500 ring-opacity-50 md:text-3xl w-full px-4 py-2 border-2 border-transparent"
            type="password"
            autoComplete="new-password"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
        />
        {onConfirm && (
            <input
                className={`bg-gray-900 bg-opacity-25 placeholder-gray-700 rounded-lg shadow-inner focus:outline-none md:text-3xl w-full px-4 py-2 border-2 ${
                    valid
                        ? "border-transparent focus-visible:ring ring-blue-500 ring-opacity-50"
                        : "border-red-500 focus-visible:ring ring-red-500 ring-opacity-50"
                }`}
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => onConfirm(event.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            />
        )}
    </div>
);

export default FormPassword;
