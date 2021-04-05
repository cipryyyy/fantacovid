exports.hour = function() {
    let date = new Date();
    return date.getHours();
}

exports.minute = function() {
    let date = new Date();
    return date.getMinutes();
}
exports.second = function() {
    let date = new Date();
    return date.getSeconds();
}
