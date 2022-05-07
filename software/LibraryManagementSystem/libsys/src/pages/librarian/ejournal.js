import React, { useState } from "react";
import Chart from 'chart.js/auto';
import firebase from "../firebase/fire";
import {Link} from "react-router-dom";
var db=firebase.firestore();
function Ejournal()
{
    const [journal,setjournal]=React.useState([]);
    React.useEffect(()=>
    {	
     
           

        const fetchdata= async()=>{
        const check=await db.collection('ejournal').get()
        setjournal(check.docs.map(doc=>doc.data()))
    }
    fetchdata()
    },[])
    let names=[];
    let datas=[];
    journal.forEach((data)=>{
        console.log(data);
        names.push(data["name"]);
        datas.push(data["traffic"]);
    })

    function showBar()
    {
        document.getElementById("divbar").style.display="block";
        document.getElementById("divpie").style.display="none";
        document.getElementById("divline").style.display="none"; 
        let myChart=document.getElementById('myChartbar').getContext('2d');
        
        new Chart(myChart,{
            type:'bar',
            data:{
                    labels:names,
                    datasets:[{
                        label:'Traffic',
                        backgroundColor: 'blue',
                        data:datas
                        
                    }]
                },
            options:{}
        })
        
    }
    function showPie()
    {
        document.getElementById("divpie").style.display="block";
        document.getElementById("divbar").style.display="none";
        document.getElementById("divline").style.display="none"; 
        let myChart=document.getElementById('myChartpie').getContext('2d');
        
        new Chart(myChart,{
            type:'pie',
            
            data:{
                    labels:names,
                    datasets:[{
                        label:'Traffic',
                        backgroundColor: 'blue',
                        data:datas
                        
                    }]
                },
            options:{}
        })
        
    }
    function showLine()
    {
        document.getElementById("divline").style.display="block";
        document.getElementById("divpie").style.display="none";
        document.getElementById("divbar").style.display="none"; 
        let myChart=document.getElementById('myChartline').getContext('2d');
        
        new Chart(myChart,{
            type:'line',
            data:{
                    labels:names,
                    datasets:[{
                        label:'Traffic',
                        backgroundColor: 'blue',
                        data:datas
                        
                    }]
                },
            options:{}
        })
        
    }
    return (
        <React.Fragment>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/helpers.esm.min.js"></script>
            <button onClick={showBar}>Click to see bar chart</button>
            <button onClick={showLine}>Click to see line diagram</button>
            <button onClick={showPie}>Click to see pie chart</button>
            <button><Link to="/">Logout</Link></button>
            <div id="divbar" style={{display:"none",height:"200px",width:"500px"}}>
                <canvas id="myChartbar"></canvas>
            </div>
            <div id="divpie" style={{display:"none",height:"200px",width:"500px"}}>
                <canvas id="myChartpie"></canvas>
            </div>
            <div id="divline" style={{display:"none",height:"200px",width:"500px"}}>
                <canvas id="myChartline"></canvas>
            </div>
            
        </React.Fragment>
    )
    
}
export default Ejournal;