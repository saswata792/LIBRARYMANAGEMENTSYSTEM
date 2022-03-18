import React from "react";
import {Link} from "react-router-dom";
import './profile.css';
import checkProfile from "../profile/checkProfile.js";
import firebase from "../firebase/fire";
function LibProfile()
{   
    function passchang()
    {
        
        
        document.getElementById("passchange").style.display="block";
       
    }
    function passchange()
    {
        document.getElementById("save").style.display="block";
    }
    function passchanged()
    {
        const prpass=document.getElementById('password-two').value;
        const nwpass=document.getElementById('nwpassword-two').value;
        var db=firebase.firestore()
        
        if(checkProfile.getProfile().password===prpass)
        {
            
                    db.collection('userdetails').doc(checkProfile.getProfile().username).set({password:nwpass},{merge:true}).then(()=>{
                        alert("password updated")
                        document.getElementById("passchange").style.display="none"
                    })
             
        }
        else
            alert("you have pressed wrong password");
        
    }
    
    
    return(
    <React.Fragment>
                    <button><Link to="/">Logout</Link></button>
<div class="head100">
            <h1>STUDENT PROFILE</h1>
            </div> 


            

            <div id="profilestudent">
                <div class="lib"><label htmlFor="username"><b>USERNAME</b></label></div>
                <div class="lib" >{checkProfile.getProfile().username}</div>
                <div class="lib"> <label htmlFor="email"><b>EMAIL</b></label></div>
                <div class="lib" >{checkProfile.getProfile().email}</div> 
                

            </div>

            <button id="change" onClick={passchang}><b>CHANGE PASSWORD</b></button>
            <br></br>
            <div id="passchange" style={{display:"none"}}>
                    <div class="c1">
                        <label htmlFor="password-two"><div class="t100"><b>PREVIOUS PASSWORD</b></div></label>
                        <input id="password-two" class="password-two" onChange={passchange}></input>
                    </div>
                    <div class="c2">
                        <label htmlFor="nwpassword-two"><div class="t100"><b>NEW PASSWORD</b></div></label>
                        <input id="nwpassword-two" class="nwpassword-two" onChange={passchange}></input>
                    </div>
                    <div class="c3">
                        <button id="save" style={{display:"none"}} onClick={passchanged}><b>SAVE</b></button>
                    </div>
          
            </div>
    </React.Fragment>
   
    );
}
export default LibProfile;