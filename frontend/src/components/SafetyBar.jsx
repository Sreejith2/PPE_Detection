import React from "react"
const SafetyBar = ({ detectedPpe }) => {
    return (
      <div className="flex flex-col m-2 items-center justify-center">
        <h2 className="text-red-500 font-bold ">PPE Status</h2>
        <div className="flex flex-col">
          <div className="">
            <strong>Hardhat</strong>
          </div>
          <div className="">
            <strong>Safety Vest</strong>
          </div>
          <div className="">
            <strong>Mask</strong>
          </div>
        </div>
      </div>
    );
  };
  
  export default SafetyBar;
  