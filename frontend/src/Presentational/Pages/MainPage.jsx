import Condition from '../Component/MainPage/Condition';
import ComponentList from '../Component/MainPage/ComponentList';
import react, { useState } from 'react';

const Mainpage = () => {
  const [moduleChild, setModuleChild] = useState([])
  console.log(moduleChild)
        
  return (
    <div>
      <Condition setModuleChild={setModuleChild}   />
      <ComponentList child={moduleChild}/>
    </div>
  );
};

export default Mainpage;

