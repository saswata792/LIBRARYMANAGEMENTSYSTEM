import React, { useState } from "react";
import "./book.css";
import firebase from "../firebase/fire";
//import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
var db=firebase.firestore();




function EngageBooks() {
    const [bookengage,setEngage]=React.useState([]);
    React.useEffect(()=>
    {	
        
                

        const fetchdata= async()=>{
            const check=await db.collection('bookengaged').get()
            setEngage(check.docs.map(doc=>doc.data()))
        }
        fetchdata()
    },[])
    
    let collect_final=''
            bookengage.map((val)=>(
            (val["username"]===undefined)?'':
            `   <div class="collection">
                      <p>Username : ${val["username"]}</p>
                      <p>Book: ${val["callnumber"]}</p>
                      
                </div>
                      
            `
            
            
        )).forEach((val)=>{collect_final+=val})
        if(collect_final==='')
        {
            collect_final=`<h1>No Books Engaged</h1>`
        }
            
        document.getElementById("book").innerHTML=collect_final
      
      
  
            
    
            
    
   
      
   
  
  
  return (
    <React.Fragment>
              <button><Link to="/">Logout</Link></button>
              <div id="book"></div>
    </React.Fragment>
  );
}




export default EngageBooks;
