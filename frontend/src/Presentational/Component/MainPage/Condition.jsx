import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Conbox from "../Condition/Conbox";
import api from "../../../redux/api";


const Condition = ({ setModuleChild}) => {
  const [moduleData, setModuleData] = useState([]);
  const [status, setStatus] = useState('')

  const collectionJSON = localStorage.getItem('collectionNames')
  const collectionNames = JSON.parse(collectionJSON)

  
  const handleChangeMachine = (event) => {
    const selectName = event.target.value;

    api.post(`/data/Machine/${selectName}`, JSON.stringify({}))
    .then((response) => {
      const data = response.data.child
      const value = response.data.value
      if (value < 0){
        setStatus((a) => "unacceptable");
      }
      else if (selectName.value < 0.03){
        setStatus((a) => "unsatisfactory");
      }
      else if (selectName.value < 0.3){
        setStatus((a) => "satisfactory");
      }
      else {
        setStatus((a) => "Good");
      }
      setModuleData(moduleData => [...data] )
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleChange = (event) => {
    const selectedName = event.target.value;
    console.log(moduleData)

    for (const a of moduleData) {
      if (a.name === selectedName) {
        setModuleChild(moduleChild => a.child)
        break;
      }
    }
  };
  
  return (
    <div>
        <Big>
          <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
            <Fontst size={24}>CONDITION</Fontst>
            <Fontrmargin size={24}>Module</Fontrmargin>
          </div>
          <div className="d-flex mt-3 ms-5 me-5 space-between" >
            <Form.Select size="sm" defaultValue="" style={{ margin: "0 20px 0 0" }} onChange={handleChangeMachine}>
              <option value="" disabled>---------</option>
              {collectionNames.map((data) => (
                <option key={data}>{data}</option>
              ))}
            </Form.Select>
            <Form.Select size="sm" defaultValue="" style={{ margin: "0 0 0 20px" }} onChange={handleChange}>
              <option value="" disabled>---------</option>
              {moduleData.map((data) => (
                <option key={data.name}>{data.name}</option>
              ))}
            </Form.Select>
          </div>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <Conbox mstate={status} width={200} fontsize={24} />
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
  font-size: ${(props) =>props.size}px;
  color: #ffffff;
  margin-left: 5px;
`;
const Fontrmargin = styled.div`
  font-family: "Domine";
  font-style: normal;
  font-size: ${(props) =>props.size}px;
  color: #ffffff;
  margin-right: 30px;
`;

const SelectContainer = styled.div`
  flex: 1; /* 추가 */
  display: flex; /* 추가 */
  justify-content: space-between; /* 추가 */
`;