var games = {
    mixIt: {
        img: "../images/Games/MixIt.png",
        link: "games/mixit.html",
        name: "Mix It!",
        price: 3
    },
    groabia: {
        img: "../images/Games/GroabiaTimes.png",
        link: "games/groabiaTimes.html",
        name: "Groabia Times",
        price: 4
    },
    dual: {
        img: "../images/Games/DualMatch.png",
        link: "games/dualMatch.html",
        name: "Dual Match",
        price: 2
    },
    duotopia: {
        img: "../images/Games/DuoTopia.png",
        link: "games/duotopia.html",
        name: "Duotopia",
        price: 5
    },
    brighter: {
        img: "../images/Games/Brightertogheter.png",
        link: "games/brighterTogether.html",
        name: "Brigther Together",
        price: 3
    },
}

var bundles = {
    cuteBundle: {
        games: [games.groabia, games.dual],
        name: "Cute Art Bundle",
        discount: 10
    },
    dualityBundle: {
        games: [games.dual, games.duotopia],
        name: "Duality Bundle",
        discount: 8
    },
    infiniteBundle: {
        games: [games.mixIt, games.dual],
        name: "Infinite Bundle",
        discount: 10
    },
    oldBundle: {
        games: [games.brighter, games.duotopia],
        name: "Good Oldies Bundle",
        discount: 25
    },
    winnersBundle: {
        games: [games.mixIt, games.groabia, games.dual],
        name: "Game Jam Winners Bundle",
        discount: 12
    }
}

let emptyBundle = {
    games: [
        {
            img: "",
            link: "",
            name: "Empty",
            price: 0
        }
    ],
    name: "Empty",
    discount: 0
}

var app = new Vue({
    el: '#mainContent',
    data: {
        bundles: bundles,
        checkoutBundle: emptyBundle,
        keys: []
    },
    methods: {
        getGamesFromArray() {
            let str = "";
            for (let game of this.checkoutBundle.games) {
                str += game.name + ", ";
            }
            return str.substring(0, str.length - 2);
        },
        bundleGrossCost() {
            let sum = 0;
            for (let game of this.checkoutBundle.games) {
                sum += game.price;
            }
            return sum
        },
        bundleDiscounted() {
            let total = this.bundleGrossCost();
            return total * (this.checkoutBundle.discount / 100);
        },
        bundleTotal() {
            return this.bundleGrossCost() - this.bundleDiscounted();
        },
        buyBundle() {
            let arr = []
            for (let game of this.checkoutBundle.games) {
                arr.push({
                    name: game.name,
                    key: randomKey()
                })
            }
            app.keys = arr;
            $("#keys").fadeIn();
        }
    }
})

function random5Set() {
    const charas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var str = '';
    for ( var i = 0; i < 5; i++ ) {
      str += charas.charAt(Math.floor(Math.random() * 
      charas.length));
   }
   return str;
}

function randomKey() {
    return random5Set() + "-" + random5Set() + "-" + random5Set();
}

$("#keys").hide();

$("#form").submit(
    function(e) {
        e.preventDefault();
        switch ($("input[type='radio'][name='b']:checked")[0].id) {
            case "b1":
                app.checkoutBundle = bundles.cuteBundle;
                break;
            case "b2":
                app.checkoutBundle = bundles.dualityBundle;
                break;
            case "b3":
                app.checkoutBundle = bundles.infiniteBundle;
                break;
            case "b4":
                app.checkoutBundle = bundles.oldBundle;
                break;
            case "b5":
                app.checkoutBundle = bundles.winnersBundle;
                break;
        }
        $("#checkoutModal").modal("show");
    }
)

$("#checkoutModal").on("hide.bs.modal",
    function() {
        app.checkoutBundle = emptyBundle;
        $("#keys").fadeOut();
    }
)