"use strict"
// const map = require("./map")
const resolutionScale = window.devicePixelRatio || 1
const canvasLayerOptions = {
  map,
  animate: true,
  resolutionScale,
}
const canvasLayer = new CanvasLayer(canvasLayerOptions)
const context = canvasLayer.canvas.getContext("2d")
canvasLayer.setUpdateHandler(() => update(map, context, canvasLayer))
