import React from 'react'
import { Button as RebassButton} from 'rebass'
import styled from 'styled-components'
import _ from 'lodash'
import createDetectElementResize from './createDetectElementResize'
import List from './List'

const Container = styled.div`
  display: flex;
  min-width: 250px;
  border: 0px solid #ddd;
  padding-left: 5px;
  padding-right: 20px;
  border-bottom: 2px solid blue;
`

const Tab = styled.div.attrs({
    tabid: props => props.tabId
})`
  border: 0px solid blue;
  border-radius: 3px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${ props => props.active ? 'blue' : 'grey'};
  color: white;
  min-width: 90px;
  padding: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 1px;
  margin-bottom: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  flex: ${ props => props.active ? '1 0 auto' : '1 1 auto'};
  &:hover{
      background-color: ${ props => props.active ? 'blue' : 'lightblue'};
      color: black;
      flex: 1 0 auto;
  }
`

const MoreTab = styled.div`
  border-radius: 3px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${ props => props.active ? 'blue' : 'grey'};
  color: white;
  width: 30px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 1px;
  margin-bottom: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  &:hover {
      color: lightblue;
  }
  &:before {
      content: "...";
  }
`

export default class Tabs extends React.Component {
    constructor(props){
        super(props)
        this.state = {...props}
        this.handleTabClick = this.handleTabClick.bind(this)
        this._onResize = this._onResize.bind(this)
        this.handleShowMore = this.handleShowMore.bind(this)
        this.handleUnfocusShowMore  =this.handleUnfocusShowMore.bind(this)
    }
    componentDidMount() {
      this._detectElementResize = createDetectElementResize();
      this._detectElementResize.addResizeListener(
        this.containerRef,
        this._onResize,
      );

      this._onResize();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps})
    }
    handleTabClick(e){
        const activeId = e.target.getAttribute('tabid')
        if (!_.isUndefined(activeId)) {
          this.setState({ activeId })
          const activeTab = _.find(this.state.data, { id: activeId})
          this.props.onChange && this.props.onChange(activeTab)
        }
        this.setState({ showMore: false })
    }

    handleShowMore () {
      this.setState({ showMore: true})
    }
    
    handleUnfocusShowMore() {
        this.setState({ showMore: false})
    }

   _onResize  () {

    if (this.containerRef) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      const height = this.containerRef.offsetHeight || 0;
      const width = this.containerRef.offsetWidth || 0;

      const style = window.getComputedStyle(this.containerRef) || {};
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;

      if (
        (this.state.height !== newHeight) ||
        (this.state.width !== newWidth)
      ) {
        this.setState({
          height: height - paddingTop - paddingBottom,
          width: width - paddingLeft - paddingRight,
        });
      }
    }
  }

  render() {

        const allowedDisplayTabCount = _.floor(this.state.width / 100) - 1
        let activeTabIndex = 0 
        let i = 0
        for( i = 0 ; i < this.state.data.length; i++) {
            const tab = this.state.data[i]
            if (tab.id == this.state.activeId) {
                activeTabIndex = i
                tab.active = true
            } else {
                tab.active = false
            }
        }
        // active tab is not in display then move it to front
        if (activeTabIndex > allowedDisplayTabCount - 1) {
            const activeTab = this.state.data[activeTabIndex]
            const lastDisplayTab = this.state.data[allowedDisplayTabCount-1]
            this.state.data[allowedDisplayTabCount-1] = activeTab
            this.state.data[activeTabIndex] = lastDisplayTab
        }

        const hasMore = allowedDisplayTabCount < this.state.data.length
        const displayTabCount = hasMore ? allowedDisplayTabCount : this.state.data.length
        const displayTabs = []
        for (i = 0 ; i < displayTabCount; i++) {
           const tab = this.state.data[i]
             displayTabs.push(
              <Tab 
                key={tab.id}
                tabId={tab.id}
                active={tab.active}
                onClick={this.handleTabClick}>
                    {tab.name}
              </Tab>
            )
        }

        if (hasMore) {
            let moreList = null 
            if (this.state.showMore) {
              const listTabData = _.slice(this.state.data, allowedDisplayTabCount)
              moreList = (
                <div style={{ position: 'relative', right: 150 }} >
                <div style={{ position: 'absolute' }} >
                    <List data={listTabData} 
                     onClick={this.handleTabClick} 
                     onUnfocus={this.handleUnfocusShowMore}/>
                </div>
                </div>
              )
            }

            displayTabs.push(
              <div>
                  <MoreTab onClick={this.handleShowMore} active={this.state.showMore}>
                </MoreTab>
                {moreList}
             </div>
            )
        }

        return (
          <Container innerRef={(node)=>{this.containerRef = node}}> 
              {displayTabs} 
          </Container>
        )
    }
}