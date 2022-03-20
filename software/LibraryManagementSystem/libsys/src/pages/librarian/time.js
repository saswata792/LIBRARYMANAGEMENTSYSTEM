
function time(times){
    var times=times.split("T")
    var date=times[0].split("-")[2]
    var mm=times[0].split("-")[1]
    var yy=times[0].split("-")[0]
    var hour=times[1].split(":")[0]
    var min=times[1].split(":")[1]
    var sec=times[1].split(":")[2]
    hour=parseInt(hour)+5
    min=parseInt(min)+30
    sec=sec.split("Z")[0]
    if(parseInt(hour)>=24)
        
        if(parseInt(yy)%4===0)
        { 
            if(parseInt(date)===30 && parseInt(mm)===2)
            {
                date="01"
                mm="03"
            }
        }
        else
        {
            if(parseInt(mm)===2 && parseInt(date)===29)
            {
                date="01"
                mm="03"
            }
            if(parseInt(date)<30)
                date=parseInt(date)+1
            if(parseInt(date)===31 && ( parseInt(mm)===4 ||parseInt(mm)===6 ||parseInt(mm)===9 ||parseInt(mm)===11))
            {
                mm=parseInt(mm)+1
                date="01"
            }
            if(parseInt(date)===32 && (parseInt(mm)===1 || parseInt(mm)===3 ||parseInt(mm)===5 ||parseInt(mm)===7 ||parseInt(mm)===8||parseInt(mm)===10))
            {   mm=parseInt(mm)+10
                date="01"
            }
        }
    if(min>60)
    {
        hour=parseInt(hour)+1
        min=min%60
    }
    return( date+"-"+mm+"-"+yy+"t"+hour+":"+min+":"+sec)


}
export default time;