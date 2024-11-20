<?php

namespace App\Http\Controllers;
use App\Models\Contacts;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $startingData = Contacts::latest()->get();
        // by using inertia render the Home.jxs
        return inertia("Home",['startingData' => $startingData]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

      $data =  $request->validate(['name'=>['required'],
      'lastname'=>['required'],'address'=>['required'],
      'number'=>['required'],'email'=>['required'],
      'relationship'=>['required']]);

        Contacts::create($data);

        return redirect("/");
        
        // dd($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contacts $contacts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contacts $contacts)
    {
        //

        return redirect('/');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //

        $data =  $request->validate(['name'=>['required'],
        'lastname'=>['required'],'address'=>['required'],
        'number'=>['required'],'email'=>['required'],
        'relationship'=>['required']]);
          
        $contact = Contacts::find($id);
        $contact->update($data);

        return redirect('/');
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacts $id)
    {  
     
           $id->delete();
          
        //    dd($id);
           return redirect('/');
    }
}
