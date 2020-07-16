function getJsonObject(cb) {
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://opel22.github.io/CustomWidgets/snippet/year.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            try {
                cb(JSON.parse(request.responseText));
            }
            catch (err) {
                cb(err);
            }
        }
    };
}
