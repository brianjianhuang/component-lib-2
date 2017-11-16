import React from 'react'
import { Button as RebassButton} from 'rebass'
import styled from 'styled-components'

export const Button = styled(RebassButton)`
	border: 1px solid rgba(0, 0, 0, .25);
	background-color: ${ 
    props => props.primary ? props.theme.colors.primary : props.theme.colors.default
  
  };
	box-shadow: 0 0 4px rgba(0, 0, 0, .25)
`