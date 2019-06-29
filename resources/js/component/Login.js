import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css' ;

import {Segment , Form , Button} from 'semantic-ui-react' ;

export default class Login extends Component {

	render () {
		return (
			<Form>
				<Form.Field>
					<input placeholder="username" />
				</Form.Field>
				<Form.Field>
					<input placeholder="password" />
				</Form.Field>
				<Button type='submit' >Login</Button>
			</Form>
		)
	}

}
