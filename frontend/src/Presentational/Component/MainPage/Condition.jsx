import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Conbox from "../Condition/Conbox";
import api from "../../../redux/api";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "none",
    borderBottom: "solid",
    borderBottomColor: "#ffffff",
    zIndex: 2,
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
    fontSize: "20px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : provided.color,
  }),

};


const Condition = ({
  setModuleChild,
  setSelectedMachineName,
  setSelectedModuleName,
  // selectedcompoDate,
  // setSelected,
}) => {
  const [machineData, setMachineData] = useState({});
  const [moduleData, setModuleData] = useState([]);
  const [status, setStatus] = useState("");
  const [currentMachineName, setCurrentMachineName] = useState("");
  const [currentModuleName, setCurrentModuleName] = useState("");
  const [selected, setSelected] = useState(""); // 스크롤 부분
  const [selectMachineValue, setSelectMachineValue] = useState({ value: "", label: "--------" });
  const [selectValue, setSelectValue] = useState({ value: "", label: "--------" });

  const collectionJSON = localStorage.getItem("collectionNames");
  const collectionNames = JSON.parse(collectionJSON);


  useEffect(() => {
    const eventSource = new EventSource(
      "http://3.36.125.122:8082/sse/connect",
      { headers: { accept: "text/event-stream" } },
      { withCredentials: true }
    );

    eventSource.onmessage = (e) => {
      console.log(e);
    };

    eventSource.addEventListener("connect", (event) => {
      const { data: received } = event;
      console.log("connect", received);
      console.log(event.data);
    });

    eventSource.addEventListener("machine", (event) => {
      const newMachineData = event.data;

      if (newMachineData == currentMachineName) {
        //  console.log('장비 갱신 콘솔은 됨');

        api
          .post(`/data/${currentMachineName}`, JSON.stringify({})) // 추후 root 자리에 변수 넣어서 변경. 현재는 root로 그냥 테스트.
          .then((response) => {
            // console.log(response.data);
            const modulelist = []; // 모듈인 애들 담아 놓는 리스트.
            for (const a of response.data) {
              //    console.log(a);
              if (a.name === currentMachineName) {
                setMachineData(a);
                const value = a.value;
                if (value < 0) {
                  setStatus((a) => "unacceptable");
                } else if (value < 0.03) {
                  setStatus((a) => "unsatisfactory");
                } else if (value < 0.48) {
                  setStatus((a) => "satisfactory");
                } else {
                  setStatus((a) => "Good");
                }
              } else {
                modulelist.push(a);
              }
            }
            setModuleData(modulelist);
          })
          .catch((error) => {
            console.log(error);
          });
        api
          .post(
            `data/machine/module?machineName=${currentMachineName}&moduleName=${currentModuleName}`,
            JSON.stringify({})
          )
          .then((response) => {
            //     console.log(response.data);
            setModuleChild(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    eventSource.addEventListener("error", (error) => {
      console.log("SSE Error: ", error);
    });

    return () => {
      eventSource.close();
    };
  }, [machineData, currentModuleName]);

  const handleChangeMachine = (selectedOption) => {
    const selectMachineName = selectedOption.value;
    // console.log(secondSelect.current.value)
    setSelectMachineValue(selectedOption);
    setCurrentMachineName(selectMachineName);
    setModuleChild([]); // 장비 드롭다운에서 다른 장비 선택 시 컴포넌트 리스트 출력 되는 것 초기화.
    // secondSelect.current.value = ""; // 장비 드롭다운에서 다른 장비 선택 시 모듈 드롭다운 초기화
    setSelectedMachineName(selectMachineName);

    setCurrentModuleName("");

    setSelectValue({ value: "", label: "--------" });

    api
      .post(`/data/${selectMachineName}`, JSON.stringify({})) // 추후 root 자리에 변수 넣어서 변경. 현재는 root로 그냥 테스트.
      .then((response) => {
        //    console.log(response.data);
        const modulelist = []; // 모듈인 애들 담아 놓는 리스트.
        for (const a of response.data) {
          //    console.log(a);
          if (a.name === selectMachineName) {
            setMachineData(a);
            const value = a.value;
            if (value < 0) {
              setStatus((a) => "unacceptable");
            } else if (value < 0.03) {
              setStatus((a) => "unsatisfactory");
            } else if (value < 0.48) {
              setStatus((a) => "satisfactory");
            } else {
              setStatus((a) => "Good");
            }
          } else {
            modulelist.push(a);
          }
        }
        setModuleData(modulelist);
      });
  };

  const handleChangeModule = (selectedOption) => {
    const selectModuleName = selectedOption.value;

    // console.log("클릭", selectModuleName);
    setCurrentModuleName(selectModuleName);
    setSelectedModuleName(selectModuleName);
    setSelected(selectModuleName); // 스크롤 부분

    console.log(selectedOption);

    setSelectValue(selectedOption);

    api
      .post(
        `data/machine/module?machineName=${currentMachineName}&moduleName=${selectModuleName}`,
        JSON.stringify({})
      )
      .then((response) => {
        setModuleChild(response.data);
        // console.log(response.data);
      });
  };

  const machineOptions = collectionNames.map((name) => ({ value: name, label: name }));
  const moduleOptions = moduleData.map((data) => ({ value: data.name, label: data.name }));

  return (
    <div>
      <Big>
        <ImgContainer>
          <img src="image/back.png" alt="" className="IMG" />
        </ImgContainer>

        <Fontst size={24}>CONDITION</Fontst>
        <Fontrmargin size={24}>MODULE</Fontrmargin>

        <StyledMachineSelect
          styles={customStyles}
          size="sm"
          value={selectMachineValue}
          onChange={handleChangeMachine}
          options={[{ value: "", label: "--------" }, ...machineOptions]}
          isOptionDisabled={(option) => option.value === ""}

        />
        <StyledModuleSelect
          styles={customStyles}
          size="sm"
          defaultValue=""
          value={selectValue}
          onChange={handleChangeModule}
          options={[{ value: "", label: "--------" }, ...moduleOptions]}
          isOptionDisabled={(option) => option.value === ""}

        />

        <div className="mt-5 d-flex justify-content-center align-items-center">
          <Conbox mstate={status} width={200} fontsize={24} />
        </div>
      </Big>

    </div>
  );
};

export default Condition;

const Big = styled.div`
  position: absolute;
  top: 10px;
  left: 1040px;
  background: linear-gradient(90deg, #0051c4 0%, #002962 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 460px;
  height: 230px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  z-index: 1;
`;
const Fontst = styled.div`
  position: absolute;
  top: 20px;
  left: 10px;
  font-family: "Inter";
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-left: 10px;
`;
const Fontrmargin = styled.div`
  position: absolute;
  top: 20px;
  left: 250px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-right: 40px;
`;

const StyledMachineSelect = styled(Select)`
  width: 180px;
  position: absolute;
  top: 60px;
  z-index: 999999;
  left: 30px;

`;

const StyledModuleSelect = styled(Select)`
  width: 180px;
  position: absolute;
  top: 22px;
  z-index: 2;
  left: 250px;

`;

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
