@extends('main/layout')


@section('content')

	<input id="userIdRequested" type="hidden" value={{$user_id}} >
	<div id='root' ></div>
	<script src="{{ asset('js/UserPage.js') }}" ></script>

@endsection

