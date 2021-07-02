<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class manufacture extends Model
{
    use HasFactory;
    protected $table="manufacture";
    public function cars(){
        return $this->hasMany('App\Models\cars','mf_id','id');
    }
}
