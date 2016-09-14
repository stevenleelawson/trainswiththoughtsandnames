class Bus {
  constructor(apiReturn) {
    this.lat = apiReturn.lat;
    this.long = apiReturn.long;
    this.bearing = apiReturn.bearing;
  }

    draw(context) {
      const worldPoint = getWorldPoint(map, this.lat, this.long);
      context.fillStyle = `green`
      context.fillRect(
        worldPoint.x, worldPoint.y,
        .01, .01)
  }
}
