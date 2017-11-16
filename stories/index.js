import React from 'react';
import _ from 'lodash'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'
import styled from 'styled-components'
// import { Button, Welcome } from '@storybook/react/demo';
import { Button } from '../src/Button'

import { colors } from '../src/theme'
import Color from 'color'
import Tabs from '../src/Tabs'
import {Tooltip, TooltipContainer } from '../src/Tooltip'


// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('primary', () => {
   return ( 
      <Button primary onClick={action('clicked')}>Primary</Button>
   )
  })
 .add('default', () => {
   return ( 
    <Button onClick={action('clicked')}>Default</Button>
   )
  })



storiesOf('Color', module)
  .add('color', () => {
    
    console.log('create color', colors)
    const Block = styled.div`
      width: 500px;
      height: 20px;
      padding: 10px;
      color: ${ props => Color(props.color).negate().hslString() };
      background-color: ${props => props.color};
    `
    const colorList = _.reduce(colors, (arr, color, name) =>{

      const negateColor = Color(color).negate().hslString()
      arr.push(<Block key={name} color={color}>{name} color: {color} negate: {negateColor}</Block>)
      return arr
    }, [])
  
    return (<div> {colorList} </div>)
  })

storiesOf('Tabs', module)
  .add('standard', () => {
    const tabs = _.reduce(_.range(10), (a, i) => {
      a.push({id: 't' + i, name: `Tab ABC ${i}`})
      return a
    }, [])
   return ( 
     <div>
      <Tabs data={tabs} onChange={
        (tab) => { 
          console.log('active tab', tab)
        }
      }
      />
     </div>   
   )
  })



storiesOf('Tooltip', module)
  .add('standard', () => {
   return ( 
     <div>
     <TooltipContainer>
      <span> This is a div that has a tooltip</span>
      <Tooltip>
         This is a tooltip. Some more help text here.
      </Tooltip>
     </TooltipContainer>
      <TooltipContainer>
        <div> This is a div that has more tooltip</div>
        <div> This is a div that has more tooltip</div>
        <Tooltip>
         This is another tooltip. Some more help text here.
        </Tooltip>
     </TooltipContainer>  
    </div>
   )
  })