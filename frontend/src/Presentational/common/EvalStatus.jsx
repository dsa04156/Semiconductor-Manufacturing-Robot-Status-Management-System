import React from 'react';
import styled from 'styled-components';
import { Icon } from "@iconify/react";

const EvalStatus = ( { evalValue } ) => {
    let color;
    let background;
    let icon;

    switch (evalValue) {
        case 'unacceptable':
          color = 'white';
          background = 'red';
          icon ="icon-park-solid:bad-two";
          break;
        case 'unsatisfactory':
          color = 'white';
          background = 'yellow';
          icon ="streamline:mail-smiley-sad-face-chat-message-smiley-emoji-sad-face-unsatisfied";
          break;
        case 'satisfactory':
          color = 'white';
          background = 'blue';
          icon="teenyicons:mood-smile-solid";
          break;
        case 'Good':
          color = 'white';
          background = 'green';
          icon="icon-park-solid:good-two";
          break;
        default:
          break;
      }

    const StyledStatus = styled.span`
        color: ${color};
        background: ${background};
        text-align: center;
        display: inline-block;
        width: 100px;
        border-radius: 20px;
    `;
  
    return <StyledStatus><Icon icon={icon} color="white" />{evalValue}</StyledStatus>;
};

export default EvalStatus;
