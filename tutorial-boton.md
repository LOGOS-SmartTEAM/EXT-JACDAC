# Mi primer Botón Jacdac

## ¡Hola! @showdialog

Hoy vas a programar el **Botón Jacdac** de KittenBot.

Cuando pulses el botón, la micro:bit mostrará un **corazón** ❤️.

## ¿Qué necesitas? @showdialog

* Una **micro:bit V2**
* El **Jacdaptor** (la placa donde se pone la micro:bit)
* El **Botón Jacdac** y un **cable Jacdac**

Une el botón al Jacdaptor con el cable.

¿No tienes el kit? ¡No pasa nada! Puedes probarlo todo en el **simulador**.

## Paso 1: Al pulsar el botón

Abre la categoría ``||fifaJacdac:FIFA JACDAC||``.

Arrastra el bloque ``||fifaJacdac:al pulsar el botón||`` al área de trabajo.

```blocks
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
})
```

## Paso 2: Muestra un corazón

Abre ``||basic:Básico||`` y arrastra ``||basic:mostrar ícono||``
**dentro** del bloque ``||fifaJacdac:al pulsar el botón||``.

Elige el **corazón**.

```blocks
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
    basic.showIcon(IconNames.Heart)
})
```

## Paso 3: Al soltar el botón

Arrastra **otro** bloque ``||fifaJacdac:al pulsar el botón||``.

Haz clic en la palabra **pulsar** y cámbiala por **soltar**.

Dentro pon ``||basic:borrar la pantalla||`` (está en ``||basic:Básico||`` ▸ **más**).

```blocks
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
    basic.showIcon(IconNames.Heart)
})
fifaJacdac.onButton(fifaJacdac.ButtonAction.Released, function () {
    basic.clearScreen()
})
```

## Paso 4: ¡Pruébalo en el simulador!

Mira el **simulador**: debajo de la micro:bit aparece el panel **Jacdac**.

Si no ves el botón, pulsa **+** para añadirlo.

Haz clic en el botón del simulador: ¿sale el corazón? Al soltarlo, ¿se borra?

## Paso 5: ¡GOL! ⚽

Arrastra un **tercer** bloque ``||fifaJacdac:al pulsar el botón||`` y cambia **pulsar** por **mantener**.

Dentro pon ``||basic:mostrar cadena||`` y escribe **GOL**.

Ahora, si **dejas el botón pulsado** un rato, la micro:bit escribe GOL.

```blocks
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
    basic.showIcon(IconNames.Heart)
})
fifaJacdac.onButton(fifaJacdac.ButtonAction.Released, function () {
    basic.clearScreen()
})
fifaJacdac.onButton(fifaJacdac.ButtonAction.Held, function () {
    basic.showString("GOL")
})
```

## Paso 6: Pásalo a tu micro:bit

1. Conecta la micro:bit al ordenador con el cable USB.
2. Pulsa el botón **Descargar** y sigue los pasos.
3. Pulsa el **Botón Jacdac** de verdad. ¡Funciona!

## ¡Lo lograste! 🏆 @showdialog

Ya sabes usar el Botón Jacdac:

* **pulsar** → pasa algo al apretar
* **soltar** → pasa algo al dejar de apretar
* **mantener** → pasa algo si lo dejas apretado

**Reto:** cambia el corazón por otro ícono, o escribe tu nombre al mantener el botón.
