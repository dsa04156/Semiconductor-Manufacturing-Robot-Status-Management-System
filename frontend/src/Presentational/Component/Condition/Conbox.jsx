import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Conbox = ({ mstate, width, fontsize }) => {
  // console.log(mstate)
  let [color, setcolor] = useState("");
  let [icon, seticon] = useState("");

  useEffect(() => {
    if (mstate === "unacceptable") {
      setcolor("#FF5172");
      seticon("icon-park-solid:bad-two");
    } else if (mstate === "unsatisfactory") {
      setcolor("#FFEE32");
      seticon(
        "streamline:mail-smiley-sad-face-chat-message-smiley-emoji-sad-face-unsatisfied"
      );
    } else if (mstate === "satisfactory") {
      setcolor("#30ADF3");
      seticon("teenyicons:mood-smile-solid");
    } else {
      setcolor("#A5FF32");
      seticon("icon-park-solid:good-two");
    }
    // else {
    //   setcolor("#bbbbbb")
    // }
  }, [mstate]);

  return (
    <Con color={color} width={width}>
      <Icon icon={icon} color="white" width={fontsize} style={{ margin: 4 }} />
      <Font fontsize={fontsize}>{mstate}</Font>
    </Con>
  );
};

export default Conbox;

const Con = styled.div`
  background: ${(props) => props.color};
  width: ${(props) => props.width}px;
  margin: 20px 0px 0px 0px;
  height: 50px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Font = styled.div`
  font-family: "Domine";
  font-style: normal;
  font-size: ${(props) => props.fontsize}px;
  color: #ffffff;
`;
