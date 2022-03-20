import React, { useState } from "react";
import "./book.css";
import firebase from "../firebase/fire";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
var db=firebase.firestore();




function BookBank() {
  const navigate = useNavigate(); 
  let [username,setUsername]= useState();
  let [callnumberone, setCallNumberOne] = useState();
  let [callnumbertwo, setCallNumberTwo] = useState();
  let [callnumberthree, setCallNumberThree] = useState();
  let [callnumberfour, setCallNumberFour] = useState();
  var formUsername=username;
  var formCallNumberOne=callnumberone;
  var formCallNumberTwo=callnumbertwo;
  var formCallNumberThree=callnumberthree;
  var formCallNumberFour=callnumberfour;
 // const [spells,setSpells]=React.useState([])
 // const [newSpellName,setNewSpellName]=React.useState()
    const [bank,setBank]=React.useState([]);
    React.useEffect(()=>
    {	
        
                

        const fetchdata= async()=>{
            const check=await db.collection('bookengaged').get()
            setBank(check.docs.map(doc=>doc.data()))
        }
        fetchdata()
    },[])
    
  
  const store = (e) => {
    e.preventDefault();
    
    
    
    
        db.collection('bookengaged').doc(formCallNumberOne).set({username:formUsername,callnumber:formCallNumberOne},{merge:true})
              .then(()=>{
                    db.collection('bookengaged').doc(formCallNumberTwo).set({username:formUsername,callnumber:formCallNumberTwo},{merge:true})
                    db.collection('bookengaged').doc(formCallNumberThree).set({username:formUsername,callnumber:formCallNumberThree},{merge:true})
                    db.collection('bookengaged').doc(formCallNumberFour).set({username:formUsername,callnumber:formCallNumberFour},{merge:true})
                    alert("Succesfully Registered")
                    
                    navigate("../book", { replace: true })
                
              })
            //   .catch((error)=>{
            //     alert("try again");
            //   })
            
    
            
    
   
      
   }
  
  
  return (
    <React.Fragment>
              <button><Link to="/">Logout</Link></button>
              <div id="book"></div>
              <div class="signup" id="fillform">
                  <h1 class="sheader">LIBRARY MANAGEMENT SYSTEM</h1>
                  
                  <form onSubmit={(e) => store(e)}>

                    <label htmlFor="username" ><div class="banknew"><b>USERNAME</b></div></label>
                    <input type="text" class="bankusername-but" value={username} onChange={(e) => setUsername(e.target.value)} id="bankusername" required></input>

                    <label htmlFor="callNumber-one" ><div class="banknew"><b>CALL NUMBER-ONE</b></div></label>
                    <input type="text" class="bcallnumber-but" value={callnumberone} onChange={(e) => setCallNumberOne(e.target.value)} id="bankcallnumber" required></input>
                    
                    <label htmlFor="callNumber-one" ><div class="banknew"><b>CALL NUMBER-TWO</b></div></label>
                    <input type="text" class="bcallnumber-but" value={callnumbertwo} onChange={(e) => setCallNumberTwo(e.target.value)} id="bankcallnumber" required></input>

                    <label htmlFor="callNumber-one" ><div class="banknew"><b>CALL NUMBER-THREE</b></div></label>
                    <input type="text" class="bcallnumber-but" value={callnumberthree} onChange={(e) => setCallNumberThree(e.target.value)} id="bankcallnumber" required></input>
                    
                    <label htmlFor="callNumber-one" ><div class="banknew"><b>CALL NUMBER-FOUR</b></div></label>
                    <input type="text" class="bcallnumber-but" value={callnumberfour} onChange={(e) => setCallNumberFour(e.target.value)} id="bankcallnumber" required></input>

                   
                    <input type="submit" class="sb1" value="Submit"></input>
                  
                  </form>
              </div> 
    
    </React.Fragment>
  );
}




export default BookBank;
