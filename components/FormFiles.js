import React, { useRef, useState } from "react";
import pretty from "pretty-bytes";

const FormFiles = (props) => {
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
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 bg-opacity-25 shadow-inner p-8 -mx-8 sm:-mx-4 sm:rounded-lg">
            {files.map((file, index) => (
                <li
                    key={index}
                    className="relative flex flex-row items-center text-base md:text-lg bg-gray-700 shadow rounded"
                >
                    <span className="flex-grow py-2 px-4 truncate">
                        {file.name}
                    </span>
                    <span className="flex-shrink whitespace-no-wrap py-2 px-4 text-gray-500">
                        {pretty(file.size)}
                    </span>
                    <button
                        className="px-3 text-3xl bg-gray-800 bg-opacity-25 hover:bg-opacity-50 focus:outline-none focus-visible:shadow-outline rounded-r"
                        onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                        }
                    >
                        &times;
                    </button>
                </li>
            ))}
            {(files.length === 0 || props.multiple) && (
                <li
                    key={files.length + 1}
                    className="relative flex flex-row items-center text-base md:text-lg bg-gray-700 shadow rounded"
                >
                    <input
                        type="file"
                        accept={props.accept || undefined}
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
                    <span className="flex-grow py-2 px-4 truncate">
                        {props.label || "Add file"}
                        {props.multiple && "s"}
                    </span>
                    <button
                        className="px-3 text-3xl bg-gray-800 bg-opacity-25 hover:bg-opacity-50 focus:outline-none focus-visible:shadow-outline rounded-r"
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
