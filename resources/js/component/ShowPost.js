import React, { Component } from 'react' ;
import ReactDOM from 'react-dom' ;
import {Grid ,Image ,Loader ,Icon , Segment ,Modal , Dimmer , Button} from 'semantic-ui-react' ;
import Axios from 'axios' ;



export default class ShowPost extends Component {

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

			console.log(response.data)
			self.setState({
				'commentsData' : response.data.data ,
				'commentsRaw' : response.data ,
			})

		}).catch(function (error) {
			console.log(error.response) ;
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
			console.log(this.props.item.id)
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
