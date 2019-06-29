@extends('main/layout')


@section('content')


	@isset($is_following)
		@if($is_following)
			<form method="POST" action="/follow/unFollow" >
				@csrf
				<input type="hidden" name="username" value="{{$username}}" >
				<button>unfollow</button>
			</form>
		@else
			<form method="POST" action="/follow/follow" >
				@csrf	
				<input type="hidden" name="username" value="{{$username}}" >
				<button>follow</button>
			</form>
		@endif
	@endisset

	@if (isset($posts))
		@foreach ($posts as $post)
			<div>
				<a href="/u/{{$username}} ">{{$username}}</a>
				<p>{{$post->content}}</p>
				<a href="/post/{{$post->id}}" >continue</a>
			</div>
			_____________________________________
			
		@endforeach
		{{ $posts->links() }}
	@endif



	@if (isset($msg))
		<div>
		{{ $msg }}
		</div>
	@endif
@endsection



