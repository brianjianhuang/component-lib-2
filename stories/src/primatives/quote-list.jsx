// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import QuoteItem from '../primatives/quote-item';
import { grid, colors } from '../constants';
import Title from '../primatives/title';


const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? colors.blue.lighter : colors.blue.light)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 250px;
  /* not relying on the items for a margin-bottom
  as it will collapse when the list is empty */
  margin-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 300px;
`;

const Container = styled.div``;

export default class QuoteList extends Component {

  renderQuotes = (dropProvided) => {
    const { listType, quotes } = this.props;
    const title = this.props.title ? (
      <Title>{this.props.title}</Title>
    ) : null;

    return (
      <Container>
        {title}
        <DropZone innerRef={dropProvided.innerRef}>
          {quotes.map((quote) => (
            <Draggable key={quote.id} draggableId={quote.id} type={listType}>
              {(dragProvided, dragSnapshot) => (
                <div>
                  <QuoteItem
                    key={quote.id}
                    quote={quote}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                    autoFocus={this.props.autoFocusQuoteId === quote.id}
                  />
                  {dragProvided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  }

  render() {
    const { listId, listType, internalScroll, isDropDisabled, style } = this.props;

    return (
      <Droppable droppableId={listId} isDropDisabled={isDropDisabled} type={listType}>
        {(dropProvided, dropSnapshot) => (
          <Wrapper
            style={style}
            isDraggingOver={dropSnapshot.isDraggingOver}
            isDropDisabled={isDropDisabled}
          >
            {internalScroll ? (
              <ScrollContainer>
                {this.renderQuotes(dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderQuotes(dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
