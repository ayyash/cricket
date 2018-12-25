
function _debug(o, message, type) {
	if (window._indebug) {
		if (window.console) {
			type == "e" ? window.console.error(message, o) : window.console.info("%c " + message, "background: #222; color: #bada55", o);
		}
    }
    return o;
}

