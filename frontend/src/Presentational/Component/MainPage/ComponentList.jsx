import React, {useState, useMemo} from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/reducer/authReducer";
import styled from "styled-components";
import CreateTable from '../../common/CreateTable';
import api from "../../../redux/api";
import { useEffect } from 'react';
import HealthStatus from './HealthStatus';

const ComponentList = ( { child } ) => {
    const [componentList, setComponentList] = useState([]);



    useEffect(() => {
      setComponentList([...child]);
    }, [child]);

    useEffect(() => {
    }, [componentList]);

    const [test, setTest] = useState()

    const data = useMemo(() => componentList, [componentList]);



    return (
      <div>
        <Small>
          <div style={{ margin: '10px 0px 10px 20px' }}>ComponentList</div>
          <CreateTable
            setTest={setTest}
            data={data}
            test={test}
          />
        </Small>
          <HealthStatus componentData={data}/>
        
      </div>
    );
};

export default ComponentList;

const Small = styled.div`
  position: absolute;
  top: 230px;
  left: -920px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 470px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow-y: auto;
  /* display: flex; */
  /* align-items: center; */
`;
