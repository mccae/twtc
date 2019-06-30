import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Loader , Dimmer ,Icon ,Menu , Container , Grid , Accordion , Button , Form , TextArea , Segment} from 'semantic-ui-react' ;
import 'semantic-ui-css/semantic.min.css' ;
import Axios from 'axios' ;

import Headr from './component/Headr.js' ;
import Posts from './component/Posts.js' ;


class App extends Component {

	state = {
		'postsData' : [] ,
		'posts' : [] ,
		'userImg' : "" ,
		'page' : 1 ,
		'isLoading' : false ,
		'firstRequestLoaded' : false
	}



	// load when component first start 
	componentDidMount = () => {
		this.getPostsFromServer() ; // run function to get posts in server and rerender page
	}


	// get posts from server and store the data in state
	getPostsFromServer = () => {

		this.setState({
			'isLoading' : true ,
		}) 

		var self = this ;

		// check if the user liked the post and change state if did
		Axios.get("/getIndexPost" , {
			'params' : {
				'page' : self.state.page ,
			}
		}).then(function (response) {

			self.setState({
				postsData: self.state.postsData.concat(response.data.data) ,
				posts: response.data ,
			})

		}).catch(function (error) {
			console.log(error.status) ;
		}).finally(function () {
			self.setState({
				'isLoading' : false ,
				'firstRequestLoaded' : true ,
			})
		}) ;


	}


	
	// return loadMore button
	loadMore = () => {
		// change state without rerendering page
		this.state.page += 1 ;

		// load the new posts from server
		this.getPostsFromServer() ;
	}


	// return true if the load more button should be rendered
	showBtn= () =>
	{
		// if the current page is the same as the last page mean load button show not be viewd so return false
		if (this.state.posts.current_page == this.state.posts.last_page) {
			return false ;
		}
		else
		{
			return true ;
		}
	}


	// check if the posts should be rendered 
	// if the are no posts show a text or something
	renderPosts = () => {

		if (this.state.firstRequestLoaded)
		{
			if (this.state.postsData.length == 0)
			{
				return('no posts to show')
			}
			else
			{
				return (
					<Posts showBtn={this.showBtn()} isLoading={this.state.isLoading}  loadMore={this.loadMore} itemsData={this.state.postsData} />
				)
			}
		}
		else
		{
			return (
				<Loader style={{ 'marginTop' : '50px' }} size='large' active inline='centered' />
			)
		}

	}


		
	render () {
		return (
			<div>
				<Headr />
				<div style={{ 'marginTop' : '20px' }} >
					<Container>
						<Grid>
							<Grid.Column width={2} >
								left
							</Grid.Column>
						
							<Grid.Column width={10} >
								<div>
									{this.renderPosts()}
								</div>
							</Grid.Column>

							<Grid.Column width={2} >
								right
							</Grid.Column>
						</Grid>
					</Container>
				</div>
			</div>
		)
	}

}






ReactDOM.render(<App />, document.getElementById('root'))
