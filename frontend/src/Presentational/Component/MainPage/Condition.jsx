import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Conbox from "../Condition/Conbox";
import ComponentList from "../../Component/MainPage/ComponentList";
import Graphtest from "../../Pages/Graphtest";

const Condition = ({ moduleData, machineData }) => {
  const [selectedChild, setSelectedChild] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState([]);
  const [machineState, setMachineState] = useState("unacceptable");

  // let mstate = '';

  const handleChangeMachine = (event) => {
    // setSelectedMachine(event.target.value);
    const selectName = event.target.value;
    const selectData = machineData.find((data) => data.name === selectName);
    // const value = selectData ? selectData.value : null;
    // if (selectedMachine !== null) {
    if (selectedMachine.value < 0) {
      setMachineState("unacceptable");
    } else if (selectedMachine.value < 0.33) {
      setMachineState("unsatisfactory");
    } else if (selectedMachine.value < 0.7) {
      setMachineState("satisfactory");
    } else {
      setMachineState("Good");
    }
    // }

    setSelectedChild(selectData ? selectData.child : []);
  };

  const handleChange = (event) => {
    const selectedName = event.target.value;
    const selectedData = moduleData.find((data) => data.name === selectedName);
    setSelectedChild(selectedData ? selectedData.child : []);
  };

  return (
    <div>
      <Big>
        <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
          <Fontst size={24}>CONDITION</Fontst>
          <Fontrmargin size={24}>Module</Fontrmargin>
        </div>
        <div className="d-flex mt-3 ms-5 me-5 space-between">
          {/* <Fontmargin>G*****</Fontmargin> */}
          <Form.Select size="sm" onChange={handleChangeMachine}>
            {machineData.map((data) => (
              <option key={data.name}>{data.name}</option>
            ))}
          </Form.Select>
          <Form.Select size="sm" onChange={handleChange}>
            {moduleData.map((data) => (
              <option key={data.name}>{data.name}</option>
            ))}
          </Form.Select>
          {/* <Form.Select size="sm" onChange={handleChange}>
              {moduleData.map((data) => (
                <option key={data.name}>{data.name}</option>
              ))}
            </Form.Select> */}
        </div>
        <div className="mt-4 d-flex justify-content-center align-items-center">
          <ComponentList child={selectedChild} />

          <Conbox mstate={machineState} width={200} fontsize={24} />
        </div>
      </Big>
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
