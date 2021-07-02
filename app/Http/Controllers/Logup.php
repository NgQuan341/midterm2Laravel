<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class Logup extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            "name"  => "required",
            "address" => "required",
            "phone"  => "required",
            "email"  => "required|email",
        ],[
                       
        ]);
        $error_password = array(
            "password"=>'',
            "repassword"=>'',
        );
        $error_hasemail = array(
            "hasemail"=>""
        );
        $count=false;
        if($request->password == null || $request->password == ''){
          $error_password['password']="password field is required";  
           $count=true;
        }
        if($request->repassword == null || $request->repassword == ''){
            $error_password['repassword']= "repassword field is required";
            $count=true;
         }
        if($request->password!=$request->repassword){
            $error_password['repassword']="confirm password does not match";
            $count=true;
        }
        $find = DB::table('users')->where('email', $request->email)->value('id');
        if($find!=null){
            $error_hasemail['hasemail']="the email has been used";
            $count=true;
        }
        if ($validation->fails() || $count==true){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray(),'password'=>$error_password,"hasemail"=>$error_hasemail); 
            return response()->json($response);
        }
        
       
        $user = new User();
        $user ->name = $request->name;
        $user ->address = $request->address;
        $user ->phone = $request->phone;
        $user -> email = $request -> email;
        $user -> password = bcrypt($request -> password);
        $user -> save();
        return response()->json([
            'status' => 'success',
            'message' => 'logout',
        ]); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $error_password = array(
            "password"=>'',
            "repassword"=>'',
        );
        $count=false;
        if($request->password == null || $request->password == ''){
            $error_password['password']="password field is required";  
             $count=true;
          }
          if($request->repassword == null || $request->repassword == ''){
              $error_password['repassword']= "repassword field is required";
              $count=true;
           }
          if($request->password!=$request->repassword){
              $error_password['repassword']="confirm password does not match";
              $count=true;
          }
          if ( $count==true){
            $response=array('status'=>'error','password'=>$error_password); 
            return response()->json($response);
        }
            $user = User::find($request->id);
            $user -> password = bcrypt($request->password);
            $user ->save();
            return response()->json([
                'status' => 'success',
                'message' => 'update complete',
            ]); 

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
