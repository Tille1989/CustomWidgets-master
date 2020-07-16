function fillTable () {
    var myTable = document.getElementById("myTable");
    myTable.rows[5].cells[6].innerHTML = '23';   
};

function getJsonObject(cb){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://opel22.github.io/CustomWidgets/snippet/year.json', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');

                   try {
                     cb(JSON.parse(request.responseText);
                   }catch(err) {
                     cb(err);
                   }
        }
    }
}

function yearLoad (function(object){
    //Do what you want with the object here
    console.log(object);
};