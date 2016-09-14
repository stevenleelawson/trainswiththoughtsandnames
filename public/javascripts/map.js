"use strict"

// const google = require("./google")
// const location = require("./location")

const map = new google.maps.Map(document.getElementById("map"), {
  center: {lat: 3, lng: 4},
  zoom: 14,
})
