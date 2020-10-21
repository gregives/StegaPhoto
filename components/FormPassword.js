const FormPassword = ({ value, confirm, onChange, onConfirm, valid }) => (
    <div className="-mx-4 grid md:grid-cols-2 gap-8">
        <input
            className="bg-gray-900 bg-opacity-25 rounded-lg shadow-inner focus:outline-none focus-visible:shadow-outline text-3xl w-full px-4 py-2 border-2 border-transparent"
            type="password"
            autoComplete="new-password"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
        <div className="relative">
            <input
                className={`bg-gray-900 bg-opacity-25 rounded-lg shadow-inner focus:outline-none focus-visible:shadow-outline text-3xl w-full px-4 py-2 border-2 ${
                    valid ? "border-transparent" : "border-orange-500"
                }`}
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => onConfirm(event.target.value)}
            />
        </div>
    </div>
);

export default FormPassword;