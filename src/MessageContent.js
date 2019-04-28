import React, { Component } from 'react';
import "./Content.css";

class MessageContent extends Component {

	//message content
	render () {
		return (
      <div className="content">
        <Meta
          timestamp={this.props.timestamp}
          source={this.props.source}
          isStarred={this.props.isStarred}
          handleChange={this.props.handleChange}
          trashMessage={this.props.trashMessage}
          isTrashed={this.props.isTrashed}
        />
        <Content
          content = {this.props.content}
        />
      </div>
		);
	}

}

class Meta extends Component {
  
  render () {

    return (
      <div className="meta">
      	<PostData
		  		timestamp={this.props.timestamp}
		  		source={this.props.source}
		  	/>
		  	<Star
		  		isStarred={this.props.isStarred}
          handleChange={this.props.handleChange}
		  	/>
        <Trash
          trashMessage={this.props.trashMessage}
          isTrashed={this.props.isTrashed}
        />
      </div>

    );
  }
}

class Content extends Component {

  render () {
    return (
    	<p>
				{this.props.content}
			</p>
    );
  }
}

class PostData extends Component {

	//display where post is from and date
	render() {
		return (
			<div className = "postData">
				<Time
					timestamp= {this.props.timestamp}
				/> 
        <p className="source"> | {this.props.source}</p>
			</div>
		);
	}
}

class Trash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTrashed: this.props.isTrashed
    }
  }

  handleClick() {
    this.props.trashMessage();

    this.setState((state) => ({
      isTrashed: !state.isTrashed
    }));
    
    this.forceUpdate();
  }

  render () {
    return (
      <button className="trash" onClick={this.handleClick.bind(this)}>
        {this.state.isTrashed ? "Save" : "Trash"}
			</button>
		);
  }
}




class Star extends Component {

	constructor(props) {
		super(props);
		this.state = {isStarred: this.props.isStarred};
	}

	handleClick() {
		this.setState(state => ({
			isStarred: !state.isStarred
		}), () => { 
     this.props.handleChange();
    });

    this.forceUpdate();
	}
 	
	//star button
	render () {
		return (
			<button className="star" onClick={this.handleClick.bind(this)}>
				{this.state.isStarred ? 'Starred!' :
					'Star Message!' }
			</button>
		);
	}
		
}

class Time extends React.Component {

	render() {
		return (
			<p className="time">
				{this.props.timestamp}
			</p>

		);
	}

}
      
export default MessageContent;

