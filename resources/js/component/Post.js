import React, { Component } from 'react' ;
import ReactDOM from 'react-dom' ;
import {Grid ,Image ,Loader ,Icon , Segment ,Modal , Dimmer} from 'semantic-ui-react' ;
import Axios from 'axios' ;

import Comments from './Comments.js' ;

export default class Post extends Component {



	state = {
		'likesCount' : 0 ,
		'commentsCount' : 0 ,
		'userDidLike' : 0 ,
		'loading' : false ,
		'showPostOpen' : false ,
	}

	componentDidMount = () => {

		var self = this ;

		Axios.get("/getPostInfo" , {
			'params' : {
				'postsId' : self.props.item.id ,
			} ,
		}).then(function (response) {

			self.setState({
				'likesCount' : response.data.likesCount ,
				'commentsCount' : response.data.commentsCount ,
			})

		}).catch(function (error) {
			console.log(error) ;
		}) ;


		// check if the user liked the post and change state if did
		Axios.get("/userDidLike" , {
			'params' : {
				'postId' : self.props.item.id ,
			} ,
		}).then(function (response) {

			self.setState({
				'userDidLike' : response.data ,
			})

		}).catch(function (error) {
			console.log(error.status) ;
		}) ;


	}

	userDidLike = () => {

		if (this.state.userDidLike == 1)
		{
			return 'blue' ;
		}
		else
		{
			return 'grey' ;
		}
	}


	addLikeView = () => {
		
		this.setState({
			'likesCount' : this.state.likesCount + 1 ,
			'userDidLike' : 1
		}) ;
	}

	removeLikeView = () => {

		this.setState({
			'likesCount' : this.state.likesCount - 1 ,
			'userDidLike' : 0 ,
		}) ;
	}

	

	// to avoid additional ajax reqeust only one is send and view change based on retur
	// if 1 likes added
	// if 2 likes deleted
	// it remove bugs in showing if post is liked or not
	// but can be problem in likes count when used multiple tabs at the same time without reloading the page
	toggleLike = (e) => {

		e.stopPropagation();

		var self = this ;

		// show loading icon
		this.setState({
			'loading' : true ,
		})

		Axios.get("/toggleLike" , {
			'params' : {
				'postId' : self.props.item.id ,
			} ,
		}).then(function (response) {

			if (response.data == 1) // post liked
			{
				self.addLikeView() ;
			}
			else if (response.data == 2) // like removed
			{
				self.removeLikeView() ;
			}
			else  // error
			{

			}

		}).catch(function (error) {
			console.log(error) ;
		}).finally(function () {
			self.setState({
				'loading' : false ,
			}) ;
		}) ;

	}



	
	getProfileImg = () => {

		// return profile 
		// look for the userImg props if it doesnt exist look in items propery

		if (this.props.userImg)
		{
			return this.props.userImg ;
		}

		if (this.props.item.profile_img)
		{
			return this.props.item.profile_img ;
		}
	}


	// __________________ modal function
	
	showPost = () => {
		this.setState({
			'showPostOpen' : true 
		})
	}

	closeShowPost = () => {
		this.setState({
			'showPostOpen' : false 
		})
	}

	renderShowPost = () => {

		if (this.state.showPostOpen)
		{
			return (
				<ShowPost
					item_id={this.props.item_id}
					close={this.closeShowPost} 
					open={this.state.showPostOpen} 
					img={this.getProfileImg()}
					item={this.props.item}
					commentsCount={this.state.commentsCount}
					toggleLike={this.toggleLike}
					userDidLike={this.userDidLike}
					likesCount={this.state.likesCount}
					commentsCount={this.state.commentsCount}
				/>

			)
		}
	}




	render() {
		return (

			<div style={{ 'marginTop' : '20px' }}>

				<Segment onClick={this.showPost} >

					<div style={{ 'display' : 'inline-block' , 'width' : '30px' , 'verticalAlign' : 'top' , 'marginLeft' : '0px' , 'marginRight' : '10px' }}>
						<Image size='mini' src={"/" + this.getProfileImg()} circular />
					</div>

					<div style={{ 'display' : 'inline-block' , 'width' : 'calc(100% - 43px)' }} >
						<div >
							<a style={{ 'fontWeight' : 'bold' , 'fontSize' : '17px' }} href={"/u/" + this.props.item.name} >{this.props.item.name}</a>
						</div>
						<div>
							<p>{this.props.item.content}</p>
						</div>
						<div>
							<span>
								<Icon name='comments' color='grey' disabled />
								<span style={{ 'color' : 'grey' }} >{this.state.commentsCount}</span>
							</span>
							<span style={{ 'cursor' : 'pointer'  , 'marginLeft' : '25px'}} onClick={this.toggleLike} >
								<Icon color={this.userDidLike()} name='like' disabled /> 
								<span style={{ 'color' : 'grey' }} >{this.state.likesCount}</span>
							</span>
						</div>
					</div>

					<Loader size='mini' inline active={this.state.loading} />
				</Segment>
				{this.renderShowPost()}
			</div>
		)
	}
}


class ShowPost extends Component {

	viewer_is_logged_in = document.getElementById('viewer_is_logged_in').value ;

	state = {
		'commentsAreLoading' : true ,
		'commentsLoading' : true ,
		'commentsData' : [] ,
		'commentsRaw' : {} ,
	}


	componentDidMount = () => {
		this.loadComments() ;
	}
	
	loadComments = () => {
		
		self = this ;

		// check if the user liked the post and change state if did
		Axios.get("/getCommentsForPost" , {
			'params' : {
				'postId' : self.props.item.id ,
			} ,
		}).then(function (response) {

			self.setState({
				'commentsData' : response.data.data ,
				'commentsRaw' : response.data ,
				// 'commentsLoadig' : false ,
			})

		}).catch(function (error) {
			console.log(error.status) ;
		}).finally(function () {
			self.setState({
				'commentsLoading' : false ,
			})
		})
	}

	renderComments = (comment) => {

		return (
			<Segment vertical key={comment.id}>
				<a style={{'fontSize' : '15px'}} href={"/u/" + comment.name} >{comment.name}</a>
				<p>{comment.content}</p>
			</Segment>
		)
	}


	renderLoader =() => {
		return (
			<Dimmer inverted active >
				<Loader />
			</Dimmer>
		)
	}



	render() {
		return (
			<Modal open={this.props.open} onClose={this.props.close}>
				<Modal.Header>
					Delete Your Account
				</Modal.Header>
				<Modal.Content>
					<Segment basic>
						<div style={{ 'display' : 'inline-block' , 'width' : '30px' , 'verticalAlign' : 'top' , 'marginLeft' : '0px' , 'marginRight' : '10px' }}>
							<Image size='mini' src={"/" + this.props.img} circular />
						</div>

						<div style={{ 'display' : 'inline-block' , 'width' : 'calc(100% - 43px)' }} >
							<div >
								<a style={{ 'fontWeight' : 'bold' , 'fontSize' : '17px' }} href={"/u/" + this.props.item.name} >{this.props.item.name}</a>
							</div>
							<div>
								<p>{this.props.item.content}</p>
							</div>
							<div>
								<span>
									<Icon name='comments' color='grey' disabled />
									<span style={{ 'color' : 'grey' }} >{this.props.commentsCount}</span>
								</span>
								<span style={{ 'cursor' : 'pointer'  , 'marginLeft' : '25px'}} onClick={this.props.toggleLike} >
									<Icon color={this.props.userDidLike()} name='like' disabled /> 
									<span style={{ 'color' : 'grey' }} >{this.props.likesCount}</span>
								</span>
							</div>
						</div>
					</Segment>
					<Segment  basic style={{ 'marginTop' : '40px' , 'paddingLeft' : '70px' , 'paddingRight' : '70px'  }} >
						{this.state.commentsLoading ? 
							this.renderLoader()
							:
							this.state.commentsData.map(this.renderComments)
						}
					</Segment>
				</Modal.Content>
			</Modal>
		)
	}


}
