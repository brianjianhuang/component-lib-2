// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { borderRadius, colors, grid } from '../constants';


type HTMLElement = any;

const Container = styled.a`
border-radius: ${borderRadius}px;
border: 1px solid grey;
background-color: ${({ isDragging }) => (isDragging ? colors.green : colors.white)};

/* cursor: grabbing is handled by app */
cursor: grab;
box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px ${colors.shadow}` : 'none')};
padding: ${grid}px;
min-height: 20px;
margin-bottom: ${grid}px;
user-select: none;
transition: background-color 0.1s ease;

/* anchor overrides */
color: ${colors.black};

&:hover {
  color: ${colors.black};
  text-decoration: none;
}
&:focus {
  outline: 2px solid ${colors.purple};
}

/* flexbox */
display: flex;
align-items: center;
`;

const Content = styled.div`
/* flex child */
flex-grow: 1;

/* Needed to wrap text in ie11 */
/* https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox */
flex-basis: 100%

/* flex parent */
display: flex;
flex-direction: column;
`;


const Label = styled.label`
margin: 2;
text-align: left;
`

export default class QuoteItem extends Component {

  componentDidMount() {
    if (!this.props.autoFocus) {
      return;
    }

    // eslint-disable-next-line react/no-find-dom-node
    const node: HTMLElement = ReactDOM.findDOMNode(this);
    node.focus();
  }

  render() {
    const { quote, isDragging, provided } = this.props;

    return (
      <Container
        isDragging={isDragging}
        innerRef={provided.innerRef}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
 
        <Content>
            <Label>{quote.author.name}</Label>
        </Content>    
      </Container>
    );
  }
}

