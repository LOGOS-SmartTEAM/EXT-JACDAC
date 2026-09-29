namespace fifaJacdac {
    /**
     * What a push button can do.
     */
    export enum ButtonAction {
        //% block="pressed"
        Pressed,
        //% block="released"
        Released,
        //% block="held"
        Held,
    }

    /**
     * The Keycap Button module.
     */
    export const keycap = new modules.ButtonClient("keycap")

    export function _buttonEvent(action: ButtonAction): jacdac.ButtonEvent {
        switch (action) {
            case ButtonAction.Released:
                return jacdac.ButtonEvent.Up
            case ButtonAction.Held:
                return jacdac.ButtonEvent.Hold
            default:
                return jacdac.ButtonEvent.Down
        }
    }

    /**
     * Run code when the keycap button is pressed, released or held down.
     * @param action what the button does
     */
    //% blockId=fifajd_on_button
    //% block="`fifaIcons.ball` when button $action"
    //% group="Button" weight=100
    export function onButton(action: ButtonAction, handler: () => void) {
        keycap.onEvent(_buttonEvent(action), handler)
    }

    /**
     * True while the keycap button is pressed down.
     */
    //% blockId=fifajd_button_is_pressed
    //% block="button is pressed"
    //% group="Button" weight=90
    export function buttonIsPressed(): boolean {
        return keycap.pressed()
    }
}
