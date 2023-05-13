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
      width = "115px";
      break;
    case "UNSATISFACTORY":
      color = "white";
      background = "#D9B310";
      icon =
        "streamline:mail-smiley-sad-face-chat-message-smiley-emoji-sad-face-unsatisfied";
      width = "125px";
      break;
    case "SATISFACTORY":
      color = "white";
      background = "blue";
      icon = "teenyicons:mood-smile-solid";
      width = "110px";
      break;
    case "GOOD":
      color = "white";
      background = "green";
      icon = "icon-park-solid:good-two";
      width = "60px";
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
      <Icon icon={icon} color="white" style={{ margin: 2 }} />
      {evalValue}
    </StyledStatus>
  );
};

export default EvalStatus;
