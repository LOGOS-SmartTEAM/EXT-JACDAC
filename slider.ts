namespace fifaJacdac {
    /**
     * The Slider module.
     */
    export const slider = new modules.PotentiometerClient("slider")

    /**
     * Position of the slider, from 0 to 100.
     */
    //% blockId=fifajd_slider_value
    //% block="slider value"
    //% group="Slider" weight=100
    export function sliderValue(): number {
        const v = slider.position()
        return v === undefined ? 0 : Math.round(v)
    }

    /**
     * Run code when the slider is moved.
     */
    //% blockId=fifajd_on_slider_moved
    //% block="when slider moved"
    //% group="Slider" weight=90
    export function onSliderMoved(handler: () => void) {
        slider.onPositionChangedBy(2, handler)
    }
}
