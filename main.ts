/*

https://docs.google.com/viewer?url=https%3A%2F%2Fresources.kitronik.co.uk%2Fpdf%2F5601b_built_edge_connector_breakout_board_for_the_bbc_microbit_datasheet_v1_1.pdf

Pin 1 - PAD1 - Gul Højre potmeter
Pin 2 - PAD2 - Gul venstre potmeter

Pin 5 - BTN_A - 

Pin  3 COL 1   - Brun   => Knap 1   P3
Pin  4 COL 2   - Rød    => Knap 2   P4
Pin 10 COL 3   - Orange => Knap 3   P10
Pin  6 COL 9   - Gul    => Knap 4   P6
Pin  9 COL 8   - Grøn  =>  Knap 5   P7
Pin 12 COL 7   - Blå    => Knap 6   P9 

Pin  5 BTN_A   - Lilla  => Grøn Knap
Pin 16 BTN_B   - Hvid   => Rød knap
Pin  8 COL 8   - Grå    => Sort knap DIO / P8

*/

led.enable(false);
radio.setGroup(1)
serial.redirectToUSB()

let lastVal = ""
let lasttime = 0 

function transmit(val:string){

    if (control.millis() > lasttime + 2500) {
        lastVal = ""
    }

    if (val != lastVal) {
        serial.writeLine(val)
        radio.sendString(val)
        basic.pause(50)
        lastVal = val
        lasttime = control.millis()
    }

}

function transmitVal(name: string, val:number) {
    serial.writeLine(name + ":" + val.toString())
    radio.sendValue(name, val)
}

input.onButtonPressed(Button.A, function() {
    transmit("A")
})

input.onButtonPressed(Button.B, function () {
    transmit("C")
})

input.onButtonPressed(Button.AB, function () {
    transmit("C")
})

let p3 = false;
let p4 = false;
let p6 = false;
let p7 = false;
let p8 = false;
let p9 = false;
let p10 = false;



control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P3), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("1")
})
pins.setEvents(DigitalPin.P3, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P4), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("2")
})
pins.setEvents(DigitalPin.P4, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P10), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("3")
})
pins.setEvents(DigitalPin.P10, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P6), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("4")
})
pins.setEvents(DigitalPin.P6, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P7), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("5")
})
pins.setEvents(DigitalPin.P7, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P9), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("6")
})
pins.setEvents(DigitalPin.P9, PinEventType.Edge)

control.onEvent(control.eventSourceId(EventBusSource.MICROBIT_ID_IO_P8), control.eventValueId(EventBusValue.MICROBIT_PIN_EVT_RISE), () => {
    transmit("B")
})
pins.setEvents(DigitalPin.P8, PinEventType.Edge)


let oldPin1 = 0
let oldPin2 = 0

basic.forever(function () {

    let pin1 =  Math.floor(pins.analogReadPin(AnalogPin.P1) / 11)
    if (oldPin1 != pin1) {
        transmitVal("s1", pin1)
        oldPin1 = pin1
    }

    let pin2 = Math.floor(pins.analogReadPin(AnalogPin.P2) / 11)
    if (oldPin2 != pin2) {
        transmitVal("s2", pin2)
        oldPin2 = pin2
    }

});