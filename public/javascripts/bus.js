var busImage = new Image(384, 120)
busImage.src = "/images/bus.png"

class Bus {
  constructor(apiReturn) {
    this.lat = apiReturn.lat;
    this.long = apiReturn.long;
    this.bearing = apiReturn.bearing;
  }

  draw(context) {
    const worldPoint = getWorldPoint(map, this.lat, this.long);
    // context.fillStyle = `blue`
    // context.fillRect(
    //   worldPoint.x, worldPoint.y - 0.0007,
    //   .002, .002)
    context.save()
    context.translate(worldPoint.x, worldPoint.y)
    context.rotate(this.bearing / 2 * Math.PI)
    context.translate(-worldPoint.x, -worldPoint.y)
    context.drawImage(busImage, worldPoint.x, worldPoint.y, 0.005, 0.0025);
    context.restore()
    this.context = context
    if (this.thought) {

    }
  }

  haveThought () {
    $.get("/quote")
    .then((data) => {
      this.thought = _.head(data).content
      console.log(this.thought)
      this.context.font = "0.008pt serif";
      const worldPoint = getWorldPoint(map, this.lat, this.long);
      this.context.fillText(this.thought, worldPoint.x, worldPoint.y);
    })
  }
}
