let seeObstacle = false
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
basic.forever(function () {
    distance = DFRobotMaqueenPlus.ultraSonic(PIN.P1, PIN.P2)
    basic.pause(500)
})
basic.forever(function () {
    if (distance > 2 && distance < 15) {
        seeObstacle = true
    } else {
        seeObstacle = false
    }
})
basic.forever(function () {
    if (seeObstacle) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.RED)
        if (distance < 10) {
            basic.showNumber(distance)
        } else {
            basic.showLeds(`
                . # . # .
                . . . . .
                . . # . .
                . # . # .
                # . . . #
                `)
        }
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
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 100)
    }
})
basic.forever(function () {
    if (seeObstacle) {
        music.playTone(262, music.beat(BeatFraction.Breve))
        basic.pause(500)
    }
})
