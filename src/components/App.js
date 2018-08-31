import React from 'react'
import { css } from 'emotion'
import { requestIntervalFrame } from '../utils/timers'

const appStyle = css`
    box-sizing: border-box;
    height: 100%;
`

const emojiStyle = css`
    font-size: 24vw;
    margin: 0 auto;
    max-width: 800px;
    text-align: center;

    @media (min-width: 860px) {
        font-size: 13em;
    }
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

        this._rif = requestIntervalFrame(() => {
            this._time = getCurrentTime()
            this.setState({
                background: this.getBackgroundColor(),
                currentEmoji: this.getTimeFor()
            })
        })
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this._rif)
    }

    getBackgroundColor() {
        const L_MIN = 10
        const L_MAX = 80

        let time = Math.round(this._time.hours + (this._time.minutes / 60))
        let lAmount = Math.abs(12 - time)
        let l = L_MAX - (((L_MAX - L_MIN) / 12) * lAmount)

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
        } else if (time.hours === 12 && time.hours < 13) {
            type = 'lunch'
        } else {
            type = 'default'
        }

        return getEmoji(type)
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