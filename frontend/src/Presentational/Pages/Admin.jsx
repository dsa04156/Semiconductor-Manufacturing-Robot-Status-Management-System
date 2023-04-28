import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../redux/api";

const Admin = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("Unknown");

  useEffect(() => {
    const _dbTest = async () => {
      // **헤더값에 토큰 값**을 주면 -> 토큰 값 인지해서 admin이 맞구나
      // 하면 다시 보낸다
      //axios.get('http://3.36.125.122:8082/account/list')
      const res = await api.get("account/list");
      console.log(res.data);
      setData(res.data);
    };
    _dbTest();
  }, []);

  // 이름 검색 부분
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    if (item && item.name) {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  //권한 변경 부분
  const handleApply = async (event, name, permission) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/updatePermission",
        {
          Name: name,
          Permission: permission,
        }
      );
      console.log(res.data);
      alert(res.data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Box>
        <div className="table-container">
          <table className="table table-hover">
            <thead style={{ fontSize: "40px" }}>
              <tr>
                <th>ID</th>
                <th>H.P</th>
                <th>Name</th>
                <th>Permission</th>
                <th>Edit Permission</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td key={index} style={{ color: "blue", fontSize: "20px" }}>
                    {item.email}
                  </td>
                  <td style={{ fontSize: "20px" }} key={index}>
                    {item.phone}
                  </td>
                  <td style={{ fontSize: "20px" }} key={index}>
                    {item.name}
                  </td>
                  <td style={{ fontSize: "20px" }} key={index}>
                    {item.type}
                  </td>
                  <td style={{ fontSize: "20px" }} key={index}>
                    <Form.Select
                      size="sm"
                      value={selectedPermission}
                      onChange={(e) => setSelectedPermission(e.target.value)}
                    >
                      <option value="Unknown">Unknown</option>
                      <option value="G-Client">G-Client</option>
                      <option value="N-Client">N-Client</option>
                    </Form.Select>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={(e) =>
                        handleApply(e, item.Name, selectedPermission)
                      }
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
      <Box2>
        <Form.Group>
          <Form.Label className="admin">Administer</Form.Label>

          <input
            autoFocus={true}
            type="text"
            htmlsize={30}
            className="search"
            placeholder=" 이름 검색"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "300px" }}
          />
        </Form.Group>
      </Box2>
    </div>
  );
};

export default Admin;

const Box = styled.div`
  position: absolute;
  top: 200px;
  left: 150px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 70%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Box2 = styled.div`
  position: absolute;
  top: 10px;
  left: 150px;
  width: 40%;
  display: flex;
  align-items: center;
`;
