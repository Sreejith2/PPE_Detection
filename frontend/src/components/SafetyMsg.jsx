import React, { useContext } from 'react';
import { PpeContext } from '../PpeContext.jsx';

function SafetyMsg() {
    const { safetyMsgs, missingPpe } = useContext(PpeContext);

    // Debugging step: Log safetyMsgs and missingPpe
    console.log("Safety Messages:", safetyMsgs);  // Check safetyMsgs
    console.log("Missing PPE:", missingPpe);  // Check missingPpe

    // If no missing PPE, display success message
    if (missingPpe.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center max-w-[600px] min-h-56">
                <p className="text-green-600 font-bold">
                    All required PPE is in place. You are working safely.
                </p>
            </div>
        );
    }

    // If there are missing PPE items, render safety messages
    if (safetyMsgs && Object.keys(safetyMsgs).length > 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <span className='text-red-600 font-bold'>Missing PPE's</span>
                {Object.entries(safetyMsgs).map(([ppe, message]) => (
                    <div key={ppe} className="m-1 border-1 max-w-96 p-2 bg-white border-black">
                        <strong>{ppe}</strong>: <span className="text-red-600 font-[500]">{message}</span>
                    </div>
                ))}
            </div>
        );
    }

    return null;  // Return null if no safetyMsgs
}

export default SafetyMsg;
