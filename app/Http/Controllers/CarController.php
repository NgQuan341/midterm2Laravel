<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\cars;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    public function index()
    {
        $data = cars::all();
        return $data;
    }
    public function search(Request $request){
        $data = cars::search($request->search)->get();
        return $data;
    }
    
    public function create()
    {
        //
    }

  
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),
        [
            "name"  => "required",
            "model" => "required",
            "mf_id"  => "required",
            'img'=>'required',
            'img'=>'mimes:jpeg,jpg,png,gif|max:10000',
        ],[
            'img'=>"The image field is required.",            
        ]);

        if ($validation->fails()){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray()); 
            return response()->json($response);
        }

        
        $name_img='';
        if($request->hasfile('img')){
            $file = $request->file('img');
            $name_img=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('images'); //project\public\images, public_path(): trả về đường dẫn tới thư mục public
            $file->move($destinationPath, $name_img); //lưu hình ảnh vào thư mục public\images
        }

        // $base64String=$request->img;
        $data = new cars();
        $data -> name = $request->name;
        $data -> model =  $request-> model;   
        // $data -> img = $this->saveImgBase64($base64String, 'images');
        $data ->img = $name_img;
        $data -> mf_id = $request -> mf_id;
        $data ->save();  
        return response()->json([
            'status' => 'success',
            'message' => 'create!',
        ]);   
        

     
    }

   
    public function show($id)
    {
        $data= cars::find($id);
        return $data;
    }

    public function getmanu($id)
    {
        $data= cars::find($id);
        return $data->manufacture->name;
    }

    public function edit($id)
    {
        //
    }

    
    public function update(Request $request, $id)
    {
        $data = cars::find($id);
        $name_img='';
        $validation='';
        if(!$request->hasfile('img')){
            $validation = Validator::make($request->all(),
            [
                "name"  => "required",
                "model" => "required",
                "mf_id"  => "required"
            ]);
            $name_img=$data->img;
        }
        else{
            $validation = Validator::make($request->all(),
            [
                "name"  => "required",
                "model" => "required",
                "mf_id"  => "required",
                'img'=>'mimes:jpeg,jpg,png,gif|max:10000',
            ]);
        }
       

        if ($validation->fails()){
            $response=array('status'=>'error','errors'=>$validation->errors()->toArray()); 
            return response()->json($response);
        }
        if($request->hasfile('img')){
            $file = $request->file('img');
            $name_img=time().'_'.$file->getClientOriginalName();
            $destinationPath=public_path('images'); //project\public\images, public_path(): trả về đường dẫn tới thư mục public
            $file->move($destinationPath, $name_img); //lưu hình ảnh vào thư mục public\images
        }

        
        // $base64String=$request->img;
        
        $data -> name = $request->name;
        $data -> model =  $request-> model;   
        // $data -> img = $this->saveImgBase64($base64String, 'images');
        $data ->img = $name_img;
        $data -> mf_id = $request -> mf_id;
        $data ->save();  
        return response()->json([
            'status' => 'success',
            'message' => "updated",
        ]);   
    }

    protected function saveImgBase64($param, $folder)
{
    list($extension, $content) = explode(';', $param);
    $tmpExtension = explode('/', $extension);
    preg_match('/.([0-9]+) /', microtime(), $m);
    $fileName = sprintf('img%s%s.%s', date('YmdHis'), $m[1], $tmpExtension[1]);
    $content = explode(',', $content)[1];
    $storage = Storage::disk('public');

    $checkDirectory = $storage->exists($folder);

    if (!$checkDirectory) {
        $storage->makeDirectory($folder);
    }

    $storage->put($folder . '/' . $fileName, base64_decode($content), 'public');

    return $fileName;
}

    public function destroy($id)
    {
        $data = cars::find($id);
        $data->delete();
        return response()->json([
            'message' => 'Deleted!',
        ]);   
    }
}
