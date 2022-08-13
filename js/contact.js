function isValidEmail(email) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
    .test(email);
}

var map

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
    function() {
        let email = $("#email");
        if (!isValidEmail(email.val())) email[0].setCustomValidity("Write a valid email");
        else email[0].setCustomValidity("");
    }
)

$("#form").submit(
    function(e) {
        e.preventDefault();
        alert("The email has been sent");
        location.reload()
    }
)