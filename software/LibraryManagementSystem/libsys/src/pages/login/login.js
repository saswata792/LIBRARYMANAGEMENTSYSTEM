import React,{ useState} from "react";
import { Link } from "react-router-dom";
import './login.css';
import { useNavigate } from "react-router-dom";
import firebase from "../firebase/fire";
import checkProfile from "../profile/checkProfile";
function Login() {
  
    const navigate = useNavigate();
    var [username,setUsernameLog]= useState(); 
    var [password, setPasswordLog] = useState();
    var db=firebase.firestore()
   // const [spells,setSpells]=React.useState([])
   // const [newSpellName,setNewSpellName]=React.useState()
   
   const [home,sethome]=React.useState([]);
   React.useEffect(()=>
     {	
        
              

        const fetchdata= async()=>{
          const check=await db.collection('userdetails').get()
          sethome(check.docs.map(doc=>doc.data()))
        }
       fetchdata()
     },[])
    
    const stored = (e) => {
      var formUsername=username;
      e.preventDefault();
      var formPassword = password;
      home.forEach((data)=>{
          
          if(formUsername.includes('F'))
          {
                
                if(data["username"]===formUsername)
                  if(data["password"]===formPassword)
                  {
                      navigate("../lib", { replace: true })
                      checkProfile.setProfile(data)

                  }
          }
          else
          {
              if(data["username"]===formUsername)
                if(data["password"]===formPassword)
                {
                    navigate("../stud", { replace: true })
                    checkProfile.setProfile(data)

                }
          }    

      })
      
    }
    
    return (
      <React.Fragment>
     
            <div class="image">
              <div class="login">
                    <h1 class="header">LIBRARY MANAGEMENT SYSTEM</h1>
                  
                    <form onSubmit={(e) => stored(e)}>
                      <label htmlFor="username" ><div class="new"><b>USERNAME</b></div></label>
                      <input type="text" class="username-but" value={username} onChange={(e) => setUsernameLog(e.target.value)} id="susername" required></input>
                      <label htmlFor="password" ><div class="new"><b>PASSWORD</b></div></label>
                      <input type="password" class="password-but" value={password} onChange={(e) => setPasswordLog(e.target.value)} id="spasword" required></input>
                      <button class="b1"><Link to="./signup">Signup</Link></button>
                      <input class="b2" type="submit" value="SignIn"></input>
                    </form>
                    
              </div> 
            </div>
      </React.Fragment>
    );
  
  
  
  

  
  
}

export default Login;
