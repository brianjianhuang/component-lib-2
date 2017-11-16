import React from 'react'
import styled from 'styled-components'


export const TooltipContainer = styled.div`
  position: relative;
`

const TooltipContent = styled.div`
    visibility: hidden;
    /* Position the tooltip */
    position: absolute;
    left: 10px;
    top: 20px;
    z-index: 1;
   ${TooltipContainer}:hover & {
    visibility: visible;
  }
`
const ArrowUp = styled.div`
  width: 0; 
  height: 0; 
  margin: 0 auto;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
`

const TooltipText = styled.div`
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    padding: 5px;
  }
`

export const Tooltip = (props) => (
    <TooltipContent>
        <ArrowUp />
        <TooltipText>
            {props.children}
        </TooltipText>
    </TooltipContent>
)


