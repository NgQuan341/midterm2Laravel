<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Laravel </title>
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <base href="{{asset('')}}">
</head>

<body>
   <div>
      <p>Your reset password: {{$data['pin']}}</p>
   </div>
</body>