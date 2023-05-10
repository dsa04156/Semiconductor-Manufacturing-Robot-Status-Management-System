// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Form from "react-bootstrap/Form";
// import Conbox from "../Condition/Conbox";
// import api from "../../../redux/api";

// const Condition = ({ setModuleChild }) => {
//   const [moduleData, setModuleData] = useState([]);
//   const [status, setStatus] = useState("");

//   const collectionJSON = localStorage.getItem("collectionNames");
//   const collectionNames = JSON.parse(collectionJSON);

//   const handleChangeMachine = (event) => {
//     const selectName = event.target.value;

//     api
//       .post(`/data/Machine/${selectName}`, JSON.stringify({}))
//       .then((response) => {
//         const data = response.data.child;
//         const value = response.data.value;
//         if (value < 0) {
//           setStatus((a) => "unacceptable");
//         } else if (selectName.value < 0.03) {
//           setStatus((a) => "unsatisfactory");
//         } else if (selectName.value < 0.3) {
//           setStatus((a) => "satisfactory");
//         } else {
//           setStatus((a) => "Good");
//         }
//         setModuleData((moduleData) => [moduleData, ...data]);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // 위 api 지우고 sse 통신 api 넣은 뒤 밑에 코드 넣으면 됨.
//   // .then((event) => {
//   //   const data = event.data.child;
//   //   const value = event.data.value;
//   //   if (value < 0) {
//   //     setStatus((a) => "unacceptable");
//   //   } else if (selectName.value < 0.03) {
//   //     setStatus((a) => "unsatisfactory");
//   //   } else if (selectName.value < 0.3) {
//   //     setStatus((a) => "satisfactory");
//   //   } else {
//   //     setStatus((a) => "Good");
//   //   }
//   //   setModuleData((moduleData) => [moduleData, ...data]);
//   // })

//   const handleChange = (event) => {
//     const selectedName = event.target.value;
//     console.log(moduleData);

//     for (const a of moduleData) {
//       if (a.name === selectedName) {
//         setModuleChild((moduleChild) => a.child);
//         break;
//       }
//     }
//   };

//   return (
//     <div>
//       <Big>
//         <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
//           <Fontst size={24}>CONDITION</Fontst>
//           <Fontrmargin size={24}>Module</Fontrmargin>
//         </div>
//         <div className="d-flex mt-3 ms-5 me-5 space-between">
//           <Form.Select
//             size="sm"
//             defaultValue=""
//             style={{ margin: "0 20px 0 0" }}
//             onChange={handleChangeMachine}
//           >
//             <option value="" disabled>
//               ---------
//             </option>
//             {collectionNames &&
//               collectionNames.map((data) => <option key={data}>{data}</option>)}
//           </Form.Select>
//           <Form.Select
//             size="sm"
//             defaultValue=""
//             style={{ margin: "0 0 0 20px" }}
//             onChange={handleChange}
//           >
//             <option value="" disabled>
//               ---------
//             </option>
//             {moduleData.map((data) => (
//               <option key={data.name}>{data.name}</option>
//             ))}
//           </Form.Select>
//         </div>
//         <div className="mt-4 d-flex justify-content-center align-items-center">
//           <Conbox mstate={status} width={200} fontsize={24} />
//         </div>
//       </Big>
//     </div>
//   );
// };

// export default Condition;

// const Big = styled.div`
//   position: absolute;
//   top: 30px;
//   left: 1070px;
//   background: #122c45;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   width: 429px;
//   height: 200px;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
// `;
// const Fontst = styled.div`
//   font-family: "Domine";
//   font-style: normal;
//   font-size: ${(props) => props.size}px;
//   color: #ffffff;
//   margin-left: 5px;
// `;
// const Fontrmargin = styled.div`
//   font-family: "Domine";
//   font-style: normal;
//   font-size: ${(props) => props.size}px;
//   color: #ffffff;
//   margin-right: 30px;
// `;

// const SelectContainer = styled.div`
//   flex: 1; /* 추가 */
//   display: flex; /* 추가 */
//   justify-content: space-between; /* 추가 */
// `;

//------------------------------------------------------------------------
// API 나누기 전

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import Form from 'react-bootstrap/Form';
// import Conbox from '../Condition/Conbox';
// import api from '../../../redux/api';

// const Condition = ({ setModuleChild }) => {
//   const [machineData, setMachineData] = useState([]);
//   const [moduleData, setModuleData] = useState([]);
//   const [status, setStatus] = useState('');
//   const [name, setname] = useState('');

//   const collectionJSON = localStorage.getItem('collectionNames');
//   const collectionNames = JSON.parse(collectionJSON);

//   // console.log(collectionNames);
//   console.log(name);

//   useEffect(() => {
//     const eventSource = new EventSource(
//       'http://3.36.125.122:8082/sse/connect',
//       { headers: { accept: 'text/event-stream' } }, {withCredentials: true}
//     );

//     eventSource.onmessage = (e) => {
//       console.log(e);
//     };
//     eventSource.addEventListener('connect', (event) => {
//       const { data: received } = event;
//       console.log('connect', received);
//       console.log(event.data);
//     });

//     eventSource.addEventListener('machine', (event) => {
//       const newMachineData = event.data;
//       console.log(newMachineData);
//       console.log(newMachineData, name)

//       // newMachineData 와 name이 같을 때 api를 보내라.
//       if (newMachineData == name) {
//         console.log("실행은 됨");
//         api
//           .post(`/data/Machine/${name}`, JSON.stringify({}))
//           .then((response) => {
//             console.log("다시 불러오는 api")
//             const data = response.data.child;
//             const value = response.data.value;
//             if (value < 0) {
//               setStatus((a) => 'unacceptable');
//             } else if (name.value < 0.03) {
//               setStatus((a) => 'unsatisfactory');
//             } else if (name.value < 0.3) {
//               setStatus((a) => 'satisfactory');
//             } else {
//               setStatus((a) => 'Good');
//             }
//             setMachineData((machineData) => [...machineData]);
//             setModuleData((moduleData) => [moduleData, ...data]);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     });

//     eventSource.addEventListener('error', (error) => {
//       console.log('SSE Error:', error);
//     });

//     return () => {
//       eventSource.close();
//     };
//   }, [machineData]);

//   const handleChangeMachine = (event) => {
//     const selectName = event.target.value;
//     setname(selectName);

//     api
//       .post(`/data/Machine/${selectName}`, JSON.stringify({}))
//       .then((response) => {
//         // const machineData = response.data;
//         // console.log(response.data);
//         const data = response.data.child;
//         const value = response.data.value;
//         if (value < 0) {
//           setStatus((a) => 'unacceptable');
//         } else if (selectName.value < 0.03) {
//           setStatus((a) => 'unsatisfactory');
//         } else if (selectName.value < 0.3) {
//           setStatus((a) => 'satisfactory');
//         } else {
//           setStatus((a) => 'Good');
//         }
//         setMachineData((machineData) => [...machineData]);
//         setModuleData((moduleData) => [moduleData, ...data]);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleChange = (event) => {
//     const selectedName = event.target.value;
//     console.log(moduleData);

//     for (const a of moduleData) {
//       if (a.name === selectedName) {
//         setModuleChild((moduleChild) => a.child);
//         break;
//       }
//     }
//   };

//   return (
//     <div>
      // <Big>
      //   <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
      //     <Fontst size={24}>CONDITION</Fontst>
      //     <Fontrmargin size={24}>Module</Fontrmargin>
      //   </div>
      //   <div className="d-flex mt-3 ms-5 me-5 space-between">
      //     <Form.Select
      //       size="sm"
      //       defaultValue=""
      //       style={{ margin: '0 20px 0 0' }}
      //       onChange={handleChangeMachine}
      //     >
      //       <option value="" disabled>
      //         ---------
      //       </option>
      //       {collectionNames &&
      //         collectionNames.map((data) => <option key={data}>{data}</option>)}
      //     </Form.Select>
      //     <Form.Select
      //       size="sm"
      //       defaultValue=""
      //       style={{ margin: '0 0 0 20px' }}
      //       onChange={handleChange}
      //     >
      //       <option value="" disabled>
      //         ---------
      //       </option>
      //       {moduleData.map((data) => (
      //         <option key={data.name}>{data.name}</option>
      //       ))}
      //     </Form.Select>
      //   </div>
      //   <div className="mt-4 d-flex justify-content-center align-items-center">
      //     <Conbox mstate={status} width={200} fontsize={24} />
      //   </div>
      // </Big>
//     </div>
//   );
// };

// export default Condition;

// const Big = styled.div`
//   position: absolute;
//   top: 30px;
//   left: 1070px;
//   background: #122c45;
//   border: 1px solid rgba(0, 0, 0, 0.2);
//   width: 429px;
//   height: 200px;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 20px;
// `;
// const Fontst = styled.div`
//   font-family: 'Domine';
//   font-style: normal;
//   font-size: ${(props) => props.size}px;
//   color: #ffffff;
//   margin-left: 5px;
// `;
// const Fontrmargin = styled.div`
//   font-family: 'Domine';
//   font-style: normal;
//   font-size: ${(props) => props.size}px;
//   color: #ffffff;
//   margin-right: 30px;
// `;

// const SelectContainer = styled.div`
//   flex: 1; /* 추가 */
//   display: flex; /* 추가 */
//   justify-content: space-between; /* 추가 */
// `;

//--------------------------------------------------------------------

// API 분리 후

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Conbox from '../Condition/Conbox';
import api from '../../../redux/api';

const Condition = ({ setModuleChild, setSelectedMachineName, setSelectedModuleName }) => {
  const [machineData, setMachineData] = useState({});
  const [moduleData, setModuleData] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [status, setStatus] = useState('');
  const [currentMachineName, setCurrentMachineName] = useState('');
  const [currentModuleName, setCurrentModuleName] = useState('');

  
  const collectionJSON = localStorage.getItem('collectionNames');
  const collectionNames = JSON.parse(collectionJSON);

  useEffect(() => {
    const eventSource = new EventSource(
      'http://3.36.125.122:8082/sse/connect',
      { headers: { accept: 'text/event-stream' }}, { withCredentials: true}
    );

    eventSource.onmessage = (e) => {
      console.log(e);
    };

    eventSource.addEventListener('connect', (event) => {
      const { data: received } = event;
      console.log('connect', received);
      console.log(event.data);
    });

    eventSource.addEventListener('machine', (event) => {
      const newMachineData = event.data
      console.log(newMachineData);
      console.log(newMachineData, currentMachineName);
      console.log(currentModuleName);

      if(newMachineData == currentMachineName){
        console.log('장비 갱신 콘솔은 됨');

        api
        .post(`/data/root`, JSON.stringify({})) // 추후 root 자리에 변수 넣어서 변경. 현재는 root로 그냥 테스트.
        .then((response) => {
          console.log(response.data);
          const modulelist = []; // 모듈인 애들 담아 놓는 리스트.
          for (const a of response.data){
            console.log(a);
            if (a.name === 'root'){
              setMachineData(a);
              const value = a.value;
              if (value < 0) {
                setStatus((a) => 'unacceptable');
              } else if (value < 0.03) {
                setStatus((a) => 'unsatisfactory');
              } else if (value < 0.48) {
                setStatus((a) => 'satisfactory');
              } else {
                setStatus((a) => 'Good');
              }
            }
            else {
              modulelist.push(a);
            }
          }
          setModuleData(modulelist);
          console.log('--------------------', currentModuleName);

          api
          .post(`data/machine/module?machineName=root&moduleName=${currentModuleName}`, JSON.stringify({}))
          .then((response) => {
            console.log(response.data);
            setModuleChild(response.data);
          })
          .catch((err) => {
            console.log(err);
          })
          
        })
        .catch((error) => {
          console.log(error);
        })
        console.log("여기 끝")
        // api
        // .post(`data/machine/module?machineName=root&moduleName=${currentModuleName}`, JSON.stringify({}))
        // .then((response) => {
        //   console.log(response.data);
        //   setModuleChild(response.data);
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
      }

      // const newModuleData =
    });

    eventSource.addEventListener('error', (error) => {
      console.log('SSE Error: ', error);
    });

    return () => {
      eventSource.close();
    };

  }, [machineData, currentModuleName]);

  const handleChangeMachine = (event) => {
    const selectMachineName = event.target.value;
    setCurrentMachineName(selectMachineName);
    setSelectedMachineName(selectMachineName);

    api
      .post(`/data/root`, JSON.stringify({})) // 추후 root 자리에 변수 넣어서 변경. 현재는 root로 그냥 테스트.
      .then((response) => {
        console.log(response.data);
        const modulelist = []; // 모듈인 애들 담아 놓는 리스트.
        for (const a of response.data){
          console.log(a);
          if (a.name === 'root'){
            setMachineData(a);
            const value = a.value;
            if (value < 0) {
              setStatus((a) => 'unacceptable');
            } else if (value < 0.03) {
              setStatus((a) => 'unsatisfactory');
            } else if (value < 0.48) {
              setStatus((a) => 'satisfactory');
            } else {
              setStatus((a) => 'Good');
            }
          }
          else {
            modulelist.push(a);
          }
        }
        setModuleData(modulelist);
      });
  }

  const handleChangeModule = (event) => {
    const selectModuleName = event.target.value;
    console.log("클릭", selectModuleName);
    setCurrentModuleName(selectModuleName);
    setSelectedModuleName(selectModuleName);

    api
    .post(`data/machine/module?machineName=root&moduleName=${selectModuleName}`, JSON.stringify({}))
    .then((response) => {
      setModuleChild(response.data);
      console.log(response.data)
    })
  };

  return (
    <div>
      <Big>
        <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
          <Fontst size={24}>CONDITION</Fontst>
          <Fontrmargin size={24}>Module</Fontrmargin>
        </div>
        <div className="d-flex mt-3 ms-5 me-5 space-between">
          <Form.Select
            size="sm"
            defaultValue=""
            style={{ margin: '0 20px 0 0' }}
            onChange={handleChangeMachine}
          >
            <option value="" disabled>
              ---------
            </option>
            {collectionNames &&
              collectionNames.map((data) => <option key={data}>{data}</option>)}
          </Form.Select>
          <Form.Select
            size="sm"
            defaultValue=""
            style={{ margin: '0 0 0 20px' }}
            onChange={handleChangeModule}
          >
            <option value="" disabled>
              ---------
            </option>
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
  
}

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
  font-family: 'Domine';
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-left: 5px;
`;
const Fontrmargin = styled.div`
  font-family: 'Domine';
  font-style: normal;
  font-size: ${(props) => props.size}px;
  color: #ffffff;
  margin-right: 30px;
`;

const SelectContainer = styled.div`
  flex: 1; /* 추가 */
  display: flex; /* 추가 */
  justify-content: space-between; /* 추가 */
`;