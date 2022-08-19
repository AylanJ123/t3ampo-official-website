function isValidEmail(email)
{
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
        .test(email);
}

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


$("#submit").click(
    function ()
    {
        let email = $("#email");
        if (!isValidEmail(email.val())) email[0].setCustomValidity("Write a valid email");
        else email[0].setCustomValidity("");
    }
)

$("#form").submit(
    function (e)
    {
        e.preventDefault();
        alert("The email has been sent");
        location.reload()
    }
)