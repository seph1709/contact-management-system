<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return inertia("Home");
    }

    public function register()
    {
        //

        return inertia("Register");
    }

    public function login()
    {
        //

        return inertia("Login");
    }

    
    public function workplace(Request $request)
    {

        // if($request->user() === null){
        //     return inertia("Login");
        // }


        //
        // $rawToken = $request->input('rawToken'); //
        // //    dd($rawToken);

        // $userID = $request->input('userID');  

        // $userName = $request->input('userName');  

        // $staringData =     DB::table('contacts')->where('user_id', '=', $userID)->get();
        

        return inertia("Workplace");
    } 

    public function about(){
        return inertia("About");
    }
}
