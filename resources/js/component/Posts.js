import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Loader , Dimmer ,Icon ,Menu , Container , Grid , Accordion , Button , Form , TextArea , Segment} from 'semantic-ui-react' ;
import Axios from 'axios' ;

import Post from './Post.js' ;


export default class Posts extends Component {

	renderPost = (item) => {
		return (
			<Post key={item.id} userImg={this.props.userImg} item={item} />
		)
	}

	showBtn = () => {

		if (this.props.showBtn)
		{
			return (
				<Button loading={this.props.isLoading} fluid onClick={this.props.loadMore} >Load</Button>
			)
		}
		
	}


	render() {
		return (
			<Container>
				{this.props.itemsData.map(this.renderPost)} 
				{this.showBtn()}
			</Container>
		)
	}
}

