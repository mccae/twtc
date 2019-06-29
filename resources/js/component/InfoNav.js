import React, { Component } from 'react' ;
import ReactDOM from 'react-dom' ;
import {Container , Menu , Label , Button } from 'semantic-ui-react' ;
import Axios from 'axios' ;



export default class InfoNav extends React.Component {

	state = {
		'isFollowing' : 0 ,
		'followBtnLoading' : false ,
	}

	handleClick() {
		return 'hi' ;

	} 


	componentDidMount = () => {

		// get follow info if countsInfo is defined
		if (this.props.countsInfo)
		{
			this.getUserIsFollowing() ;
		}
	}
		

	getUserIsFollowing = () => {

		var self = this ;

		Axios.get("/userIsFollowing" , {
			'params' : {
				'userId' : this.props.user_id ,
			} ,
		}).then(function (response) {
			self.setState({
				'isFollowing' : response.data
			})
		}).catch(function (error) {
			console.log(error) ;
		}) ;

	}


	toggleFollow = () => {

		// set follow  button on loading state and after ajax request chnage back to normal
		this.setState({
			'followBtnLoading' : true ,
		})

		if (this.state.isFollowing) // unfollow user
		{

			var self = this ;

			Axios.get("/unFollow" , {
				'params' : {
					'userId' : this.props.user_id ,
				} ,
			}).then(function (response) {
				if (response.data == 1)
				{
					self.setState({
						'isFollowing' : 0 
					})
				}
			}).catch(function (error) {
				console.log(error) ;
			}).finally(function () {
				self.setState({
					'followBtnLoading' : false ,
				})
			}) ;

		}
		else // add follow
		{
			var self = this ;

			Axios.get("/follow" , {
				'params' : {
					'userId' : this.props.user_id ,
				} ,
			}).then(function (response) {
				if (response.data == 1)
				{
					self.setState({
						'isFollowing' : 1 
					})
				}
			}).catch(function (error) {
				console.log(error) ;
			}).finally(function () {
				self.setState({
					'followBtnLoading' : false ,
				})
			}) ;
		}

	}

	
	showFollowBtn = () => {

		if (this.state.isFollowing)
		{
			return("UnFollow") ;
		}
		else
		{
			return("Follow") ;
		}

	}


	renderInfo = () => {

		if (this.props.countsInfo)
		{
			return (
				<Container >
					<Menu.Item>
						<span style={{ 'fontSize' : '14px' }}>tweets<Label style={{ 'marginLeft' : '7px' }}>{this.props.countsInfo.twts}</Label></span>
					</Menu.Item>
					<Menu.Item>
						<span style={{ 'fontSize' : '14px' }}>followings<Label style={{ 'marginLeft' : '7px' }}>{this.props.countsInfo.followings}</Label></span>
					</Menu.Item>
					<Menu.Item>
						<span style={{ 'fontSize' : '14px' }}>followers<Label style={{ 'marginLeft' : '7px' }}>{this.props.countsInfo.followers}</Label></span>
					</Menu.Item>
					<Menu.Item>
						<span style={{ 'fontSize' : '14px' }}>likes<Label style={{ 'marginLeft' : '7px' }}>{this.props.countsInfo.likes}</Label></span>
					</Menu.Item>
					<Menu.Item>
						<span style={{ 'fontSize' : '14px' }}>liked<Label style={{ 'marginLeft' : '7px' }}>{this.props.countsInfo.liked}</Label></span>
					</Menu.Item>
					<Menu.Menu position='right' >
						<Menu.Item>
							<Button loading={this.state.followBtnLoading} onClick={this.toggleFollow} color='blue' >{this.showFollowBtn()}</Button>
						</Menu.Item>
					</Menu.Menu>
				</Container>
			)
		}
	}


	render ()
	{

		return (
			<Menu pointing style={{ 'marginTop' : '0px' }} >
			{this.renderInfo()}
			</Menu>
		)
	}
}
