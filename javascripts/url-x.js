window.url.current = new Object();
window.url.current.q = new Object();
window.url.current.q.getBool = (function (key, defaultValue) {
    var value = url('?' + key, window.location.href);
    switch (String(value).toLowerCase()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": return false;
        default: return defaultValue;
    }
});
window.url.current.q.getInt = (function (key, defaultValue) {
    var value = url('?' + key, window.location.href);
    var result = parseInt(value);
    if(isNaN(result))
    	result = defaultValue;
    return result;
});