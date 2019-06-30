import React, { Component } from 'react' ;
import ReactDOM from 'react-dom' ;
import {Grid ,Image ,Loader ,Icon , Segment ,Modal , Dimmer , Button} from 'semantic-ui-react' ;
import Axios from 'axios' ;

import Comments from './Comments.js' ;
import Login from './Login.js'
import ShowPost from './ShowPost' ;

export default class Post extends Component {



	state = {
		'likesCount' : 0 ,
		'commentsCount' : 0 ,
		'userDidLike' : 0 ,
		'loading' : false ,
		'showPostOpen' : false ,
		'openLogin' : false
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
			if (error.response)
			{
				if (error.response.status == 401) // not logged in 
				{
					self.setState({
						'openLogin' : true ,
					})
				}
			}

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


	closeLogin = () => {
		this.setState({
			'openLogin' : false
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

			<div style={{ 'marginBottom' : '20px' }}>

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
				  <Modal open={this.state.openLogin} onClose={this.closeLogin} >
					<Modal.Content>
						<Login />
					</Modal.Content>
				  </Modal>
			</div>
		)
	}
}


