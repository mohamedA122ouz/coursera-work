// global variables/////////////////////////////////////////////////
var allresponse = { index: 1 };
var mainArea = document.querySelector('.content');
var mainArea1 = document.querySelector('.content').innerHTML;
const defaultValues = [4, 3.67, 3.33, 3, 2.67, 2.33, 2];
let [A, Am, Bp, B, Cp, C, D] = [];
if(!localStorage.gValues)
[A, Am, Bp, B, Bm, Cp, C, D] = defaultValues
function restoreValues(){
    if(localStorage.getItem("lastGPA")){
        document.querySelector('.ans').textContent = localStorage.getItem("lastGPA");
    }
    let gradesFiled = document.querySelectorAll(".grade");
    if(localStorage.getItem("gValues")){
        let oldValues = localStorage.getItem("gValues").split(',');
        gradesFiled.forEach(
            (el,i)=>{
                el.value = parseFloat(oldValues[i]);
            }
        );
        let oldV = localStorage.getItem("gValues").split(',').map(el=>{
            return parseFloat(el);
        });
        [A, Am, Bp, B, Cp, C, D] = oldV;
    }
    else{
        gradesFiled.forEach(
            (el,i)=>{
                el.value = defaultValues[i];
            }
        );
    }
};
function clearOldValuesAndRestoreDefault(){
    localStorage.removeItem("gValues");
    resetDefaultValues();
    restoreValues();
    calc();
}
// console.log(mainArea);
function resetDefaultValues(){
    [A, Am, Bp, B, Bm, Cp, C, D] = defaultValues;
}
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
    restoreValues();
}
//set grades
function setGrades(){
    let newValues = [];
    let gradesFiled = document.querySelectorAll(".grade");
    gradesFiled.forEach(
        (el,i)=>{
            if(!isNaN(parseInt(el.value)))
            newValues.push(parseFloat(el.value));
            else{
                newValues.push(defaultValues[i]);
            }
        }
    );
    localStorage.setItem("gValues",newValues);
    [A, Am, Bp, B, Bm, Cp, C, D]  = newValues;
    calc();
}
function addatcum() {
    allresponse.index++;
    var newtable = '<div class="row col-md-5 col-sm-12 col-xs-12"><table><tr><th>GPA #' + allresponse.index + '</th><th>total Hours For GPA #' + allresponse.index + '</th></tr><tr><td><input type="text" placeholder="0" id="g' + allresponse.index + '"></td><td><input type="text" placeholder="0" id="h' + allresponse.index + '"></td></tr></table></div>';
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
    scrollToBottom();
}
function ifString(value) {
    if (isNaN(parseInt(value))) {
        // A,Am,Bp,B,Bm,Cp,C,D
        value = value.toUpperCase();
        return value === "A" ? A : value === "A-" ? Am : value === "B+" ? Bp : value === "B" ? B : value === "C+" ? Cp : value === "C" ? C : value === "D" ? D : 0;
    }
    else {
        return value;
    }
}
function calc() {
    var hours = [];
    var tHr = 0;
    var gpa = [];
    var top = 0;
    for (var i = 0; i < allresponse.index; i++) {
        hours[i] = document.querySelector('#h' + (i + 1)).value;
        gpa[i] = ifString(document.querySelector('#g' + (i + 1)).value);
        if (hours[i] == "")
            hours[i] = 0;
        tHr += parseInt(hours[i]);
        top += gpa[i] * hours[i];
    }
    if (tHr == 0)
        tHr = 1;
    // console.log(top / tHr);
    document.querySelector('.ans').textContent = (top / tHr);
    localStorage.setItem("lastGPA",(top/tHr));
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
////scrolltoBottom
function scrollToBottom(){
    let rootEl = document.querySelector(".root");
    rootEl.style.scrollBehavior = "smooth";
    rootEl.scrollTop = rootEl.scrollHeight;
    
}