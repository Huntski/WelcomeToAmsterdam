export function usingMobileUserAgent() {
    const mobileUserAgents = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']

    let isOnMobile = false

    mobileUserAgents.forEach(agent => {
        if (navigator.userAgent.match(/agent/i)) {
            isOnMobile = true
        }
    })

    return isOnMobile
}
