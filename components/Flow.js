import React, { useState } from "react";
import ChooseFlow from "./ChooseFlow";
import FlowStep from "./FlowStep";
import FlowStepList from "./FlowStepList";
import StepsHide from "./StepsHide";
import StepsShow from "./StepsShow";

const Flow = (props) => {
    const [flow, setFlow] = useState(null);

    const chosenFlowSteps = (() => {
        switch (flow) {
            case "hide":
                return <StepsHide />;
            case "show":
                return <StepsShow />;
            default:
                return <></>;
        }
    })();

    return (
        <main className="relative">
            <div className="absolute pt-32 w-full bg-gradient-to-b from-blue-900 to-gray-800 opacity-50"></div>
            <div className="relative py-32 container mx-auto px-8">
                <FlowStepList>
                    <FlowStep>
                        <ChooseFlow onChoice={setFlow} />
                    </FlowStep>
                    {chosenFlowSteps}
                </FlowStepList>
            </div>
        </main>
    );
};

export default Flow;
