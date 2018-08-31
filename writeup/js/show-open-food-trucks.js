let url = "http://data.sfgov.org/resource/bbb8-hzi6.json"

let ip_url = "http://ipinfo.io/geo"
let lat_lon = [0,0]
let raw = []
let data = []
let index = 0
let sort = sort_by_name

let visit_url = "http://redtruck.services"
let my_visits = 0
let all_visitors = 0


let nextbutton = document.getElementById("next")
let backbutton = document.getElementById("back")
let sortname = document.getElementById("name")
let sortmiles = document.getElementById("miles")
nextbutton.addEventListener("click", next)
backbutton.addEventListener("click", back)
sortname.addEventListener("click", name)
sortmiles.addEventListener("click", miles)
init_table()
update_clock()
sort()
get_geolocation()
make_visit()
setInterval(get_all_visits(), 10000)
setInterval(update_clock, 1000)
setInterval(get_trucks, 30000)