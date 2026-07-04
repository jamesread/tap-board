// Source: https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

// Adapted from: https://github.com/sindresorhus/screenfull.js/
export function fullscreen() {
	document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

	if (!document.fullscreenEnabled) {
		alert("It seems that going fullscreen is not allowed by your device. ");
		document.querySelector('#fullscreenButton').style.backgroundColor = "red";
		return;
	}

	var element = document.body.parentElement;

	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}
}

export function closeMenu() {
	alert("Refresh the page to get the menu back");
	document.querySelector('#menu').style.display = "none";
}
