import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios' ;


import Posts from './component/Posts.js' ;


class App extends Component {
  render () {
	return (
		<Grid>
			<Grid.Column width={4} >
				left
			</Grid.Column>
		
			<Grid.Column width={8} >
				<Posts />
			</Grid.Column>

			<Grid.Column width={4} >
				right
			</Grid.Column>
		</Grid>
	)
  }
}






ReactDOM.render(<App />, document.getElementById('root'))
