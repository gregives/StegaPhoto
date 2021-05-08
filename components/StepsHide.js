import { useState } from "react";
import FormFiles from "./FormFiles";
import FormRange from "./FormRange";
import FormPassword from "./FormPassword";
import ProgressButton from "./ProgressButton";
import HideWorker from "../workers/Hide.worker";

const StepsHide = () => {
    const [image, setImage] = useState([]);
    const [files, setFiles] = useState([]);
    const [compression, setCompression] = useState(9);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hiding, setHiding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const hideFiles = () => {
        setHiding(true);
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
        <form id="form" className="grid gap-32">
            <div>
                <p className="mb-8">
                    Add the image you want to hide the files inside
                </p>
                <FormFiles
                    type="image"
                    accept="image/*"
                    files={image}
                    setFiles={setImage}
                />
            </div>
            <div>
                <p className="mb-8">Add the files you would like to hide</p>
                <FormFiles multiple files={files} setFiles={setFiles} />
            </div>
            <div>
                <p className="mb-8">Choose the compression level</p>
                <FormRange
                    min={0}
                    max={9}
                    step={1}
                    value={compression}
                    onChange={setCompression}
                />
            </div>
            <div>
                <p className="mb-8">
                    Choose and confirm password{" "}
                    <span className="text-gray-400">(optional)</span>
                </p>
                <FormPassword
                    value={password}
                    confirm={confirmPassword}
                    onChange={setPassword}
                    onConfirm={setConfirmPassword}
                    valid={password === confirmPassword}
                />
            </div>
            <div>
                <ProgressButton
                    onClick={hideFiles}
                    progress={progress}
                    download={result && URL.createObjectURL(result)}
                >
                    {result
                        ? "Download image"
                        : hiding
                        ? "Hiding files..."
                        : "Hide files inside image"}
                </ProgressButton>
            </div>
        </form>
    );
};

export default StepsHide;
