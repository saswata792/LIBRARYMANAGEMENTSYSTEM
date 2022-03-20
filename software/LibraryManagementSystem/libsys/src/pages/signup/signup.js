import React, { useState } from "react";
//import { Link } from "react-router-dom";
import './signup.css';
import firebase from "../firebase/fire";
import { useNavigate } from "react-router-dom";
import checkProfile from "../profile/checkProfile";

var db=firebase.firestore();




function Signup() {
  const navigate = useNavigate();
  let [usrnm,setUsername]= useState(); 
  
  let [name, setName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState()
  let [conpassword, setConPassword] = useState();
  let [department, setDepartment] = useState();
 // const [spells,setSpells]=React.useState([])
 // const [newSpellName,setNewSpellName]=React.useState()
  
  const store = (e) => {
    
    e.preventDefault();
    var formUsername=usrnm;
    var formName = name;
    
    var formEmail = email;
    var formPassword = password;
    var formConPassword=conpassword;
    var formDepartment=department;
    
    
    if(formPassword===formConPassword)
    {
          let named={
            username:formUsername,
            name: formName,
            
            password:formPassword,
            email:formEmail,
            department:formDepartment,
            
            
          }
          
         
                db.collection('userdetails').doc(formUsername).set(named,{merge:true})
                .then(()=>{
                  alert("Succesfully Registered")
                  navigate("../stud", { replace: true })
                  checkProfile.setProfile(named)
                })
                .catch((error)=>{
                  alert("try again");
                })      
          
          
          
            
    }
    else
      alert("Check your details please")
      
   }
  

  return (
    <React.Fragment>
   
  
              <div className="signup">
                  <h1 className="sheader">LIBRARY MANAGEMENT SYSTEM</h1>
                  
            <form onSubmit={(e) => store(e)}>
              <label htmlFor="usrnm" ><div className="snew"><b>USERNAME</b></div></label>
              <input type="text" className="susername-but" value={usrnm} onChange={(e) => setUsername(e.target.value)} id="susername" required></input>

              
              <label htmlFor="name" ><div className="snew"><b>NAME</b></div></label>
              <input type="text" className="sname-but" value={name} onChange={(e) => setName(e.target.value)} id="sname" required></input>

              <label htmlFor="email"><div className="snew"><b>EMAIL</b></div></label>
              <input type="email" className="semail-but" value={email} onChange={(e) => setEmail(e.target.value)} id="semail" required></input>

              <label htmlFor="password" ><div className="snew"><b>PASSWORD</b></div></label>
              <input type="password" className="spassword-but" value={password} onChange={(e) => setPassword(e.target.value)} id="spasword" required></input>

              <label htmlFor="password"><div className="snew"><b></b></div>CONFIRM PASSWORD</label>
              <input type="password" className="sconpassword-but" value={conpassword} onChange={(e) => setConPassword(e.target.value)} id="sconpassword" required></input>

              <label htmlFor="department"><div className="snew"><b></b></div>DEPARTMENT</label>
              <input type="text" className="sdepartment-but" value={department} onChange={(e) => setDepartment(e.target.value)} id="sdepartment" required></input>
              <input type="submit" className="sb1" value="Submit"></input>
            
            </form>
              </div> 
    
    </React.Fragment>
  );
}




export default Signup;

// React.useEffect(()=>{
//   const db=firebase.firestore()
//   return db.collection("spells").onSnapshot(snapshot=>{
//     const spellsData=[]
//     snapshot.forEach(doc=>spellsData.push({...doc.data(),id:doc.id}))
//     setSpells(spellsData)
//   })
//   return unsubscribe
// },[])