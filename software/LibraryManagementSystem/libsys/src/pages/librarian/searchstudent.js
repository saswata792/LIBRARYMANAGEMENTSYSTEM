import React,{ useState} from 'react';
import {Link} from "react-router-dom";
import firebase from '../firebase/fire';
function Search(){
    let [usrnm,setUsername]= useState();
    let db=firebase.firestore()
    const [details,setdetails]=React.useState([]);
    let content_final=''
    React.useEffect(()=>
      {	
         
               
 
         const fetchdata= async()=>{
           const check=await db.collection('userdetails').get()
           setdetails(check.docs.map(doc=>doc.data()))
         }
        fetchdata()
      },[])
    const store = (e) => {
    
        e.preventDefault();
        var formUsername=usrnm;
        details.map((val)=>(
            (val["username"]===formUsername)?
            `<div class="details">
                
                <p>${val["username"]}</p>
                <p>${val["email"]}</p>
                <p>${val["department"]}</p>
            
            </div>`:''
        )).forEach((content)=>{content_final+=content})
        //console.log(content_final)
        if(content_final==='')
            content_final=`<h1>No User Found</h1>`
        document.getElementById("one").innerHTML=content_final
        

    } 
    return(
        <React.Fragment>
            <button><Link to="/">Logout</Link></button>
        <form onSubmit={(e) => store(e)}>
            <label htmlFor="usrnm" ><div class="snew"><b>USERNAME</b></div></label>
            <input type="text" class="susername-but" value={usrnm} onChange={(e) => setUsername(e.target.value)} id="susername" required></input>
            <input type="submit" class="sb1" value="Submit"></input>
        </form>
        <div id="one"></div>
     
            
        </React.Fragment>
    );
}
export default Search;