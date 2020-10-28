import React, { useState } from "react";
import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";
import FormPassword from "./FormPassword";
import ProgressButton from "./ProgressButton";

const StepsShow = () => {
    const [image, setImage] = useState([]);
    const [password, setPassword] = useState("");
    const [finding, setFinding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    return (
        <>
            <FlowStep>
                <p className="mb-8">
                    Add the image you want to retrieve files from within
                </p>
                <FormFiles
                    type="image"
                    accept="image/*"
                    files={image}
                    setFiles={setImage}
                />
            </FlowStep>
            <FlowStep>
                <p className="mb-8">
                    Enter the password used to hide the files{" "}
                    <span className="text-gray-500">(may be blank)</span>
                </p>
                <FormPassword value={password} onChange={setPassword} />
            </FlowStep>
            <FlowStep>
                <ProgressButton
                    progress={progress}
                    download={result && URL.createObjectURL(result)}
                >
                    {result
                        ? "Download files"
                        : finding
                        ? "Finding files..."
                        : "Find files inside image"}
                </ProgressButton>
            </FlowStep>
        </>
    );
};

export default StepsShow;
