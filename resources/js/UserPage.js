import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Grid , Container , Dimmer , Loader , Icon} from 'semantic-ui-react' ;
import Axios from 'axios' ;

import Headr from './component/Headr.js' ;
import Posts from './component/Posts.js' ;

class App extends Component {

	user_id = document.getElementById('userIdRequested').value ;

	state = {
		'user_id' : this.user_id ,
		'postsData' : [] ,
		'postsRaw' : [] ,
		'userImg' : "" ,
		'page' : 1 ,
		'loading' : false ,
		'firstRequestLoaded' : false ,

		// info like followersCount ... set deafult to 0
		'countsInfo' : {
			'twts' : 0 , 
			'followings' : 0 ,
			'followers' : 0 ,
			'likes' : 0 ,
			'liked' : 0 
		} ,
	}
	
	componentDidMount = () => {
		this.getPostsFromServer() ;
		// get string of profile image and change it in state
		this.getProfileImg() ;
		this.getNavInfo() ;

	}


	getNavInfo = () => {
		
		let self = this ;

		// check if the user liked the post and change state if did
		Axios.get("/getUsersCountsInfo" , {
			'params' : {
				'userId' : self.user_id
			} ,
		}).then(function (response) {
			self.setState({
				'countsInfo' : response.data ,
			})
		}).catch(function (error) {
			console.log(error) ;
		}) ;
	
	
		
	}



	getProfileImg = () => {
	
		let self = this ;

		// check if the user liked the post and change state if did
		Axios.get("/getProfileImg" , {
			'params' : {
				'userId' : self.user_id
			} ,
		}).then(function (response) {
			// set profile image in state
			self.setState({
				'userImg' : response.data ,
			})
		}).catch(function (error) {
			console.log(error) ;
		}) ;
	
	}



	// get posts from server and store the data in state
	getPostsFromServer = () => {

		var self = this ;

		console.log(this.state.page) ;

		this.setState({
			'loading' : true ,
		})

		Axios.get("/getUsersPosts" , {
			'params' : {
				'userId' : self.user_id ,
				'page' : self.state.page ,  // send page number
			}
		}).then(function (response) {
			self.setState({
				// appaent to the end of the existing array
				'postsData' : self.state.postsData.concat(response.data.data) ,
				'postsRaw' : response.data ,
				'loading' : false ,
			})
		}).catch(function (error) {
			this.setState({
				'loading' : false ,
			})
		}).finally(function () {
			self.setState({
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
						<Posts showBtn={this.showBtn()} isLoading={this.state.loading} loadMore={this.loadMore} userImg={this.state.userImg} itemsData={this.state.postsData} />
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



	// return true if the load more button should be rendered
	showBtn= () =>
	{
		// if the current page is the same as the last page mean load button show not be viewd so return false
		if (this.state.postsRaw.current_page == this.state.postsRaw.last_page) {
			return false ;
		}
		else
		{
			return true ;
		}
	}


	

  render () {

	return (
		<div>

			<Headr 
				countsInfo ={this.state.countsInfo}
				user_id = {this.user_id}
				infoNav
			/>

			<div
				style={{ 'background' : '#F7F7F7' , 'marginTop' : '10px' , 'minHeight' : '800px' }}
			> 

				<Container>
					<Grid>
						<Grid.Column width={3} >
							<UserInfo user_id={this.user_id} />
						</Grid.Column>
					
						<Grid.Column width={9} >
							{this.renderPosts()}
						</Grid.Column>

						<Grid.Column width={4} >
							right
						</Grid.Column>
					</Grid>
				</Container>
			</div>
		</div>
	)
  }
}


class UserInfo extends Component {

	render() {
		return (
			<div>
				<a href="#" style={{ 'fontWeight' : 'bold' , 'fontSize' : '24px' , 'color' : 'black' }} >@user</a>
				<div style={{ 'marginTop' : '25px' }}>
					<Icon disabled name='calendar times' />
					<span>2019 june</span>
				</div>
			</div>
		)
	}

}


ReactDOM.render(<App />, document.getElementById('root'))
