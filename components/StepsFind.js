import { useState } from "react";
import FormFiles from "./FormFiles";
import FormPassword from "./FormPassword";
import ProgressButton from "./ProgressButton";
import FindWorker from "../workers/Find.worker";

const StepsFind = () => {
    const [image, setImage] = useState([]);
    const [password, setPassword] = useState("");
    const [finding, setFinding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const findFiles = () => {
        setFinding(true);
        const worker = new FindWorker();

        worker.onmessage = ({ data: { progress, result } }) => {
            setProgress(progress);
            setResult(result);
        };

        worker.postMessage({
            image,
            password,
        });
    };

    return (
        <form id="form" className="grid gap-32">
            <div>
                <p className="mb-8">
                    Add the image you want to retrieve files from within
                </p>
                <FormFiles
                    type="image"
                    accept="image/*"
                    files={image}
                    setFiles={setImage}
                />
            </div>
            <div>
                <p className="mb-8">
                    Enter the password used to hide the files{" "}
                    <span className="text-gray-400">(may be blank)</span>
                </p>
                <FormPassword value={password} onChange={setPassword} />
            </div>
            <div>
                <ProgressButton
                    onClick={findFiles}
                    progress={progress}
                    download={result && URL.createObjectURL(result)}
                >
                    {result
                        ? "Download files"
                        : finding
                        ? "Finding files..."
                        : "Find files inside image"}
                </ProgressButton>
            </div>
        </form>
    );
};

export default StepsFind;
