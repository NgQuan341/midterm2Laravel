<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cars extends Model
{
    use HasFactory;
    protected $table="cars";
    public function manufacture(){
        return $this->belongsTo('App\Models\manufacture','mf_id','id');
    }
}
