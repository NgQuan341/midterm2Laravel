<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SendMail extends Controller
{
   
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $pin = mt_rand(1000000, 9999999);
        $password = Str::random(6);
        
        $find = DB::table('users')->where('email', $request->email)->value('id');
        if($find == null){
            return $message = [
                'status' => "fail",
                'error' => "your email was wrong"
             ];
        }
        else{
           
            $message = [
                'status' => "success",
                'pin' => $pin,
                'password'=>$password,
                'id'=>$find,
                'email'=>$request->email
             ];
             SendEmail::dispatch($message, $request->email)->delay(now()->addMinute(1));
             return $message;
        }
       
        
    }

  
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
