namespace fifaJacdac {
    /**
     * Turning directions of the dial.
     */
    export enum DialDirection {
        //% block="right"
        Right,
        //% block="left"
        Left,
    }

    // The encoder and its push button share the "dial/" prefix, so the role manager
    // binds both to the same Rotary Button module and never to the keycap.
    /**
     * The Rotary Button module: the turning part.
     */
    export const dialEncoder = new modules.RotaryEncoderClient("dial/encoder")
    /**
     * The Rotary Button module: the push part.
     */
    export const dialButton = new modules.ButtonClient("dial/button")

    let dialOffset = 0
    let turnRightHandlers: (() => void)[] = undefined
    let turnLeftHandlers: (() => void)[] = undefined

    function listenDial() {
        if (turnRightHandlers) return
        turnRightHandlers = []
        turnLeftHandlers = []
        dialEncoder.onPositionChanged(function (delta: number) {
            // delta = previous - current: a clockwise turn makes it negative
            const handlers = delta < 0 ? turnRightHandlers : turnLeftHandlers
            // run once per click; cap in case the module was reset
            const clicks = Math.min(Math.abs(delta), 24)
            for (let i = 0; i < clicks; i++)
                for (const h of handlers) h()
        })
    }

    /**
     * Run code each time the dial clicks one step to the right or to the left.
     * @param direction right is clockwise
     */
    //% blockId=fifajd_on_dial_turned
    //% block="when dial turned $direction"
    //% group="Dial" weight=100
    export function onDialTurned(direction: DialDirection, handler: () => void) {
        listenDial()
        if (direction == DialDirection.Right) turnRightHandlers.push(handler)
        else turnLeftHandlers.push(handler)
    }

    /**
     * Run code when the dial is pressed, released or held down.
     * @param action what the dial button does
     */
    //% blockId=fifajd_on_dial_button
    //% block="when dial $action"
    //% group="Dial" weight=90
    export function onDialButton(action: ButtonAction, handler: () => void) {
        dialButton.onEvent(_buttonEvent(action), handler)
    }

    /**
     * Number of clicks the dial has turned: right adds, left subtracts.
     */
    //% blockId=fifajd_dial_position
    //% block="dial position"
    //% group="Dial" weight=80
    export function dialPosition(): number {
        const p = dialEncoder.position()
        return p === undefined ? 0 : p - dialOffset
    }

    /**
     * Make the current dial position count as 0.
     */
    //% blockId=fifajd_reset_dial
    //% block="reset dial position"
    //% group="Dial" weight=70
    export function resetDial() {
        dialOffset = dialEncoder.position() || 0
    }
}
