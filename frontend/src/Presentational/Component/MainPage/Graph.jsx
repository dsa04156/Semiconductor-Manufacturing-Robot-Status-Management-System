import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { Icon } from "@iconify/react";

const Graph = (selectedcompoData, selectedMachineName, selectedModuleName) => {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setendDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  return (
    <div>
      <Box>
        <PeriodBox>
          <Font>pump</Font>
          <Line></Line>
          <AlignPeriod>
            <PFont>PERIOD</PFont>{" "}
            <SIconContainer>
              <Icon
                icon="material-symbols:calendar-today-outline-rounded"
                width="20"
                color="blue"
                onClick={() => setStartDateOpen(!startDateOpen)}
              />
            </SIconContainer>
            
            <SDatePicker
              showPopperArrow={false}
              selected={startDate}
              open={startDateOpen}
              onChange={(date) => setStartDate(date)}
              locale={ko}
              selectsStart
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="yyyy-MM-dd HH:mm"
              popperProps={{
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      enabled: true,
                      escapeWithReference: false,
                      boundary: "viewport",
                    },
                  },
                ],
              }}
            />
            {"   "}~{"  "}
            
            <SIconContainer>
              <Icon
                icon="material-symbols:calendar-today-outline-rounded"
                width="20"
                color="blue"
                onClick={() => setEndDateOpen(!endDateOpen)}
              />
            </SIconContainer>
            <SDatePicker
              showPopperArrow={false}
              selected={endDate}
              open={endDateOpen}
              onChange={(date) => setendDate(date)}
              locale={ko}
              selectsEnd
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="yyyy-MM-dd HH:mm"
              popperProps={{
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  {
                    name: "preventOverflow",
                    options: {
                      enabled: true,
                      escapeWithReference: false,
                      boundary: "viewport",
                    },
                  },
                ],
              }}
            />
          </AlignPeriod>
        </PeriodBox>
      </Box>
    </div>
  );
};

export default Graph;

const SIconContainer = styled.div`
  width: 20px;
  color: blue;
`;

const Box = styled.div`
  position: absolute;
  top: 260px;
  left: 630px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 870px;
  height: 470px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
`;
const Font = styled.div`
  margin: 10px 0px 10px 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #707070;
`;
const Line = styled.div`
  position: absolute;
  width: 810px;
  height: 0px;
  left: 25px;
  top: 45px;
  border: 1px solid #eff1f5;
`;

const PFont = styled.div`
  margin-left: 30px;
  margin-right: 5px;

  font-family: "Inter";
  font-style: normal;
  font-size: 13px;
  color: #707070;
`;
const PeriodBox = styled.div`
  position: relative;
  align-items: center;
  z-index: 4;
  font-size: 12px;
`;
const AlignPeriod = styled.div`
  margin-top: 40px;
  display: flex;
  width: 450px;
`;
const SDatePicker = styled(DatePicker)`
  border: none;
`;
