import React, {Component} from 'react';
import "./UserInfo.css";

class UserInfo extends Component {

	//display picture and username
	render() {
		return (
			<div className="userInfo">
				<img alt= ""  src={this.props.avatar} />
				<p className="handle">
					{this.props.handle}
				</p>
			</div>
		);
	}

}


export default UserInfo;
