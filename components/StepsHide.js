import React, { useState } from "react";
import FlowStep from "./FlowStep";
import FormFiles from "./FormFiles";
import FormRange from "./FormRange";

const StepsHide = () => {
    const [image, setImage] = useState([]);
    const [files, setFiles] = useState([]);
    const [compression, setCompression] = useState(9);

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
        </>
    );
};

export default StepsHide;
