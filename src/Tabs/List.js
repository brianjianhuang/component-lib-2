import React from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import _ from 'lodash'
import createDetectElementResize from './createDetectElementResize'

const Container = styled.div`
  width: 200px;
  max-height: 300px;
  overflow: auto;
  border: 3px solid blue;
  &:focus {
    outline: 0px;
  }
`

const Tab = styled.div.attrs({
    tabid: props => props.tabId || ''
})`
  border: 1px solid #ddd;
  border-top: 0px;
  background-color: ${ props => props.active ? 'blue' : 'white'};
  padding: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  &:hover{
      background-color: lightblue;
  }
`

export default class List extends React.Component {
    constructor(props){
        super(props)
        this.state = {...props, focus: true}
        this.handleClick = this.handleClick.bind(this)
        this.handleBlur= this.handleBlur.bind(this)
    }
    componentDidMount() {
      if (this.containerRef) {
        ReactDOM.findDOMNode(this.containerRef).focus();
      }
    }
    componentDidUpdate() {
      if (this.containerRef) {
        ReactDOM.findDOMNode(this.containerRef).focus();
      }   
    }
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps, focus:true})
    }
    handleClick(e){
      console.log(e)
      this.props.onClick && this.props.onClick(e)
      this.setState({ focus:false })
    }
    handleBlur (){
      this.setState({ focus: false })
      this.props.onUnfocus && this.props.onUnfocus()
    }
    render() {
        if ( !this.state.focus) {
          return null
        }
        const tabs = _.reduce(_.sortBy(this.state.data, ['name']), (previous, i) =>{
            previous.push(
              <Tab 
                key={i.id}
                tabId={i.id}>
                    {i.name}
              </Tab>
            )
            return previous
        }, [])

        return (
          <Container 
           innerRef={ node => this.containerRef = node }
           onClick={this.handleClick}
           onBlur={this.handleBlur}
           tabIndex={0}
           > 
           {tabs} 
          </Container>
        )
    }
}