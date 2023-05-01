import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import EvalStatus from './EvalStatus';

function CreateTable({ setTest, data, test }) {
  const [selected, setSelected] = useState(test);

  // Check if "data" and "test" are defined before using them
  if (!data || !test) {
    return null;
  }

  const idxHandler = (idx) => {
    setSelected(idx);
    setTest(idx);
  }

  const dataTable = data.map((elem, idx) => {
    let evalValue = '';

    if (elem.value < 0){
      evalValue = "unacceptable";
    }
    else if (elem.value < 0.03){
      evalValue = "unsatisfactory";
    }
    else if (elem.value < 0.3){
      evalValue = "satisfactory";
    }
    else {
      evalValue = "Good";
    }

    return (
      <tr className='tableBody' key={idx}>
        <td><input type="radio" checked={idx === selected} onChange={() => idxHandler(idx)} /></td>
        <td>{elem.name}</td>
        <td>
          <EvalStatus evalValue={evalValue}/> {/* Check if "elem.eval" is defined before using it */}
        </td>
        <td>{elem.value}</td>
      </tr>
    );
  });

  // Render the UI for your table
  return (
    <Styles>
      <table className="table">
        <thead>
          <tr className='tableHeader'>
            <td></td>
            <td>Component</td>
            <td>Status</td>
            <td>AssetScore</td>
          </tr>
        </thead>
        <tbody>
          {dataTable}
        </tbody>
      </table>
    </Styles>
  );
}

export default CreateTable;

const Styles = styled.div`
  table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;

    td {
      text-align: center;
      /* padding: 12px; */
    }

    .tableHeader {
      font-weight: bold;
      background-color: #f2f2f2;
    }

    .tableBody {
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }

      input[type='radio']:checked {
        background-color: #2196f3;
        color: white;
      }
    }
  }
`;