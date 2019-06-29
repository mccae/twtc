import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Icon ,Menu , Container , Grid , Accordion , Button , Form , TextArea} from 'semantic-ui-react' ;
import 'semantic-ui-css/semantic.min.css' ;
import Axios from 'axios' ;

class App extends Component {
  render () {
	return (
		<div>
			<HeaderMenu />
			<Content />
		</div>
	)
  }
}



class HeaderMenu extends Component {

	render() {
		return (
			<div>
				<Menu>
					<Menu.Item
						onClick={this.clickHome}
					>
						Home
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}


class Content extends Component {

	state = { 
		activeItem : 'posts' ,  // setting ,
		menu_content : 'posts' ,
	}

	hClick = (e , {name}) => {
		this.setState({
			activeItem: name ,
			menu_content: name ,
		}) ;
	}


	addContent = () => {
		
		if (this.state.menu_content === 'posts')
		{
			return <Posts /> ;
		}
		else if (this.state.menu_content === 'setting')
		{
			return <Setting /> ;
		}
		else if (this.state.menu_content === 'addNew')
		{
			return <AddNew /> ;
		}
	}
	

	render()
	{
		return (

			<div style={{'padding' : '20px'}}>
				<Grid>
					<Grid.Column width={3}>
						<Menu pointing vertical fluid>
							<Menu.Item name='posts' active={this.state.activeItem === 'posts'} onClick={this.hClick} >Posts</Menu.Item>
							<Menu.Item name='addNew' active={this.state.activeItem === 'addNew'} onClick={this.hClick} >Add New Post</Menu.Item>
							<Menu.Item name='setting' active={this.state.activeItem === 'setting'} onClick={this.hClick} >Settings</Menu.Item>
						</Menu>
					</Grid.Column>

					<Grid.Column width={13} >
						{this.addContent()}
					</Grid.Column>

				</Grid>
			</div>
		)
	}
}


class Posts extends Component {

	state = {
		'activeIndex': 0 ,
		'postsData': [] , // only the array list of posts 
		'posts' : {} , // get complete data for pagination
		'order': 'latest' ,
		'page' : 1 ,
	}

	componentDidMount = () => {
		this.getPostsFromServer() ;
	}
	

	getPostsFromServer = () => {

		var self = this ;

		Axios.get("http://localhost:8000/post" , {
			'params' : {
				'page' : self.state.page
			}
		}).then(function (response) {
			self.setState({
				postsData: response.data.data ,
				posts: response.data ,
			}).catch(function (error) {
				console.log('error') ;
			}) ;
		})
	}



	isNextDis = () => {
		if (this.state.page === this.state.posts.last_page)
		{
			return true ;
		}

		return false ;
	}


	isBackDis = () => {
		if (this.state.page === 1)
		{
			return true ;
		}

		return false ;
	}



	hClick = (e, title) => {
		let {index} = title ;
		let newIndex = this.state.activeIndex === index ? -1 : index ; // if the same index is clicked return -1 to minimize it
		this.setState({
			activeIndex : newIndex ,
		}); 
	}

	hNextPage = () => {
		this.setState({
			page: this.state.page + 1 ,
		}  , this.getPostsFromServer )
	}

	hPrePage = () => {
		this.setState({
			page: this.state.page - 1 ,
		}  , this.getPostsFromServer)
	}


	removePost = (id) => {

		self = this ;

		// send ajax request to remove post
		// return 1 if removed ok
		// return 0 if error
		Axios.get("http://localhost:8000/deletePost" , {
			params : {
				'post_id' : id ,
			}
		}).then(function (response) {
			if (response.data == 1)
			{
				// get posts from server again and rereder the page with new posts 
				self.getPostsFromServer() ;
				self.setState({
					'msg' : 'post deleted' , 
					'msgType' : 1 ,
				}) ;
			}
			else // error
			{
				self.setState({
					'msg' : 'error in deleting post' , 
					'msgType' : 0 ,
				})			
			}


		}).catch(function (error) {
			self.setState({
				'msg' : 'error in connecting to server' ,
				'msgType' : 0 ,
			})
			console.log(error) ;
		}) ;


	}


	showMsg = () => {

		if (this.state.msgType === 0)
		{
			return (
				<div style={{ 'color' : 'red' }}>
					{this.state.msg}
				</div>
			)
		}
		else if (this.state.msgType === 1)
		{
			return (
				<div style={{ 'color' : 'green' }} >
					{this.state.msg}
				</div>
			)
		}
		else if (this.state.msgType === 2)
		{
			return (
				<div>
					{this.state.msg}
				</div>
			)
		}
	}

	editPost = (id , content) => {
		
		self = this ;

		// send ajax request to edit post
		// return 1 if edit ok
		// return 0 if error
		Axios.get("http://localhost:8000/editPost" , {
			params : {
				'post_id' : id ,
				'content' : content ,
			}
		}).then(function (response) {
			if (response.data == 1)
			{
				// get posts from server again and rereder the page with new posts 
				self.setState({
					'msg' : 'post edited successfuly' , 
					'msgType' : 1 ,
					'activeIndex' : -1 ,
				}) ;
				self.getPostsFromServer() ;

			}
			else // error
			{
				self.setState({
					'msg' : 'error in editing post' , 
					'msgType' : 0 ,
				})			

			}


		}).catch(function (error) {
			self.setState({
				'msg' : 'error in connecting to server' ,
				'msgType' : 0 ,
			})
			console.log(error) ;
		}) ;


	}



	renderPost = (item) => {
		return (
			<div key={item.id} >
				<Accordion.Title active={this.state.activeIndex === item.id} index={item.id} onClick={this.hClick} >
					{item.content.substring(0 , 40)}
				</Accordion.Title>
				<Accordion.Content active={this.state.activeIndex === item.id} >
					<PostContent data={item} remove={this.removePost} edit={this.editPost} />
				</Accordion.Content>
			</div>
		)
	}

	render()
	{
		return (
			<div>
				{console.log(this.state.posts) }
				<div>{this.showMsg()}</div>
				<Accordion fluid styled>
					{this.state.postsData.map(this.renderPost)}
				</Accordion>
				<div style={{'marginTop' : '15px'}} >
					<Button onClick={this.hPrePage} disabled={this.isBackDis()} >Back</Button>
					<label >page {this.state.page} </label>
					<label>of total {this.state.posts.last_page} </label>
					<Button onClick={this.hNextPage} disabled={this.isNextDis()} >Next</Button>
				</div>
					
			</div>
		)
	}
}



class PostContent extends Component {


	state = {
		'editMode' : false ,
		'likeCount' : 0 ,
		'contentValue' : this.props.data.content ,
	}

	componentDidMount() {

		var self = this ;

		// send ajax request to get number of likes for this post
		Axios.get("http://localhost:8000/like/likeCount" , {
			params : {
				'post_id' : self.props.data.id ,
			}
		}).then(function (response) {
			self.setState({
				'likeCount' : response.data ,
			}) ;
		}).catch(function (error) {
			console.log('error in connecting to server') ;
		}) ;
	}

	
	

	changeToEditMode = () => {
		this.setState({
			'editMode' : true ,
		}) ;
	}

	changeToShowMode = () => {
		this.setState({
			'editMode' : false ,
		}) ;
	}

	renderPost = () => {

		if (this.state.editMode)
		{
			return(this.renderEditPost()) ;
		}
		else
		{
			return(this.renderShowPost()) ;
		}
	}

	chanageEditMode = () => {
		
		if (this.state.editMode) {
			this.setState({
				'editMode' : false ,
			})
		}
	}


	hRemove = () => {
		this.props.remove(this.props.data.id) ; 
	}

	hEdit = () => {
		this.props.edit(this.props.data.id , this.state.contentValue) ;
	}


	hContent = (e) => {
		this.setState({
			'contentValue' : e.target.value ,
		}) ;
	}



	renderShowPost = () => {
			
		return (
			<div>
				<div>
					<Button onClick={this.hRemove} size='mini' color='red' >Delete</Button>
					<Button onClick={this.changeToEditMode} size='mini' color='blue' >Edit</Button>
				</div>
				<div style={{'marginTop' : '15px'}} >
					{this.props.data.content}
				</div>
				<div style={{'marginTop' : '10px'}}>
					<Icon disabled name='like' />
					<span>{this.state.likeCount}</span>
				</div>
			</div>
		)	
	}

	renderEditPost = () => {

		return (
			<div>
				<div>
					<Button onClick={this.changeToShowMode} size='mini' >Cancel</Button>
				</div>
				<div style={{'marginTop' : '15px'}}>
					<Form>
						<Form.TextArea value={this.state.contentValue} onChange={this.hContent} />
						<Form.Button onClick={this.hEdit} color='blue' size='mini'  >Done</Form.Button>
					</Form>
				</div>
			</div>
		)
	}

	
	render()
	{
		return (
			<div>
				{ this.renderPost() }
			</div>
		)
	}
		
}


class AddNew extends Component 
{

	state = {
		'postToSend' : {} ,
		'contentValue' : "" ,
		'msg' : null ,
		'msgType' : 5 , // 0 for error , 1 success , 2 normal message
	}


	showMsg = () => {

		if (this.state.msgType === 0)
		{
			return (
				<div style={{ 'color' : 'red' }}>
					{this.state.msg}
				</div>
			)
		}
		else if (this.state.msgType === 1)
		{
			return (
				<div style={{ 'color' : 'green' }} >
					{this.state.msg}
				</div>
			)
		}
		else if (this.state.msgType === 2)
		{
			return (
				<div>
					{this.state.msg}
				</div>
			)
		}
	}

	hContent = (e) => {
		this.setState({
			'contentValue' : e.target.value ,
		}) ;
	}



	hSubmit = (e) => {

		// check if for minimum limit
		content = this.state.contentValue
		if (content.length >= 20 && content.length <= 300)
		{

			self = this ;

			Axios.get("http://localhost:8000/storePost" , {
				params : {
					'content' : self.state.contentValue ,
				}
			}).then(function (response) {
				if (response.data == 1) // post seccessfully saves
				{
					self.setState({
						'msgType' : 1 , // show success msg
						'msg' : 'new post added successfully'  ,
						'contentValue' : "" ,
					})
				}
				else if (reponse.data == 0)
				{
					// error in saving new post
					self.setState({
						'msgType' : 0 ,
						'msg' : 'error in saving new post' ,
					}) ;
				}
			}).catch(function (error) {
				//
			}) ;
		}
		else
		{
			this.setState({
				'msgType' : 0 ,
				'msg' : 'your post must be between 20 and 300 character' ,
			}) ;
		}



	}
	
	render()
	{

		return (
			<div>
				<div>
					{this.showMsg()}
				</div>
				<Form onSubmit={this.hSubmit} >
					<Form.Field control={TextArea} value={this.state.contentValue} onChange={this.hContent} placeholder='write for the world to see' />
					<Form.Field  control={Button} >Send</Form.Field>
				</Form>
			</div>
		)
	}
}


class Setting extends Component {

	render()
	{
		return (
			<div>
			 dsfssetting
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('root'))
