@extends('main/layout')


@section('content')

	

	@isset($logged)
		<input id="userIdRequested" type="hidden" value={{$user_id}} >
		<div id='root' ></div>
		<script src="{{ asset('js/UserPage.js') }}" ></script>
	@endisset

@endsection

