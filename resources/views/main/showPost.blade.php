@extends('main/layout')

@section('content')

	@isset($post['content'])
		<div>
		{{ $post['content'] }}
		</div>
	@endisset
	___________________________________---

	@isset($comments)
		<div>
		@foreach($comments as $comment)
			<p>{{ $comment['content'] }}</p>
		@endforeach
		</div>
		<div>
		<div>
			{{$comments->links()}}
		</div>
	@endisset

	@if ($errors->any())
		<div>
			<ul>
				@foreach ($errors->all() as $error)
					<li>{{ $error }}
				@endforeach
			</ul>
		</div>
	@endif

	@isset($msg)
		<p>{{$msg}}</p>
	@endisset

	<form method="POST" action="/comment" >
		@csrf
		<input type="hidden" value='{{$post['id']}}' name='post_id' >
		@if (Auth::check())
			send as {{ Auth::user()->username }}
		@else
			<div>
				<input name="username" placeholder="username..." >
			</div>
			<div>
				<input name="email" placeholder="email...." >
			</div>
		@endif
		<div>
			<textarea name="content" rows="10" cols="5" ></textarea>
		</div>
		<button>Send</Button>
	</form>

@endsection
