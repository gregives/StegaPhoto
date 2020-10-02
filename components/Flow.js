import React, { useState} from 'react'
import ChooseFlow from '../components/ChooseFlow'
import FlowStep from '../components/FlowStep'
import FlowStepList from '../components/FlowStepList'

const HideFlow = [
    <p>Steps for hiding files...</p>
]

const ShowFlow = [
    <p>Steps for retrieving files...</p>
]

const Flow = (props) => {
    const [flow, setFlow] = useState(null)

    const flowSteps = (flow) => {
        switch (flow) {
            case 'hide': return HideFlow
            case 'show': return ShowFlow
            default: return []
        }
    }

    return (
        <main className="relative">
            <div className="absolute pt-32 w-full bg-gradient-to-b from-blue-900 to-gray-800 opacity-50"></div>
            <div className="relative py-16 container mx-auto px-8">
                <FlowStepList>
                    <FlowStep>
                        <ChooseFlow onChoice={setFlow} />
                    </FlowStep>
                    {flowSteps(flow).map(step => (
                        <FlowStep>
                            {step}
                        </FlowStep>
                    ))}
                </FlowStepList>
            </div>
        </main>
    )
}

export default Flow
