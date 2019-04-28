import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Display.css';

import Data from './messages.json';
import MessageContent from './MessageContent.js';
import UserInfo from './UserInfo.js';


/*
 * I should render the Message based on some state of Display
 */

class Message extends Component {

  constructor(props) {
    super(props);
    console.log("constructor called");
    this.state = {
      isTrashed: this.props.isTrashed,
      isStarred: this.props.isStarred
    };
  }

  trash() {
    this.setState((state) => ({
      isTrashed: !state.isTrashed
    }), () => {
      this.props.trashMessage(this.props.index, this.state.isStarred, 
       this.state.isTrashed); 
    });

    this.forceUpdate();

  }

  changeStarred() {
    this.setState((state) => ({
      isStarred: !state.isStarred
    }), () => {
      this.state.isStarred ? this.props.handleChange(1) :
        this.props.handleChange(-1);
    });
  }

	render() {
		return (
			<div className="message">
				<UserInfo
					avatar={this.props.avatar}
					handle={this.props.handle}
				/>
				<MessageContent
          trashMessage={this.trash.bind(this)}
          timestamp={this.props.timestamp}
          source={this.props.source}
          isStarred={this.props.isStarred}
          isTrashed={this.state.isTrashed}
					content={this.props.content}
          handleChange={this.changeStarred.bind(this)}
				/>
			</div>
		);
	}
				
}




class MessageDisplay extends React.Component {

  constructor(props) {
    super(props);

  	var arr = [];
    var count = 0;

		var data = Data.messages;	


    var empty = new Array(data.length);
    empty.fill(false);


    for (var i = 0; i < data.length; i++) {
      if (data[i].meta.isStarred === true) {
        count = count + 1;
      }
    

			arr.push(
				<Message
          key={i.toString()}
          index={i}
          trashMessage={this.trash.bind(this)}
          handleChange={this.changeCount.bind(this)}
					avatar={data[i].avatar}
					handle={data[i].handle}
					source={data[i].source}
					timestamp={data[i].timestamp}
					isStarred={data[i].meta.isStarred} 
          isTrashed={false}
					content={data[i].content}
				/>
			); 

		}
	
    this.state = {
      messageArr: arr,
      messageData: data,
      starredNum: count,
      trash: empty,
      regDisplay: true
    };

    

  }


  //problem with toggling because it forces the constructor of messages to be
  //called
  toggleDisplay() {

    this.setState((state) => ({
      regDisplay: !state.regDisplay
    }), () => {
      this.forceUpdate();
    });

  }

  //when calling ReactDOM.render the constructor for the messages are called


  trash(key, isStarred, isTrashed) {
    var updatedArr= this.state.messageArr;
    var updatedTrash = this.state.trash;
    var newVal = 	(<Message
          key={key.toString()}
          index={key}
          trashMessage={this.trash.bind(this)}
          handleChange={this.changeCount.bind(this)}
					avatar={this.state.messageData[key].avatar}
					handle={this.state.messageData[key].handle}
					source={this.state.messageData[key].source}
					timestamp={this.state.messageData[key].timestamp}
					isStarred={this.state.messageData[key].meta.isStarred} 
          isTrashed={isTrashed}
					content={this.state.messageData[key].content}
				/>);
 
 
    if (isTrashed) { 
      updatedArr.splice(key, 1, false);
      updatedTrash.splice(key, 1, newVal); 
    }
    else {
      updatedTrash.splice(key, 1, false)
      updatedArr.splice(key, 1, newVal); 
    } 
    

    if (isStarred && this.state.regDisplay) {
      this.changeCount(-1);
    }
    else if (isStarred && !this.state.regDisplay) {
      this.changeCount(1);
    }
 
  
    this.setState((state) => ({
      trash: updatedTrash,
      messageArr: updatedArr 
    }), () => {
      this.forceUpdate(); 
    });
  }

  changeCount(addition) {
    var countContainer = this.refs.starredCount;

    if (!this.state.regDisplay) {
      return;
    }


     this.setState((state) => ({
      starredNum: state.starredNum + addition
     }), () => ( 
      ReactDOM.render(<h1>
       Starred: {this.state.starredNum} </h1>,
       countContainer
     )));

  }

	render() {

		return (
     <div> 
       <div className="count" ref="starredCount">
          <h1>
            Starred: {this.state.starredNum}
          </h1>
       </div>
       <Toggle toggleDisplay={this.toggleDisplay.bind(this)} />
       <div className="display" style={this.getStyle(this.state.regDisplay)}>
          {this.state.messageArr}
       </div>;
       <div className="display" style={this.getStyle(!this.state.regDisplay)}>
          {this.state.trash}
       </div>
     </div>
    );
	}

  getStyle(regDisplay) {
    return regDisplay ? {} : {display: 'none'};
  }

}

class Toggle extends Component {

  //state with regDisplay
  constructor(props) {
    super(props);
    this.state = {
      regDisplay: true
    }
  }


  //handleClick
  handleClick() {
    //change state
    this.setState((state) => ({
      regDisplay: !state.regDisplay
    }));

    this.props.toggleDisplay();
    
  }
  
  //render
  render () {
    return ( 
      <button className="toggle" onClick={this.handleClick.bind(this)}>
        {this.state.regDisplay ? "View Trash": "View Messages"}
      </button>
    );
  }

}


export default MessageDisplay;
