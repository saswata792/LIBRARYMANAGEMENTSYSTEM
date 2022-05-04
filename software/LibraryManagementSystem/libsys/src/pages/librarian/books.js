import React, { useState } from "react";
import "./book.css";
import firebase from "../firebase/fire";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
var db=firebase.firestore();




function Book() {
  const navigate = useNavigate(); 
  let [bookName,setBookName]=useState();
  let [author, setAuthor] = useState();
  let [callnum, setCallNumber] = useState();
  let [location, setLocation] = useState();
  const [book,setBook]=React.useState([]);
  React.useEffect(()=>
  {	
     
           

     const fetchdata= async()=>{
       const check=await db.collection('bookdetails').get()
       setBook(check.docs.map(doc=>doc.data()))
     }
    fetchdata()
  },[])
      const [bookreturn,setbookreturn]=React.useState([]);
      React.useEffect(()=>
      {	
        
              

        const fetchdata= async()=>{
          const check=await db.collection('bookengaged').get()
          setbookreturn(check.docs.map(doc=>doc.data()))
        }
        fetchdata()
      },[])
      
  
    
     
  const store = (e) => {
    e.preventDefault();
    var formBookName = bookName;
    var formAuthor = author;
    var formCallNumber = callnum;
    var formLocation = location;
    let named={
                
            bookname: formBookName,
            author:formAuthor,
            callnumber:formCallNumber,
            location:formLocation,
            
            
    }
    
    if(formCallNumber.includes("@"))
    {
        db.collection('bookdetails').doc(formCallNumber).set(named,{merge:true})
              .then(()=>{
                alert("Succesfully Registered")
                navigate("../book", { replace: true })
                
              })
              .catch((error)=>{
                alert("try again");
              })
            
    }
    else
        alert("call number should be deptyear@id")
            
    
   
      
   }
  function Showcollection(){
    
    document.getElementById("fillform").style.display="none"
    document.getElementById("book").style.display="block"
    let dummy_book=[]
    let dummy_engaged=[]
    let final_arr=[]  
      book.forEach((data)=>{dummy_book.push(data)})
      bookreturn.forEach((val)=>{dummy_engaged.push(val)})
     
      
      let result = dummy_book.filter(o1 => !dummy_engaged.some(o2 => o1.callnumber === o2.callnumber))
      result.forEach((data)=>{final_arr.push(data["callnumber"])})
      
    let collect_final=''
    
            book.map((val)=>(
            ((final_arr.includes(val["callnumber"]))&& val["callnumber"]!==undefined)?
            `   <div class="collection">
                      <p>BookName:${val["bookname"]}</p>
                      <p>Author:${val["author"]}</p>
                      <p>CallNumber:${val["callnumber"]}</p>
                      <p>Locationl:${val["location"]}</p>
                      
                </div>
                      
            `:''
            
            
        )).forEach((val)=>{collect_final+=val})
        if(collect_final==='')
        {
            
            collect_final=`<h1>No Books Available</h1>`
        }
            
        document.getElementById("book").innerHTML=collect_final
      
      
  }
  
  function Showform(){
    document.getElementById("fillform").style.display="block"
    document.getElementById("book").style.display="none"
  }
  
  return (
    <React.Fragment>
              <button onClick={Showcollection}>ShowCollection</button>
              <button onClick={Showform}>Show Fill up Form</button>
              <button><Link to="/bookbank">Show Book Bank</Link></button>
              <button><Link to="/ejournal">E-JOURNAL</Link></button>
              <button><Link to="/engagebooks">Engaged Books</Link></button>
              <button><Link to="/bookreturn">Returned Book</Link></button>
              <button><Link to="/">Logout</Link></button>
              <div id="book"></div>
              <div class="signup" id="fillform" style={{display:"none"}}>
                  <h1 class="sheader">LIBRARY MANAGEMENT SYSTEM</h1>
                  
                  <form onSubmit={(e) => store(e)}>

                    <label htmlFor="bookname" ><div class="bnew"><b>BOOK NAME</b></div></label>
                    <input type="text" class="bname-but" value={bookName} onChange={(e) => setBookName(e.target.value)} id="bname" required></input>

                    <label htmlFor="author" ><div class="bnew"><b>AUTHOR</b></div></label>
                    <input type="text" class="bauth-but" value={author} onChange={(e) => setAuthor(e.target.value)} id="bauthor" required></input>

                    <label htmlFor="callnum"><div class="bnew"><b>CALL NUMBER</b></div></label>
                    <input type="text" class="bcallnum-but" value={callnum} onChange={(e) => setCallNumber(e.target.value)} id="bcallnum" required></input>

                    <label htmlFor="location"><div class="bnew"><b>LOCATION</b></div></label>
                    <input type="text" class="blocation-but" value={location} onChange={(e) => setLocation(e.target.value)} id="blocation" required></input>
                    
                    <input type="submit" class="sb1" value="Submit"></input>
                  
                  </form>
              </div> 
    
    </React.Fragment>
  );
}




export default Book;
