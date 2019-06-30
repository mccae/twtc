<html>

	<head>
		<link href={{asset('Semantic/semantic.min.css')}} rel="stylesheet" >
	</head>

	<body>

		<input id="viewer_is_logged_in" value='{{Auth::check()}}' type='hidden'
		<div class="ui secondary menu" style="margin: 0px" >
		  <a href="/" class="active item">
			Home
		  </a>
		  <a href="/about"  class="item">
			About
		  </a>
		  <a href="/contact" class="item">
			Contact
		  </a>

		  <div class="right menu">
			<div class="item">
			  <div class="ui icon input">
				<input placeholder="Search..." type="text">
				<i class="search link icon"></i>
			  </div>
			</div>

			  <div class="item" >
				@if (Auth::user())
					<a href="profile" >{{Auth::user()['username']}}</a>
					<form action="/logout" method="post" >
						@csrf
						<button>logout</button>
					</form>
				@else
					<a href="/login" >login</a>
				@endif
			  </div>
		  </div>

		</div>

		@yield('content')

		<script src="{{asset('js/main/main.js')}}" ></script>
	</body>

</html>
