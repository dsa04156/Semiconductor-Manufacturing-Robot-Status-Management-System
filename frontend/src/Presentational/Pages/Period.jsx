import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import api from "../../redux/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Condition from "../Component/MainPage/Condition";

const Period = () => {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ); // 7일 전으로 가장 처음 start Default값을 세팅

  const [endDate, setEndDate] = useState(new Date());

  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar2, setShowCalendar2] = useState(false);

  const onChangeStartDate = (date) => {
    setStartDate(date);
  };
  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <PeriodBox>
      {" "}
      PERIOD{" "}
      <CalendarIcon
        src="image/calendar-icon.png"
        onClick={() => {
          setShowCalendar(!showCalendar);
          console.log("clicked");
        }}
      />
      {showCalendar && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            onChangeStartDate(date);
            setShowCalendar(false);
          }}
          selectsStart
          startDate={startDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="yyyy-MM-dd HH:mm"
          inline
          popperPlacement="bottom-end"
        />
      )}
      {startDate.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        pattern: " ",
      })}
      {"   "}~ {/* 아래는 EndDate */}
      <CalendarIcon
        src="image/calendar-icon.png"
        onClick={() => {
          setShowCalendar2(!showCalendar2);
          console.log("clicked");
        }}
      />
      {showCalendar2 && (
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            onChangeEndDate(date);
            setShowCalendar2(false);
          }}
          selectsEnd
          endDate={endDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="yyyy-MM-dd HH:mm"
          inline
          popperPlacement="bottom-end"
        />
      )}
      {endDate.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        pattern: " ",
      })}
    </PeriodBox>
  );
};

export default Period;

const PeriodBox = styled.div`
  position: absolute;
  top: 15px;
  left: 730px;
  background: #ffffff;
  // border: 1px solid rgba(0, 0, 0, 0.2);
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 60%;
  height: 38%;

  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: 1;
`;
const CalendarIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const DateInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #212121;
  background-color: transparent;
  cursor: pointer;
`;
