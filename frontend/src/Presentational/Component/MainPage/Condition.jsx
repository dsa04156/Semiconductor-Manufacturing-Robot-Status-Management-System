import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Conbox from "../Condition/Conbox";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

let mstate = "satisfactory";

const Condition = () => {
  return (
    <div>
      <Desktop>
        <Big>
          <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
            <Fontst size={24}>CONDITION</Fontst>
            <Fontrmargin size={24}>Module</Fontrmargin>
          </div>
          <div className="d-flex mt-3 ms-5 me-5 space-between">
            <Fontmargin>G*****</Fontmargin>
            <Form.Select size="sm">
              <option>Chamber A</option>
            </Form.Select>
          </div>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <Conbox mstate={mstate} width={200} fontsize={24} />
          </div>
        </Big>
      </Desktop>
      <Tablet>
        <Mid>
          <div className="d-flex mt-3 ms-3 justify-content-between">
            <Fontst size={14}>CONDITION</Fontst>
            <Fontrmargin size={14}>Module</Fontrmargin>
          </div>
          <div className="d-flex mt-3 ms-3 me-5 justify-content-between">
            <Fontmargin size={14}>G*****</Fontmargin>
            <Form.Select size="sm">
              <option>Chamber A</option>
            </Form.Select>
          </div>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <Conbox mstate={mstate} width={150} fontsize={18} />
          </div>
        </Mid>
      </Tablet>
      <Mobile>
        <Small>
          <div className="d-flex mt-3 ms-1 justify-content-between">
            <Fontst size={10}>CONDITION</Fontst>
            <Fontrmargin size={10}>Module</Fontrmargin>
          </div>
          <div className="d-flex mt-3 ms-1 me-1 justify-content-between">
            <Fontmargin size={10}>G*****</Fontmargin>
            <Form.Select size="sm">
              <option>Chamber A</option>
            </Form.Select>
          </div>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <Conbox mstate={mstate} width={100} fontsize={13} />
          </div>
        </Small>
      </Mobile>
    </div>
  );
};

export default Condition;

const Big = styled.div`
  position: absolute;
  top: 30px;
  left: 1070px;
  background: #122c45;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 429px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;
const Mid = styled.div`
  position: absolute;
  top: 30px;
  left: 720px;
  background: #122c45;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 250px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;
const Small = styled.div`
  position: absolute;
  top: 30px;
  left: 570px;
  background: #122c45;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 180px;
  height: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;
const Fontst = styled.div`
  font-family: "Domine";
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
`;
const Fontmargin = styled.div`
  font-family: "Domine";
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-right: 120px;
  margin-left: 20px;
`;
const Fontrmargin = styled.div`
  font-family: "Domine";
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-right: 30px;
`;
