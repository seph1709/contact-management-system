<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;


Route::post('register',function(Request $request){
    $fields = $request->validate([
        'name' => 'required|max:25',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed'
    ]);

    $user = User::create($fields);

    $token = $user->createToken($request->name);

    return [
        'user' => $user,
        'token' => $token->plainTextToken
    ];
});



Route::post('login',function(Request $request){
    $request->validate([
        'email' => 'required|email|exists:users',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return [
            'errors' => [
                'email' => ['The provided credentials are incorrect.']
            ]
        ];

    }

    $token = $user->createToken($user->name);
    $staringData = DB::table('contacts')->where('user_id', '=', $user->id)->get();
    return [
        'user' => $user,
        'token' => $token->plainTextToken,
        'startingData'=> $staringData
    ];
});

Route::post('logout',function(Request $request){

    $user_id =  $request->input('userID');
    $access_token =  $request->user()->tokens()->where('tokenable_id', $user_id);
    $access_token->delete();
    return [
        'message' => 'You are logged out.' 
    ];

})->middleware('auth:sanctum');


Route::post('add',function(Request $request){
    $request->validate(['name'=>['required'],
    'lastname'=>['required'],'address'=>['required'],
    'number'=>['required'],'email'=>['required'],
    'relationship'=>['required']]);

    $user_id =  $request->input('userID');
    $name =  $request->input('name');
    $lastname =  $request->input('lastname');
    $address =  $request->input('address');
    $number =  $request->input('number');
    $email =  $request->input('email');
    $relationship =  $request->input('relationship');

  $request->user()->contact()->create(['user_id'=>$user_id,
  'name'=>$name,
  'lastname'=>$lastname,
  'address'=>$address,
  'number'=>$number,
  'email'=>$email,
  'relationship'=>$relationship]);

})->middleware('auth:sanctum');

Route::post('update',function(Request $request){
    $data =  $request->validate(['name'=>['required'],
    'lastname'=>['required'],'address'=>['required'],
    'number'=>['required'],'email'=>['required'],
    'relationship'=>['required']]);

    $id_item =  $request->input('id');
    $contact= $request->user()->contact()->find($id_item);
    $contact->update($data);

})->middleware('auth:sanctum');


Route::delete('delete',function(Request $request){
    $request->validate(['id'=>['required']]);
    $id_item =  $request->input('id');
    $contact= $request->user()->contact()->find($id_item);
    $contact->delete();
})->middleware('auth:sanctum');


Route::post('userdata',function(Request $request){
    $request->validate(['userID'=>['required']]);
    $userID = $request->input('userID'); 
    $startingData =  $request->user()->contact()->where('user_id', '=', $userID)->get();
    return   $startingData;
})->middleware('auth:sanctum');