import React, { useRef, useState } from "react";

const FormFile = (props) => {
    const [files, setFiles] = useState([]);
    const fileInput = useRef(null);

    return (
        <ul
            for={props.id}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-900 bg-opacity-25 shadow-inner h-64 py-8 overflow-y-auto rounded-lg"
        >
            {files.map((file, index) => (
                <li className="flex flex-col place-items-center text-center text-sm break-words p-2 mb-8">
                    <span className="relative p-8 mb-4 w-1/3 bg-blue-700 bg-opacity-25 overflow-hidden rounded not-italic">
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
                    {file.name}
                </li>
            ))}
            <li>
                <input
                    type="file"
                    id={props.id}
                    name={props.name}
                    onChange={(event) =>
                        setFiles([...files, ...event.target.files])
                    }
                    multiple={props.multiple}
                    hidden
                    ref={fileInput}
                />
                <label
                    for={props.id}
                    className="flex flex-col place-items-center text-center text-sm break-words p-2 mb-8"
                >
                    <button
                        className="relative p-8 mb-4 w-1/3 focus:outline-none focus-visible:shadow-outline bg-blue-700 hover:bg-blue-500 bg-opacity-25 hover:bg-opacity-25 rounded cursor-pointer"
                        onClick={() => fileInput.current.click()}
                    >
                        <span className="absolute inset-0 h-full w-full text-4xl text-gray-500 hover:text-gray-100 focus:text-gray-100">
                            +
                        </span>
                    </button>
                    {props.multiple ? "Add files" : "Add file"}
                </label>
            </li>
        </ul>
    );
};

export default FormFile;
