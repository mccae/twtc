import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import InfoNav from './InfoNav.js' ;


export default class Headr extends React.Component {

	render ()
	{

		return (
			<div>
				<img src='/images/header/default.jpg' style={{ 'height' : '350px' , 'width' : '100%'  }} ></img>
				<InfoNav user_id={this.props.user_id} countsInfo={this.props.countsInfo} />
			</div>
		)
	}
}
