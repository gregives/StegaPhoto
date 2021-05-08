import { useRef, useState } from "react";
import pretty from "pretty-bytes";

const FormFiles = ({ type = "file", multiple, accept, files, setFiles }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInput = useRef(null);

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    contents: reader.result,
                    name: file.name,
                    date: new Date(file.lastModified),
                    size: file.size,
                    type: file.type,
                });
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const loadFiles = async (event) => {
        setLoading(true);
        try {
            const newFiles = await Promise.all(
                [...event.target.files].map(readFile)
            );
            setError(false);
            setFiles([...files, ...newFiles].reduce(uniqueFiles, []));
        } catch {
            setError(true);
        }
        setLoading(false);
    };

    const uniqueFiles = (uniqueFiles, file) => {
        const exists = uniqueFiles.find(
            (existing) =>
                existing.name === file.name &&
                existing.lastModified === file.lastModified &&
                existing.size === file.size &&
                existing.type === file.type
        );

        return exists ? uniqueFiles : [...uniqueFiles, file];
    };

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 bg-opacity-25 shadow-inner p-8 -mx-8 sm:-mx-4 sm:rounded-lg">
            {files.map((file, index) => (
                <li
                    key={index}
                    className="relative flex flex-row items-center text-base md:text-lg bg-gray-700 shadow rounded"
                >
                    <span className="flex-grow py-2 px-4 truncate">
                        {file.name}
                    </span>
                    <span className="flex-shrink whitespace-nowrap py-2 px-4 text-gray-500">
                        {pretty(file.size)}
                    </span>
                    <button
                        className="self-stretch px-3 text-3xl bg-gray-800 bg-opacity-25 hover:bg-opacity-50 focus:outline-none focus-visible:ring ring-blue-500 ring-opacity-50 rounded-r"
                        type="button"
                        onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                        }
                    >
                        &times;
                    </button>
                </li>
            ))}
            {(files.length === 0 || multiple) && (
                <li
                    key={files.length + 1}
                    className="relative flex flex-row items-center text-base md:text-lg bg-gray-700 shadow rounded"
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={loadFiles}
                        multiple={multiple}
                        hidden
                        ref={fileInput}
                    />
                    <span className="flex-grow py-2 px-4 truncate">
                        {error
                            ? "Error loading "
                            : loading
                            ? "Loading "
                            : "Add "}
                        {type}
                        {multiple && "s"}
                        {loading && "..."}
                    </span>
                    <button
                        className="self-stretch px-3 text-3xl bg-gray-800 bg-opacity-25 hover:bg-opacity-50 focus:outline-none focus-visible:ring ring-blue-500 ring-opacity-50 rounded-r"
                        type="button"
                        onClick={() => fileInput.current.click()}
                    >
                        +
                        <span className="absolute w-full h-full inset-0"></span>
                    </button>
                </li>
            )}
        </ul>
    );
};

export default FormFiles;
