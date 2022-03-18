import React, { useState } from "react";
import "./book.css";
import firebase from "../firebase/fire";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
var db=firebase.firestore();




function BooksReturn() {
    const navigate = useNavigate(); 
    let [username,setUsername]= useState();
    var formUsername=username;
    const [bookreturn,setReturn]=React.useState([]);
    React.useEffect(()=>
    {	
        
                

        const fetchdata= async()=>{
            const check=await db.collection('bookengaged').get()
            setReturn(check.docs.map(doc=>doc.data()))
        }
        fetchdata()
    },[])
    const store = (e) => {
        e.preventDefault();
        
        bookreturn.forEach((value)=>{
            
            if(value["username"]===formUsername)
            {
                db.collection('bookreturned').doc(value["bookone"]).set({callnumber:value["bookone"]},{merge:true})
                .then(()=>{
                    alert("submitted")
                    db.collection('bookreturned').doc(value["booktwo"]).set({callnumber:value["booktwo"]},{merge:true})
                    db.collection('bookreturned').doc(value["bookthree"]).set({callnumber:value["bookthree"]},{merge:true})
                    db.collection('bookreturned').doc(value["bookfour"]).set({callnumber:value["bookfour"]},{merge:true})
                    navigate("../book", { replace: true })
                    db.collection('bookengaged').doc(formUsername).delete()
                  
                })
                .catch((error)=>{
                  alert("try again");
                })
            }
        })
    }
    
    
            
    
   
      
   
  
  
  return (
    <React.Fragment>
              <button><Link to="/">Logout</Link></button>
              <form onSubmit={(e) => store(e)}>
                    <label htmlFor="username" ><div class="banknew"><b>USERNAME</b></div></label>

                    <input type="text" class="bankusername-but" value={username} onChange={(e) => setUsername(e.target.value)} id="bankusername" required></input>
                    <input type="submit" class="sb1" value="Submit"></input>
              </form>
              
    </React.Fragment>
  );
}




export default BooksReturn;
