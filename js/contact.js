let map;
function initMap()
{
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 10.005026407041958,
            lng: -84.21840218910089
        },
        zoom: 14
    });

    new google.maps.Marker({
        position: {
            lat: 10.005026407041958,
            lng: -84.21840218910089
        },
        map,
        title: "T3AMPO Headquarters",
    });
}

$("#submit").click(
    function ()
    {
        alert("pain")
    }
)