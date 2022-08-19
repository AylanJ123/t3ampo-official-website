function isValidEmail(email)
{
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
        .test(email);
}

var map;
var marker;
var geoLoc = navigator.geolocation;

//Renderizar rutas
var directionsService;
var directionsDisplay;

var LatLng = { lat: 10.005026407041958, lng: -84.21840218910089 }; //Latitud y Longitud 

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
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC, //IMPERIAL, METRIC
    };

    directionsDisplay.setMap(map); //Se vincula el mapa pasado

    directionsService.route(request, function (result, status)
    {
        if (status == google.maps.DirectionsStatus.OK) 
        {
            //legs[] contiene una matriz de objetos DirectionsLeg, 
            //cada uno de los cuales contiene información sobre un tramo de la
            // ruta, desde dos ubicaciones dentro de la ruta dada
            //Muestra tiempo y distancia
            // output.innerHTML =
            //     " Distancia: <i class='fas fa-road'></i> : " +
            //     result.routes[0].legs[0].distance.text +
            //     ". Duración: <i class='fas fa-hourglass-start'></i> : " +
            //     result.routes[0].legs[0].duration.text +
            //     ".</div>";

            //mostrar ruta
            directionsDisplay.setDirections(result);  //Debido a que el renderizador es un MVCObject, detectará 
            //automáticamente cualquier cambio en sus propiedades y 
            //actualizará el mapa cuando sus direcciones asociadas hayan cambiado.
        }
        else 
        {
            //Mensaje de error
            output.innerHTML =
                "<div style='color: red'><i class='fas fa-exclamation-triangle'></i> No se pudo calcular la distancia.</div>";
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