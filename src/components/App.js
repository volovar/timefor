import React from 'react'
import { css } from 'emotion'
import { requestIntervalFrame } from '../utils/timers'

const appStyle = css`
    box-sizing: border-box;
    height: 100%;
`

const emojiStyle = css`
    font-size: 26vw;
    text-align: center;
`

const EMOJI_SET = {
    lunch: "🍖",
    coffee: "👽☕",
    leaving: "🛫",
    default: "👽"
}

const getEmoji = (type) => EMOJI_SET[type]

const getCurrentTime = () => {
    const d = new Date(Date.now())
    return {
        hours: d.getHours(),
        minutes: d.getMinutes()
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this._time = getCurrentTime()

        this.state = {
            background: this.getBackgroundColor(),
            currentEmoji: this.getTimeFor()
        }

        this.updateBackgroundColor = this.updateBackgroundColor.bind(this)
        this.updateEmoji = this.updateEmoji.bind(this)

        this._rif = requestIntervalFrame(() => {
            this._time = getCurrentTime()
            this.updateBackgroundColor()
            this.updateEmoji()
        })
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this._rif)
    }

    getBackgroundColor() {
        const hour = this._time.hours
        const L_MIN = 10
        const L_MAX = 80
        let l = 80

        // TODO: make this return different colors based on the time

        return `hsl(198, 70%, ${l}%)`
    }

    getTimeFor() {
        const time = this._time
        let type

        if ((time.hours === 10 && time.minutes <= 30)
        || (time.hours === 15 && time.minutes <= 25)) {
            type = 'coffee'
        } else if (time.hours === 17 && time.minutes >= 20) {
            type = 'leaving'
        } else if (time.hours === 12 && time.hours < 1) {
            type = 'lunch'
        } else {
            type = 'default'
        }

        return getEmoji(type)
    }

    updateBackgroundColor() {
        let state = { ...this.state }
        state.background = this.getBackgroundColor()
        this.setState({ ...state })
    }

    updateEmoji() {
        let state = { ...this.state }
        state.currentEmoji = this.getTimeFor()
        this.setState({ ...state })
    }

    render() {
        return (
            <div className={ appStyle } style={ { backgroundColor: this.state.background } }>
                <div className={ emojiStyle }>
                    { this.state.currentEmoji }
                </div>
            </div>
        )
    }
}

export default App