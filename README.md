# FIFA JACDAC

Easy MakeCode blocks for the **KittenBot Jacdac modules** on the **micro:bit V2**:
keycap button, rotary button (dial), slider, light sensor and RGB ring (8 LEDs).

The blocks are built on top of [jacdac/pxt-jacdac](https://github.com/jacdac/pxt-jacdac) v1.9.42,
so every module also works as a **virtual module in the simulator** (no hardware needed).

> Bloques fáciles de MakeCode para los módulos **Jacdac de KittenBot** con la **micro:bit V2**.
> Los bloques salen en español si el editor está en español (ver más abajo).

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/LOGOS-SmartTEAM/EXT-JACDAC** and import

## Hardware

* micro:bit **V2** (Jacdac does not work on V1)
* KittenBot **Jacdaptor** for micro:bit V2
* KittenBot Jacdac modules: Keycap Button, Rotary Button, Slider, Light Sensor, RGB Ring

The first time, download any program that uses this extension to the micro:bit,
then use **Download ▸ Connect Device** to see the real modules in the Jacdac panel.

## Blocks

### Button

```blocks
fifaJacdac.onButton(fifaJacdac.ButtonAction.Pressed, function () {
    fifaJacdac.setRingColor(0xff0000)
})
```

### Dial

```blocks
let brightness = 20
fifaJacdac.onDialTurned(fifaJacdac.DialDirection.Right, function () {
    brightness += 5
    fifaJacdac.setRingBrightness(brightness)
})
fifaJacdac.onDialButton(fifaJacdac.ButtonAction.Pressed, function () {
    fifaJacdac.resetDial()
})
```

### Slider and light sensor

```blocks
fifaJacdac.onSliderMoved(function () {
    fifaJacdac.showOnRing(fifaJacdac.sliderValue(), 100)
})
fifaJacdac.onLight(fifaJacdac.LightCondition.Below, 30, function () {
    basic.showIcon(IconNames.Asleep)
})
```

### Charts

```blocks
fifaJacdac.chartSensors(200)
```

Click **Show data Simulator** under the simulator to see the chart.

## Simulator

Run the program: a **Jacdac panel** appears under the micro:bit simulator.
Click **Add simulators** (or the **+** button) to create a virtual module for each
module used by the program, then press, turn and slide them with the mouse.

## En español

* **Idioma de los bloques:** en el editor, ⚙️ ▸ **Language** ▸ **Español**.
* **Añadir la extensión:** Extensiones ▸ pegar `https://github.com/LOGOS-SmartTEAM/EXT-JACDAC`.
* **Simulador sin hardware:** al ejecutar el programa aparece el panel de Jacdac bajo el simulador;
  pulsa **Add simulators** (o **+**) y usa los módulos virtuales con el ratón.
* **Gráficas:** usa «graficar los sensores cada 200 ms» y abre **Show data Simulator**.
* **Hardware real:** micro:bit V2 + Jacdaptor. Descarga el programa una vez y después
  **Descargar ▸ Connect Device** para ver los módulos reales.

## License

MIT

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
