function init_table(){
    let table = document.getElementById("t1")
    let tr = document.createElement("tr")
    let th_name = document.createElement("th")
    th_name.innerHTML = "Name"
    let th_address = document.createElement("th")
    th_address.innerHTML = "Address"
    let th_distance = document.createElement("th")
    th_distance.innerHTML = "Miles"

    tr.append(th_name)
    tr.append(th_address)
    tr.append(th_distance)
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

function populate_visits() {
    let myvisits = document.getElementById('my_visits')
    let allvisits = document.getElementById('all_visitors')
    myvisits.innerHTML = my_visits
    allvisits.innerHTML = all_visitors
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

function name() {
    index = 0
    clear_table()
    init_table()
    sort = sort_by_name
    populate_table()
}

function miles() {
    index = 0
    clear_table()
    init_table()
    sort = sort_by_miles
    populate_table()
}

function sort_by_name(){
    data.sort(function(a, b){
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA === "closed")
            return 1
        if (nameB === "closed")
            return -1

        if (nameA < nameB) //sort ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
}

function sort_by_miles(){
    data.sort(function(a, b){
        let distA = a.distance.miles, distB = b.distance.miles
        if (distA === "-")
            return 1
        if (distB === "-")
            return -1

        if (distA < distB)
            return -1
        if (distA > distB)
            return 1
        return 0
    })
}

function populate_table(){
    clear_table()
    init_table()
    let table = document.getElementById("t1")

    sort()

    if (data.length < 20)
        dummydata()

    let j = index + 10
    if (j > data.length)
        j = data.length

    for (let i = index; i < j; i++) {
                let truck = data[i]
                let tr = document.createElement('tr')
                let name = document.createElement('td')
                let addr = document.createElement('td')
                let dist = document.createElement('td')
                name.innerHTML = truck.name
                addr.innerHTML = truck.address
                dist.innerHTML = truck.distance.miles
                table.append(tr)
                tr.append(name)
                tr.append(addr)
                tr.append(dist)
    }

}

function dummydata(){
    for (let i = 0; i < 20; i++)
        data.push({"name": "closed", "address": "-", "distance": {"km": "-", "miles": "-"}})
}