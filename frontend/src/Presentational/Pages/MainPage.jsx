import HealthStatus from "../Component/MainPage/HealthStatus";
import Condition from '../Component/MainPage/Condition';
import SideBar from '../common/SideBar';
import ComponentList from '../Component/MainPage/ComponentList';
import { useMediaQuery } from "react-responsive";
import react, { useState, useEffect} from 'react';
import api from '../../redux/api';

const Mainpage = () => {
  const [machineData, setMachineData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
    
    useEffect(() => {
        api.post("/data/Machine/G_TEST", JSON.stringify({}))
        .then((response) => {
          setMachineData(response.data);
            const newModuleData = response.data.child.map(child => {
              return {
                name: child.name,
                value: child.value,
                child: child.child,
              }
            });
            setModuleData(newModuleData);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
        }, []);
        console.log(moduleData);
        
  return (
    <div>
      <SideBar/>
      {/* <HealthStatus /> */}
      {/* <Condition/> */}
      <Condition moduleData={moduleData} />
      {/* <ComponentList/> */}
    </div>
  );
};

export default Mainpage;

