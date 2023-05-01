import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        
        borderBottom: "7px solid #aaa",
        lineHeight: "0.1em",
        margin: "0px 20px 540px",
        
      }}
    >
      <span style={{ background: "#fff" }}>{text}</span>
    </div>
  );
};

export default HorizonLine;