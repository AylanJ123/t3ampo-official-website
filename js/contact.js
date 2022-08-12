let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 10.007025797993402, 
      lng:  -84.21644633461605,
    },
    zoom: 15,
  });
}

$("#submit").click(
    function() {
        alert("pain")
    }
)