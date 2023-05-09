import React, {useState, useMemo} from 'react';
import styled from "styled-components";
import CreateTable from '../../common/CreateTable';
import HealthStatus from './HealthStatus';

const ComponentList = ( { child } ) => {

    const [test, setTest] = useState()

    return (
      <div>
        <Small>
          <div style={{ margin: '10px 0px 10px 20px' }}>ComponentList</div>
          <CreateTable
            setTest={setTest}
            data={child}
            test={test}
          />
        </Small>
          <HealthStatus componentData={child}/>
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
  width: 30vw;
  height: 63vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow-y: auto;
`;