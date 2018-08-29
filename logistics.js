
let url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
let raw = []
let data = []
let index = 0

function init_table(){
    let table = document.getElementById("t1")
    let tr = document.createElement("tr")
    let th_name = document.createElement("th")
    th_name.innerHTML = "Name"
    let th_address = document.createElement("th")
    th_address.innerHTML = "Address"

    tr.append(th_name)
    tr.append(th_address)
    table.append(tr)
}

function clear_table(){
    let table_old = document.getElementById("t1")
    let table_parent = table_old.parentNode
    table_parent.removeChild(table_old)

    let table_new = document.createElement("table")
    table_new.setAttribute("id", "t1")
    table_parent.appendChild(table_new)
}

function next(){
    clear_table()
    init_table()
    index += 10
    if (index > data.length)
        index = data.length
    populate_table()
    console.log("next")
}

function back(){
    clear_table()
    init_table()
    index -= 10
    if (index < 0)
        index = 0
    populate_table()
    console.log("back")
}

function populate_table(){
    let table = document.getElementById("t1")
    console.log(data.length)
    console.log(data)

    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})
    data.push({"name": "bot", "address": "bot"})

    let j = index + 10
    if (j > data.length)
        j = data.length

    for (let i = index; i < j; i++) {
                let truck = data[i]
                let tr = document.createElement('tr')
                let name = document.createElement('td')
                let addr = document.createElement('td')
                name.innerHTML = truck.name
                addr.innerHTML = truck.address
                table.append(tr)
                tr.append(name)
                tr.append(addr)
    }

}

function ajax_call(callback){
    let url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            raw = JSON.parse(this.responseText)

            for (let truck of raw) {
                let start_time = {"dayorder": parseInt(truck.dayorder), "open": truck.start24}
                let closing_time = {"dayorder": start_time.dayorder, "end": truck.end24}
                if (is_open(start_time, closing_time)){
                    let name = truck.applicant
                    let address = truck.location
                    data.push({"name": name, "address": address})
                }
            }
            callback()
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();
}

function day_hour_minute(){
    let x = new Date();
    let day = x.getDay()
    let hour = x.getHours()
    let minute = x.getMinutes()

    day = day % 7
    return {"day": day, "hour": hour, "minute": minute}
}

function is_open(start, end){
    let parsed_start = start.open.split(":")
    let parsed_end = end.end.split(":")

    let truck_day_start = parseInt(start.dayorder)
    let truck_hour_start = parseInt(parsed_start[0])
    let truck_minute_start = parseInt(parsed_start[1])

    let truck_day_end = parseInt(end.dayorder)
    let truck_hour_end = parseInt(parsed_end[0])
    let truck_minute_end = parseInt(parsed_end[1])

    let x = day_hour_minute()
    let day = x.day
    let hour = x.hour
    let minute = x.minute

    let our_magnitude = (day * 1440) + (hour * 60) + minute

    let truck_magnitude_start = (truck_day_start * 1440
                             + truck_hour_start * 60
                             + truck_minute_start)

    let truck_magnitude_end = (truck_day_end * 1440
                           + truck_hour_end * 60
                           + truck_minute_end)

    // case A - Truck closes before 12am
    if (truck_magnitude_end > truck_magnitude_start){
        if (our_magnitude >= truck_magnitude_start
                && our_magnitude < truck_magnitude_end)
            return true
    }

    // case B - Truck closes after 12am
    if (truck_magnitude_end < truck_magnitude_start){
        if (our_magnitude >= truck_magnitude_start
                || our_magnitude < truck_magnitude_end)
            return true
    }

    return false
}

function ajax_call_backup(){
    let url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let obj_list = JSON.parse(this.responseText)
            let table = document.getElementById("t1")
            let count = 0
            for (let truck of obj_list) {
                let tr = document.createElement('tr')
                let name = document.createElement('td')
                let addr = document.createElement('td')
                name.innerHTML = truck.applicant
                addr.innerHTML = truck.location
                table.append(tr)
                tr.append(name)
                tr.append(addr)
                count++
                if (count == 10)
                    break
            }
            
          
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

let nextbutton = document.getElementById("next")
let backbutton = document.getElementById("back")
nextbutton.addEventListener("click", next)
backbutton.addEventListener("click", back)
init_table()
ajax_call(populate_table)