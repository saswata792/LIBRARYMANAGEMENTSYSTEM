import React, { useState } from "react";

import firebase from "../firebase/fire";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import checkProfile from "../profile/checkProfile";
var db=firebase.firestore();




function Student() {
    
    const [bookengage,setEngage]=React.useState([]);
    React.useEffect(()=>
    {	
        
                

        const fetchdata= async()=>{
            const check=await db.collection('bookengaged').get()
            setEngage(check.docs.map(doc=>doc.data()))
        }
        fetchdata()
    },[])
    function studentpg()
    {
        
        let collect_final=''
        bookengage.map((value)=>(
                
                (value["username"]===checkProfile.getProfile().username)?
                `   <div class="engagedbook">
                          <p>Username : ${value["username"]}</p>
                          <p>BookOne : ${value["bookone"]}</p>
                          <p>BookTwo : ${value["booktwo"]}</p>
                          <p>BookThree : ${value["bookthree"]}</p>
                          <p>BookFour : ${value["bookfour"]}</p>
                    </div>
                          
                `:  ``
                
            )).forEach((value)=>{collect_final+=value})
            if(collect_final==='')
            {
                
                collect_final=`<h1>No Books Engaged on your Account</h1>`
            }
                
            document.getElementById("engaged").innerHTML=collect_final
          
          
    }
return (
    <React.Fragment>
               <button><Link to="/">Logout</Link></button>
               <button id="profile"><Link to="/studprof">Profile</Link></button>
               <button id="bookbank" onClick={studentpg}>BookBank</button>
               <div id="engaged"></div>
                
    </React.Fragment>
  );
}




export default Student;
