function update_clock(){
    let x = new Date();
    let day = x.getDay()
    if (day < 10) day = "0" + day
    let hour = x.getHours()
    if (hour < 10) hour = "0" + hour
    let minute = x.getMinutes()
    if (minute < 10) minute = "0" + minute
    let second = x.getSeconds()
    if (second < 10) second = "0" + second

    let year = x.getFullYear()
    let month = x.getMonth() + 1
    if (month < 10) month = "0" + month
    let monthday = x.getDate()
    if (monthday < 10) monthday = "0" + monthday

    let date_ele = document.getElementById("date")
    let time_ele = document.getElementById("time")


    date_ele.innerHTML = year + " - " + month + " - " + monthday
    time_ele.innerHTML = hour + ":" + minute + ":" + second
}