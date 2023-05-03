import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

const VirtualMetrology = () => {
  return <div>vm</div>;
};

export default VirtualMetrology;

const Box = styled.div`
  position: absolute;
  top: 200px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 70%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
