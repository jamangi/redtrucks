
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

function get_distance(origin, destination){

    // Math.atan2()
    // Math.radians()
    // Math.abs()

    // approximate radius of earth in km
    let R = 6373.0

    let lat1 = Math.radians(Math.abs(origin[0]))
    let lon1 = Math.radians(Math.abs(origin[1]))
    let lat2 = Math.radians(Math.abs(destination[0]))
    let lon2 = Math.radians(Math.abs(destination[1]))

    let dlon = lon2 - lon1
    let dlat = lat2 - lat1

    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    let distance_km = R * c
    let distance_miles = distance_km * 0.621371

    return {"km": +distance_km.toFixed(2), "miles": +distance_miles.toFixed(2)}
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};