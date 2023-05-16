import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const EvalStatus = ({ evalValue }) => {
  let color;
  let background;
  let icon;
  let width;

  switch (evalValue) {
    case "UNACCEPTABLE":
      color = "white";
      background = "red";
      icon = "icon-park-solid:bad-two";
      width = "125px";
      break;
    case "UNSATISFACTORY":
      color = "white";
      background = "#D9B310";
      icon =
        "streamline:mail-smiley-sad-face-chat-message-smiley-emoji-sad-face-unsatisfied";
      width = "133px";
      break;
    case "SATISFACTORY":
      color = "white";
      background = "blue";
      icon = "teenyicons:mood-smile-solid";
      width = "116px";
      break;
    case "GOOD":
      color = "white";
      background = "green";
      icon = "icon-park-solid:good-two";
      width = "70px";
      break;
    default:
      break;
  }

  const StyledStatus = styled.span`
    color: ${color};
    background: ${background};
    text-align: center;
    display: inline-block;
    width: ${width};
    border-radius: 20px;
    font-weight: bold;
  `;

  return (
    <StyledStatus>
      <Icon
        icon={icon}
        color="white"
        style={{ marginLeft: 5, marginRight: 5 }}
      />
      <span style={{ marginRight: "5px" }}>{evalValue}</span>
    </StyledStatus>
  );
};

export default EvalStatus;
