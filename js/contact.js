var map;
var marker;
var geoLoc = navigator.geolocation;

var directionsService;
var directionsDisplay;

//Latitud y Longitud 
var LatLng = { lat: 10.005026407041958, lng: -84.21840218910089 };

function initMap()
{
    map = new google.maps.Map(document.getElementById("map"), {
        center: LatLng,
        zoom: 14,
        mapTypeId: 'roadmap'
    });

    new google.maps.Marker({
        position: LatLng,
        map,
        title: "T3AMPO Headquarters",
    });
    
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
}


function CalcRoute()
{
    if (navigator.geolocation)
    {
        geoLoc.getCurrentPosition(showLocationOnMap, null, { enableHighAccuracy: true });

    } else
    {
        alert("Your browser doesn't support geolocalization.");
    }
}

function showLocationOnMap(position)
{
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;

    var myLatLng = { lat: latitud, lng: longitud };

    var request = {
        origin: myLatLng,
        destination: LatLng,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
    };

    directionsDisplay.setMap(map);

    directionsService.route(request, function (result, status)
    {
        if (status == google.maps.DirectionsStatus.OK) 
        {
            directionsDisplay.setDirections(result); 
        }
    });
}

$("#form").submit(
    function (e)
    {
        alert("The email has been sent");
    }
)