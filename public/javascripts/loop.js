"use strict"
const location_me = {latitude: 39.7392, longitude: -104.9903}
let lastTime = performance.now()
const transformToMap = (map, context, canvasLayer) =>
{
  context.setTransform(1, 0, 0, 1, 0, 0)
  const resolutionScale = window.devicePixelRatio || 1
  const scale = Math.pow(2, map.zoom) * resolutionScale
  context.scale(scale, scale)
  const mapProjection = getMapProjection(map)
  const offset = mapProjection.fromLatLngToPoint(canvasLayer.getTopLeft())
  context.translate(-offset.x, -offset.y)
}
const getMapProjection = (map) =>
{
  return map.getProjection()
}
const getWorldPoint = (map, latitude, longitude) =>
{
  const rectLatLng = new google.maps.LatLng(latitude, longitude)
  const mapProjection = getMapProjection(map)
  return mapProjection.fromLatLngToPoint(rectLatLng)
}

const update = _.throttle((map, context, canvasLayer) =>
{
  const currentTime = performance.now()
  const dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  transformToMap(map, context, canvasLayer)
  const canvasWidth = canvasLayer.canvas.width
  const canvasHeight = canvasLayer.canvas.height
  // context.clearRect(0, 0, canvasWidth, canvasHeight)
  $.get("/data")
  .then(function (data) {
    var vehicles = data.entity;
    var buses = vehicles.map((entity) => {
      var position = entity.vehicle.position
      return new Bus({
        lat: position.latitude,
        long: position.longitude,
        bearing: position.bearing
      })
    })
    buses = buses.slice(10)
    buses.forEach((bus) => bus.draw(context))
  })
  var bus = new Bus({lat: 39.7392, long: -104.9903, bearing:0});
  bus.draw(context)
}, 10000)
