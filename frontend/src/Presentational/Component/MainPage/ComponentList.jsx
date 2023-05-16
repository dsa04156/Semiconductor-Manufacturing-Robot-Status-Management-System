import React, { useState, useMemo } from "react";
import styled from "styled-components";
import CreateTable from "../../common/CreateTable";
import HealthStatus from "./HealthStatus";

const ComponentList = ({ child, setSelectComponentData }) => {
  const [test, setTest] = useState(0); //component list idx 값 저장
  setSelectComponentData(child[test]);

  return (
    <div>
      <Small>
        <Font>COMPONENT LIST</Font>
        <Line/>
          <CreateTable setTest={setTest} data={child} test={test} child={child} />
      </Small>
      <HealthStatus componentData={child} />
    </div>
  );
};

export default ComponentList;

const Small = styled.div`
  position: absolute;
  top: 260px;
  left: 120px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 460px;
  height: 470px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow-y: hidden;
`;

const Font = styled.div`
  margin: 12px 0px 12px 25px;
  font-family: "Inter";
  font-style: normal;
  font-size: 16px;
  color: #707070;
`;

const Line = styled.div`
  position: absolute;
  width: 430px;
  height: 0px;
  left: 15px;
  top: 45px;
  border: 1px solid #eff1f5;
`;