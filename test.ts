// tests go here; this will not be compiled when this package is used as an extension.

// Button -> ring color
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
    fifaJacdac.setRingColor(0xff0000)
})
fifaJacdac.onButton(fifaJacdac.ButtonAction.Released, function () {
    fifaJacdac.setRingColor(0x0000ff)
})
fifaJacdac.onButton(fifaJacdac.ButtonAction.Held, function () {
    fifaJacdac.rotateRing(1)
})

// Dial -> brightness and LED position
let brightness = 20
fifaJacdac.onDialTurned(fifaJacdac.DialDirection.Right, function () {
    brightness = Math.min(100, brightness + 5)
    fifaJacdac.setRingBrightness(brightness)
})
fifaJacdac.onDialTurned(fifaJacdac.DialDirection.Left, function () {
    brightness = Math.max(0, brightness - 5)
    fifaJacdac.setRingBrightness(brightness)
})
fifaJacdac.onDialButton(fifaJacdac.ButtonAction.Pressed, function () {
    fifaJacdac.resetDial()
    fifaJacdac.turnRingOff()
    fifaJacdac.setRingLed(1, 0x00ff00)
})

// Slider -> bar on the ring
fifaJacdac.onSliderMoved(function () {
    fifaJacdac.showOnRing(fifaJacdac.sliderValue(), 100)
})

// Light sensor -> micro:bit screen
fifaJacdac.onLight(fifaJacdac.LightCondition.Below, 30, function () {
    basic.showIcon(IconNames.Asleep)
})
fifaJacdac.onLight(fifaJacdac.LightCondition.Above, 70, function () {
    basic.showIcon(IconNames.Happy)
})

// Charts
fifaJacdac.chartSensors(200)
basic.forever(function () {
    fifaJacdac.sendToChart("pressed", fifaJacdac.buttonIsPressed() ? 1 : 0)
    fifaJacdac.sendToChart("dial", fifaJacdac.dialPosition())
    basic.pause(500)
})
