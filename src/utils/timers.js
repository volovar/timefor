export function requestIntervalFrame(func, seconds = 1) {
    let last = 0
    let newReq

    function step(now) {
        if (typeof last === 'undefined' || now - last >= seconds * 1000) {
            last = now
            func(now)
        }

        newReq = window.requestAnimationFrame(step)
    }

    newReq = window.requestAnimationFrame(step)
    return newReq
}