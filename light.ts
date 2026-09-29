namespace fifaJacdac {
    /**
     * Where the light level is compared to a limit.
     */
    export enum LightCondition {
        //% block="below"
        Below,
        //% block="above"
        Above,
    }

    /**
     * The Light Sensor module.
     */
    export const lightSensor = new modules.LightLevelClient("light")

    /**
     * Light level measured by the sensor, from 0 (dark) to 100 (bright).
     */
    //% blockId=fifajd_light_level
    //% block="light level"
    //% group="Light" weight=100
    export function lightLevel(): number {
        const v = lightSensor.lightLevel()
        return v === undefined ? 0 : Math.round(v)
    }

    /**
     * Run code when the light level goes below or above a limit.
     * @param condition below or above
     * @param limit light level to compare with, from 0 to 100, eg: 30
     */
    //% blockId=fifajd_on_light
    //% block="when light level goes $condition $limit"
    //% limit.min=0 limit.max=100 limit.defl=30
    //% group="Light" weight=90
    export function onLight(condition: LightCondition, limit: number, handler: () => void) {
        let wasInside = false
        lightSensor.onLightLevelChangedBy(1, function () {
            const v = lightLevel()
            const inside = condition == LightCondition.Below ? v < limit : v > limit
            if (inside && !wasInside) handler()
            wasInside = inside
        })
    }
}
