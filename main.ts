let seeObstacle = false
let motorSpeed = 0
let distance = 0
DFRobotMaqueenPlus.I2CInit()
basic.showLeds(`
    # # . # #
    . . # . .
    . . . . .
    . # . # .
    . . # . .
    `)
DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.BLUE)
music.setVolume(80)
basic.forever(function () {
    distance = DFRobotMaqueenPlus.ultraSonic(PIN.P1, PIN.P2)
})
basic.forever(function () {
    motorSpeed = DFRobotMaqueenPlus.readSpeed(Motors1.M1)
})
basic.forever(function () {
    if (distance > 10 && distance < 12) {
        seeObstacle = true
        basic.pause(200)
    } else if (motorSpeed < 100) {
        seeObstacle = true
        basic.pause(200)
    } else {
        seeObstacle = false
    }
})
basic.forever(function () {
    if (seeObstacle) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.RED)
        basic.showLeds(`
            . # . # .
            . . . . .
            . . # . .
            . # . # .
            # . . . #
            `)
    } else {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.BLUE)
        basic.showLeds(`
            # # . # #
            . . # . .
            . . . . .
            . # . # .
            . . # . .
            `)
    }
})
basic.forever(function () {
    if (seeObstacle) {
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 200)
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 200)
    } else {
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 60)
    }
})
basic.forever(function () {
    if (seeObstacle) {
        music.playTone(262, music.beat(BeatFraction.Double))
    }
})
