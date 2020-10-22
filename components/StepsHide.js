import React, { useState } from "react";
import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";
import FormRange from "./FormRange";
import FormPassword from "./FormPassword";
import ProgressButton from "./ProgressButton";
import HideWorker from "../workers/hide.worker";

const StepsHide = () => {
    const [image, setImage] = useState([]);
    const [files, setFiles] = useState([]);
    const [compression, setCompression] = useState(9);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const hideFiles = () => {
        const worker = new HideWorker();

        worker.onmessage = ({ data: { progress, result } }) => {
            setProgress(progress);
            setResult(result);
        };

        worker.postMessage({
            image,
            files,
            compression,
            password,
        });
    };

    return (
        <>
            <FlowStep>
                <p className="mb-8">
                    Add the image you want to hide the files inside
                </p>
                <FormFiles
                    type="image"
                    accept="image/*"
                    files={image}
                    setFiles={setImage}
                />
            </FlowStep>
            <FlowStep>
                <p className="mb-8">Add the files you would like to hide</p>
                <FormFiles multiple files={files} setFiles={setFiles} />
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
                    valid={password === confirmPassword}
                />
            </FlowStep>
            <ProgressButton onClick={hideFiles} progress={progress}>
                Hide files inside image
            </ProgressButton>
        </>
    );
};

export default StepsHide;
