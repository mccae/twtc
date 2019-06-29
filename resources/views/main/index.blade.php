@extends('main/layout')

@section('content')

	@isset($logged)

		<div id='root' ></div>
	
		@if($logged)
			<script src="{{ asset('js/Index.js') }}" ></script>
		@else
			<script src="{{ asset('js/LoginReg.js') }}" ></script>
		@endif

	@endisset

@endsection
