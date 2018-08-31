function get_trucks(){
    let callback = populate_table
    //let url = "http://data.sfgov.org/resource/bbb8-hzi6.json"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            raw = JSON.parse(this.responseText)

            data = []
            for (let truck of raw) {
                let start_time = {"dayorder": parseInt(truck.dayorder), "open": truck.start24}
                let closing_time = {"dayorder": start_time.dayorder, "end": truck.end24}
                if (is_open(start_time, closing_time)){
                    let name = truck.applicant
                    let address = truck.location
                    let our_location = lat_lon
                    let truck_location = [parseFloat(truck.latitude), parseFloat(truck.longitude)]
                    let distance = get_distance(our_location, truck_location)
                    data.push({"name": name, "address": address, "distance": distance})
                }
            }
            callback()
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();
}

function get_geolocation(){
    let callback = get_trucks
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText)

            let latitude_longitude = info.loc.split(",")
            lat_lon[0] = parseFloat(latitude_longitude[0])
            lat_lon[1] = parseFloat(latitude_longitude[1])

            callback()
        }
    }

    xhttp.open("GET", ip_url, true);
    xhttp.send();
}

function make_visit(){
    let callback = get_all_visits
    let xhttp = new XMLHttpRequest();
    let make_visit_url = visit_url + "/visit"
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText)

            my_visits = info.visits

            callback()
        }
    }

    xhttp.open("GET", make_visit_url, true);
    xhttp.send();
}

function get_all_visits(){
    let callback = populate_visits
    let xhttp = new XMLHttpRequest();
    let make_visit_url = visit_url + "/visits"
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let info = JSON.parse(this.responseText)
            all_visitors = info.visits

            callback()
        }
    }

    xhttp.open("GET", make_visit_url, true);
    xhttp.send();
}