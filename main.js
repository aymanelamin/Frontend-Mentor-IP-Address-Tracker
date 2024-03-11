let myApiKey = "apiKey=at_qXjtBvVVIs88Gd6UEnIrLF3ge4WJO"
let GeolocationApi = "https://geo.ipify.org/api/v2/country,city?"
let myUrl = GeolocationApi + myApiKey
var map ;

getData(myUrl)

function changeDom(data) {
    document.getElementById("ipAdress").innerHTML = data.ip
    let region = data.location.region
    let country = data.location.country
    let geonameId = data.location.geonameId
    let location = region +"," + country + "<br>"+ geonameId
    document.getElementById("location").innerHTML = location
    document.getElementById("timeZoneValue").innerHTML = data.location.timezone
    document.getElementById("isp").innerHTML = data.isp
    lat = data.location.lat;
    lng = data.location.lng;
}
function getData(myUrl){
    let Request = new XMLHttpRequest ()
    Request.onload = function() {
        if (Request.readyState == 4 && Request.status == 200){
            let data = JSON.parse(Request.response)
            changeDom(data)
            map = L.map("map");
            L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=4YPaiq1LiOcCWlc35YiG',{
                attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            }).addTo(map);
            var myIcon = L.icon({
                iconUrl: "images/icon-location.svg",
                iconSize: [46, 56],
                
            })
            var marker = L.marker([lat,lng],{icon: myIcon}).addTo(map);
            map.setView([lat, lng],16);
    }
        }
        
    Request.open("GET", myUrl)
    Request.send();  
}
function search() {
    let textBoxValue = document.getElementById("searchBox").value ;
    let blocks = textBoxValue.split(".");
    
    if (Number(blocks[0]) >= 0 && Number(blocks[0]) <= 255 &&
        Number(blocks[1]) >= 0 && Number(blocks[1]) <= 255 &&
        Number(blocks[2]) >= 0 && Number(blocks[2]) <= 255 &&
        Number(blocks[3]) >= 0 && Number(blocks[3]) <= 255) {
            let ipToSearchFor = "&ipAddress=" + textBoxValue;
            let myUrlFromTextBox = GeolocationApi + myApiKey+ipToSearchFor
            let Request = new XMLHttpRequest ()
            Request.onload = function() {
                if (Request.readyState == 4 && Request.status == 200){
                    let data = JSON.parse(Request.response)
                    changeDom(data)
                    map.setView([data.location.lat, data.location.lng],13);
                    var myIcon = L.icon({
                        iconUrl: "images/icon-location.svg",
                        iconSize: [46, 56],
                    })
                    L.marker([lat,lng],{icon: myIcon}).addTo(map);

            }else {
                window.alert("Please enter a valid Id or Domain name")
            }   
                }
        
            Request.open("GET", myUrlFromTextBox)
            Request.send();  
        }
         

    else {
        domainToSearchFor = "&domain=" + textBoxValue
        let myUrlFromTextBox = GeolocationApi + myApiKey+domainToSearchFor
        let Request = new XMLHttpRequest ()
        Request.onload = function() {
            if (Request.readyState == 4 && Request.status == 200){
                let data = JSON.parse(Request.response)
                changeDom(data)
                map.setView([data.location.lat, data.location.lng],13);
                var myIcon = L.icon({
                    iconUrl: "images/icon-location.svg",
                    iconSize: [46, 56],
                })
                L.marker([lat,lng],{icon: myIcon}).addTo(map);
            }else{
                window.alert("Please enter a valid Id or Domain name")
            }
        }
        Request.open("GET", myUrlFromTextBox)
        Request.send();                 
}
}

    










