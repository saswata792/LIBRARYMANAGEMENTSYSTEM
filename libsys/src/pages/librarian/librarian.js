import React from "react";
import firebase from "../firebase/fire"
import { Link } from "react-router-dom";
import "./librarian.css"
import time from "./time"
function Lib(){
  
  let db=firebase.firestore()
  const [details,setdetails]=React.useState([]);
    React.useEffect(()=>
      {	
         
               
 
         const fetchdata= async()=>{
           const check=await db.collection('userdetails').get()
           setdetails(check.docs.map(doc=>doc.data()))
         }
        fetchdata()
      },[])
  
  function attend(){
      
      let times=''
      let time_final=''
      let content_final=`
            <table  id="attnd_table"> 
            <tr> 
            <th><label for="cardid">Card ID</label></th>
            <th><label for="dat">Date</label></th>
            <th><label for="tim">Time</label></th>
            
            </tr>
            </table>`
      fetch("https://api.thingspeak.com/channels/1675826/feeds.json?results=2").then((response)=>{
        return response.json()
      }).then((data)=>{
        
        
        data["feeds"].map((val)=>(
            times=val["created_at"],
            time_final=time(times),
            time_final=time_final.split("t"),
             
            `<table className="table_one">
                
                <td>${val["field1"]}</td>
                <td>${time_final[0]}</td>
                <td>${time_final[1]}</td>
                
            </table>`
           // document.getElementById(val["field1"]).addEventListener("click",() =>{showdetails(val["field1"])})
            
            
           
        )).forEach((content)=>{content_final+=content})
        //console.log(content_final)
        document.getElementById("one").innerHTML=content_final
       })

     
  }
  //setTimeout(attend, 5000);
  

  
 
    return(
        <React.Fragment>
            <button id="attendance" style={{display:"none"}} onClick={attend()}>Click Here</button>
            <button><Link to="/libprofile">Profile</Link></button>
            <button><Link to="/book">Book</Link></button>
            <button><Link to="/">Logout</Link></button>
            <div id="two" >
              <div id="one" ></div>
            
            </div>
        </React.Fragment>
    )
}
export default Lib;

      
      
      
      
    