import { useState } from "react";
import ChooseFlow from "./ChooseFlow";
import StepsFind from "./StepsFind";
import StepsHide from "./StepsHide";

const Flow = () => {
    const [flow, setFlow] = useState(null);
    const ChosenFlow = flow === "find" ? StepsFind : StepsHide;

    return (
        <main className="relative">
            <div className="absolute top-0 pt-32 w-full bg-gradient-to-b from-blue-900 to-gray-800 opacity-50"></div>
            <div className="py-32 container xl:max-w-screen-xl mx-auto px-8">
                <noscript>
                    <div className="mb-32 bg-gradient-to-b from-red-800 to-red-900 p-8 -mx-8 sm:-mx-4 sm:rounded-lg shadow-lg">
                        StegaPhoto requires JavaScript to hide and find files
                        within images!
                    </div>
                </noscript>
                <ChooseFlow onChoice={setFlow} />
                <ChosenFlow />
            </div>
            <div className="absolute bottom-0 pt-32 w-full bg-gradient-to-t from-blue-900 to-gray-800 opacity-10"></div>
        </main>
    );
};

export default Flow;
