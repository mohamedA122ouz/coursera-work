// global variables/////////////////////////////////////////////////
var allresponse = { index: 1 };
var mainArea = document.querySelector('.content');
var mainArea1 = document.querySelector('.content').innerHTML;
// console.log(mainArea);
// get cum GPA info and edite it
function getcum() {
    ajax("html/cum.html");
}
function replace() {
    // console.log(allresponse.res1);
    // console.log(mainArea);
    allresponse.res1.toString();
    allresponse.res1 = allresponse.res1.replace(RegExp('{{num}}', 'g'), '1');
    mainArea.innerHTML = allresponse.res1;
}
function addatcum() {
    allresponse.index++;
    var newtable = '<div class="row col-md-5 col-sm-12 col-xs-12"><table><tr><th>GPA #' + allresponse.index + '</th><th>total Hours For GPA #' + allresponse.index + '</th></tr><tr><td><input type="text" placeholder="0" pattern="^[0-9]$"id="g' + allresponse.index + '"></td><td><input type="text" placeholder="0" id="h' + allresponse.index + '"></td></tr></table></div>';
    newtable.replace(RegExp('{{num}}', 'g'), allresponse.index.toString());
    var hours = [];
    var gpa = [];
    for (var i = 0; i < (allresponse.index - 1); i++) {
        hours[i] = document.querySelector('#h' + (i + 1)).value;
        gpa[i] = document.querySelector('#g' + (i + 1)).value;
    }
    var rootel = document.querySelector('.root');
    rootel.innerHTML += newtable;
    for (var i = 0; i < (allresponse.index - 1); i++) {
        document.querySelector('#h' + (i + 1)).value = hours[i];
        document.querySelector('#g' + (i + 1)).value = gpa[i];
    }
}
function calc() {
    var hours = [];
    var tHr = 0;
    var gpa = [];
    var top = 0;
    for (var i = 0; i < allresponse.index; i++) {
        hours[i] = document.querySelector('#h' + (i + 1)).value;
        gpa[i] = document.querySelector('#g' + (i + 1)).value;
        if (hours[i] == "")
            hours[i] = 0;
        tHr += parseInt(hours[i]);
        top += gpa[i] * hours[i];
    }
    if (tHr == 0)
        tHr = 1;
    // console.log(top / tHr);
    document.querySelector('.ans').textContent = (top / tHr);

}
// get cur GPA info and edite//////////////////////////////////////////
function getcur() {
    ajax("html/cur.html");
}
function addatcur() {
    allresponse.index++;
    var newrow = '<tr><td><input type="text" placeholder="0" pattern="^[0-9]$"id="g' + allresponse.index + '"></td><td><input type="text" placeholder="0" id="h' + allresponse.index + '"></td></tr>';
    newrow.replace(RegExp('{{num}}', 'g'), allresponse.index.toString());
    var hours = [];
    var gpa = [];
    for (var i = 0; i < (allresponse.index - 1); i++) {
        hours[i] = document.querySelector('#h' + (i + 1)).value;
        gpa[i] = document.querySelector('#g' + (i + 1)).value;
    }
    var table = document.querySelector('table');
    table.innerHTML += newrow;
    for (var i = 0; i < (allresponse.index - 1); i++) {
        document.querySelector('#h' + (i + 1)).value = hours[i];
        document.querySelector('#g' + (i + 1)).value = gpa[i];
    }
}
///back home///////////////////////////////////////////////////////////
function home() {
    allresponse.index = 1;
    document.querySelector('.content').innerHTML = mainArea1;
}
// request/////////////////////////////////////////////////////////////
function ajax(place) {
    var response = null;
    const request = new XMLHttpRequest;
    request.open("GET", place, true);
    request.send(null);
    request.onreadystatechange = function returns() {
        if (request.readyState == 4 && request.status == 200) {
            response = request.responseText;
            // console.log(response);
            allresponse.res1 = response;
            replace();
        }
    }
}