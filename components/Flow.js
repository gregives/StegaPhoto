import React, { useState } from "react";
import ChooseFlow from "./ChooseFlow";
import FlowStep from "./FlowStep";
import FlowStepList from "./FlowStepList";
import StepsFind from "./StepsFind";
import StepsHide from "./StepsHide";

const Flow = () => {
    const [flow, setFlow] = useState("hide");

    const chosenFlowSteps = (() => {
        switch (flow) {
            case "find":
                return <StepsFind />;
            case "hide":
                return <StepsHide />;
            default:
                return <></>;
        }
    })();

    return (
        <main className="relative">
            <div className="absolute pt-32 w-full bg-gradient-to-b from-blue-900 to-gray-800 opacity-50"></div>
            <div className="relative py-32 container mx-auto px-8">
                <form>
                    <FlowStepList>
                        <FlowStep>
                            <ChooseFlow onChoice={setFlow} />
                        </FlowStep>
                        {chosenFlowSteps}
                    </FlowStepList>
                </form>
            </div>
        </main>
    );
};

export default Flow;
