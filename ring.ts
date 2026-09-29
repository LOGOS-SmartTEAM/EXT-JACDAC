namespace fifaJacdac {
    /**
     * The RGB Ring module (8 LEDs).
     */
    export const ring = new modules.LedClient("ring")

    // The Jacdaptor only supplies about 100 mA for the whole bus, so start dim.
    let ringBrightness = 20
    ring.onConnectionChanged(jacdac.ClientConnectionState.Connected, function () {
        ring.setBrightness(ringBrightness)
    })

    /**
     * Light all the LEDs of the ring with one color.
     * @param rgb the color
     */
    //% blockId=fifajd_set_ring_color
    //% block="set ring color to $rgb"
    //% rgb.shadow="colorNumberPicker" rgb.defl=0xff0000
    //% group="Ring" weight=100
    export function setRingColor(rgb: number) {
        ring.setAll(rgb)
    }

    /**
     * Light one LED of the ring.
     * @param led LED number, from 1 to 8
     * @param rgb the color
     */
    //% blockId=fifajd_set_ring_led
    //% block="set ring LED $led to $rgb"
    //% led.min=1 led.max=8 led.defl=1
    //% rgb.shadow="colorNumberPicker" rgb.defl=0x00ff00
    //% group="Ring" weight=90
    export function setRingLed(led: number, rgb: number) {
        ring.setPixelColor(led - 1, rgb)
    }

    /**
     * Set how bright the ring is, from 0 to 100.
     * @param percent brightness, eg: 20
     */
    //% blockId=fifajd_set_ring_brightness
    //% block="set ring brightness to $percent"
    //% percent.min=0 percent.max=100 percent.defl=20
    //% group="Ring" weight=80
    export function setRingBrightness(percent: number) {
        ringBrightness = Math.max(0, Math.min(100, percent))
        ring.setBrightness(ringBrightness)
    }

    /**
     * Show a value on the ring as a bar that fills up.
     * @param value the value to show
     * @param max value that fills the whole ring, eg: 100
     */
    //% blockId=fifajd_show_on_ring
    //% block="show $value on ring as a bar up to $max"
    //% max.defl=100
    //% group="Ring" weight=70
    export function showOnRing(value: number, max: number) {
        ring.plotBarGraph(value, max)
    }

    /**
     * Move all the colors of the ring around by some steps.
     * @param steps how many LEDs to move, eg: 1
     */
    //% blockId=fifajd_rotate_ring
    //% block="rotate ring by $steps"
    //% steps.defl=1
    //% group="Ring" weight=60
    export function rotateRing(steps: number) {
        ring.rotate(steps)
    }

    /**
     * Switch off all the LEDs of the ring.
     */
    //% blockId=fifajd_ring_off
    //% block="turn ring off"
    //% group="Ring" weight=50
    export function turnRingOff() {
        ring.setAll(0)
    }
}
