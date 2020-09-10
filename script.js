let latit = 40.650002;
let longit = -73.949997;
let mymap = L.map('map');
var ip = document.getElementById('input-ip');
var search = document.getElementById('search');
var newIp = document.getElementById('new-ip');
var newLocation = document.getElementById('new-location');
var newZone = document.getElementById('new-zone');
var newIsp = document.getElementById('new-isp');

mymap.setView([latit, longit], 13);
var setMap = () => {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhdzEyIiwiYSI6ImNrZXR4bDhmbDBqYmUzNGxoa2I3M2hmdDMifQ.b-m-i1U8b4MWy5WUCegzSQ', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
 }).addTo(mymap);
  L.marker([latit, longit]).addTo(mymap)
}

setMap();

var handleClick = () => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_xwpMqdH2Js2KIxBltCu8c6PZalQZD&ipAddress=${ip.value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      handleData(data)
    })
  }

  var handleData = (data) => {
    newIp.innerText = data.ip
    newLocation.innerText = `${data.location.city}, ${data.location.region} - ${data.location.postalCode}`;
    newZone.innerText = `UTC${data.location.timezone}`;
    newIsp.innerText = data.isp;
    latit = data.location.lat;
    longit = data.location.lng;
    mymap.setView([latit, longit], 13)
    setMap()
  }
  
  search.addEventListener('click', handleClick)
