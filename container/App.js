import React from 'react';
import styled from 'styled-components';
import DragSortableList from 'react-drag-sortable'

import TopStrip from './TopStrip';
import Title from './Title';
import Wrapper from './Wrapper';
import Continue from './Continue';
import Chips from './Chips';
import Remove from './Remove';
import Input from './Input';
import Add from './Add';


const placeholder = (
	<Chips></Chips>
)

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {currentTag: '', tags: []};
        this.addTag = this.addTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.onSort = this.onSort.bind(this);
        this.logIt = this.logIt.bind(this);
    }
    onSort = (sortedList, dropEvent) => {
        this.setState({
            tags: [...sortedList]
        })
    }
    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this.addTag();
        }
    }
    handleChange(event) {
        this.setState({currentTag: event.target.value});
    }
    addTag(event) {
        const index = this.state.tags.length;
        if(index >= 10){
        } else {
            const value = this.state.currentTag;
            this.setState({
                tags: [...this.state.tags, 
                    {content: (<Chips key={value}>{this.state.currentTag}<Remove onClick={() => this.removeTag(value)}><svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24">
                    <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                    />
                    </svg></Remove></Chips>
                    )}
                ],
                currentTag: ''
            });
        }
    }
    removeTag(index){
        this.setState({
            tags: this.state.tags.filter((_) => _.content.key !== index)
        })
    }
    logIt(){
        const logger = this.state.tags.map(x => x.content.key);
        console.log(logger);
    }
    render() {
        return (
            <div>
                <TopStrip></TopStrip>
                <Wrapper>
                    <Title>What are your skills?</Title>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate euismod pretium. Phasellus vel auctor magna, sit amet vestibulum ex. Vestibulum accumsan consequat interdum. Nulla vel odio id felis mollis hendrerit faucibus vitae lorem. Ut lobortis semper quam, at tristique mi condimentum at</p>
                    <span>Your skills (Upto 10)</span>
                    <br />
                    <Input
                        id="currentTag"
                        type="text"
                        value={this.state.currentTag}
                        onChange={this.handleChange}
                        onKeyPress={this._handleKeyPress}
                    />
                    <Add onClick={this.addTag}>Add</Add>
                    <br />
                    <br />
                    <DragSortableList items={this.state.tags} moveTransitionDuration={0.3} dropBackTransitionDuration={0.3} placeholder={placeholder} onSort={this.onSort} type="horizontal"/>
                    <Continue onClick={this.logIt}>Continue</Continue>
                </Wrapper>
            </div>
        );
    }
}