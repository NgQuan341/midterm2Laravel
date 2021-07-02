<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class Login extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            "email"  => "required|email",
        ],[
                       
        ]);
        $error_password = array(
            "password"=>'',
        );
        $count=false;
        if($request->password == null || $request->password == ''){
            $error_password['password']="password field is required"; 
            $count=true;    
          }
        if ($validation->fails()|| $count){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray(),'password'=>$error_password); 
            return response()->json($response);
        }
        $email=$request->email;
        $password=$request->password;
        if(Auth::attempt(['email' => $email, 'password' => $password])){
            return response()->json([
                'status' => 'success',
                'message' => 'login!',
            ]);   
        }
        else{
            $find = DB::table('users')->where('email', $request->email)->value('id');
            $email="";
            if($find==null){
                $email="email not found";
            }
            $error=array("status"=>'error','errors'=>array("email"=>$email),"password"=>array("password"=>"password was wrong"));
            return response()->json($error);  
        }
    }
    public function logout(){
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'logout',
        ]); 
    }
    
    public function show($id)
    {
        //
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
