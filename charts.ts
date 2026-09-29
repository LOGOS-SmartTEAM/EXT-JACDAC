namespace fifaJacdac {
    let charting = false
    let chartInterval = 200

    /**
     * Send a value to the charts. Open "Show data" under the simulator to see it.
     * Names that share a prefix (like "fifa.light" and "fifa.slider") share a chart.
     * @param name name of the line in the chart, eg: "x"
     * @param value value to plot
     */
    //% blockId=fifajd_send_to_chart
    //% block="send to chart $name = $value"
    //% group="Charts" weight=100
    export function sendToChart(name: string, value: number) {
        serial.writeValue(name, value)
    }

    /**
     * Keep sending the slider, light and dial values to one chart.
     * Open "Show data" under the simulator to see it.
     * @param ms time between points in milliseconds, eg: 200
     */
    //% blockId=fifajd_chart_sensors
    //% block="chart sensors every $ms ms"
    //% ms.min=50 ms.defl=200
    //% group="Charts" weight=90
    export function chartSensors(ms: number) {
        chartInterval = Math.max(50, ms)
        if (charting) return
        charting = true
        control.inBackground(function () {
            while (true) {
                serial.writeValue("fifa.slider", sliderValue())
                serial.writeValue("fifa.light", lightLevel())
                serial.writeValue("fifa.dial", dialPosition())
                basic.pause(chartInterval)
            }
        })
    }
}
