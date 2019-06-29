import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css' ;
import {Container , Tab} from 'semantic-ui-react' ;

import Login from './component/Login.js' ;

export default class LoginReg extends Component {

	panes = [
		{ 'menuItem' : 'Login' , render: () => <Tab.Pane> <Login/> </Tab.Pane> } ,
		{ 'menuItem' : 'Register' , render: () => <Tab.Pane> content</Tab.Pane> }
	]

	render() {
		return (
			<Container>
				<Tab panes={this.panes} />
			</Container>

		)
	}
}


ReactDOM.render(<LoginReg />, document.getElementById('root'))
