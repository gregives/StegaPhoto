import React, { useRef, useState } from "react";

const FormFile = (props) => {
    const [files, setFiles] = useState([]);
    const fileInput = useRef(null);

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
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 bg-gray-900 bg-opacity-25 shadow-inner py-8 overflow-y-auto -mx-8 sm:-mx-4 sm:rounded-lg">
            {files.map((file, index) => (
                <li
                    key={index}
                    className="flex flex-col place-items-center text-center text-sm p-2"
                >
                    <span className="relative py-8 px-10 mb-4 w-1/3 bg-blue-700 bg-opacity-25 overflow-hidden rounded not-italic">
                        <button
                            className="absolute top-0 right-0 px-2 -mt-2 text-3xl rounded-bl-lg focus:outline-none focus-visible:shadow-outline hover:bg-blue-500 hover:bg-opacity-25 text-gray-500 hover:text-gray-100"
                            onClick={() =>
                                setFiles(
                                    files.filter((_file, i) => i !== index)
                                )
                            }
                        >
                            &times;
                        </button>
                    </span>
                    <span className="w-full truncate">{file.name}</span>
                </li>
            ))}
            <li>
                <input
                    type="file"
                    id={props.id}
                    name={props.name}
                    onChange={(event) =>
                        setFiles(
                            [...files, ...event.target.files].reduce(
                                uniqueFiles,
                                []
                            )
                        )
                    }
                    multiple={props.multiple}
                    hidden
                    ref={fileInput}
                />
                <label
                    htmlFor={props.id}
                    className="flex flex-col place-items-center text-center text-sm p-2"
                >
                    <button
                        className="relative py-8 px-10 mb-4 w-1/3 focus:outline-none focus-visible:shadow-outline bg-blue-700 hover:bg-blue-500 bg-opacity-25 hover:bg-opacity-25 rounded cursor-pointer"
                        onClick={() => fileInput.current.click()}
                    >
                        <span className="absolute inset-0 h-full w-full text-4xl text-gray-500 hover:text-gray-100 focus:text-gray-100">
                            +
                        </span>
                    </button>
                    <span className="w-full truncate">
                        {props.multiple ? "Add files" : "Add file"}
                    </span>
                </label>
            </li>
        </ul>
    );
};

export default FormFile;
