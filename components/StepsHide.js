import React, { useState } from "react";
import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";
import FormRange from "./FormRange";
import FormPassword from "./FormPassword";

const StepsHide = () => {
    const [image, setImage] = useState([]);
    const [files, setFiles] = useState([]);
    const [compression, setCompression] = useState(9);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validPassword = password === confirmPassword;

    return (
        <>
            <FlowStep>
                <p className="mb-8">
                    Add the image you want to hide the files inside
                </p>
                <FormFiles
                    id="hideImage"
                    name="hideImage"
                    label="Add image"
                    accept="image/*"
                    files={image}
                    setFiles={setImage}
                />
            </FlowStep>
            <FlowStep>
                <p className="mb-8">Add the files you would like to hide</p>
                <FormFiles
                    id="hideFiles"
                    name="hideFiles"
                    multiple
                    files={files}
                    setFiles={setFiles}
                />
            </FlowStep>
            <FlowStep>
                <p className="mb-8">Choose the compression level</p>
                <FormRange
                    min={0}
                    max={9}
                    step={1}
                    value={compression}
                    onChange={setCompression}
                />
            </FlowStep>
            <FlowStep>
                <p className="mb-8">
                    Choose and confirm password{" "}
                    <span className="text-gray-500">(optional)</span>
                </p>
                <FormPassword
                    value={password}
                    confirm={confirmPassword}
                    onChange={setPassword}
                    onConfirm={setConfirmPassword}
                    valid={validPassword}
                />
            </FlowStep>
        </>
    );
};

export default StepsHide;
