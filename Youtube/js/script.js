///////////////////////////////Convert section - processing//////////////////////////////////////////////////
function processInput(input) {
    var letterA = "أ".charCodeAt(0);
    var letterz = "ي".charCodeAt(0);
    var search = input;
    var processed = "";
    // console.log("YouTube: ");
    // console.log(search);
    for (var i = 0; i < search.length; i++) {
        if (search[i] == ' ')
            processed += search[i] = '+';
        else if ((search[i].charCodeAt(0) >= 65) && (search[i].charCodeAt(0) <= 90 || search[i].charCodeAt(0) >= 97) && (search[i].charCodeAt(0) <= 122) || ((search[i].charCodeAt(0) >= letterA) && (search[i].charCodeAt(0) <= letterz)))
            processed += search[i];
        else {
            var decimalchar = search[i].charCodeAt(0);
            processed += "%" + tohexa(decimalchar);
        }
    }
    return processed;
}
function tohexa(symbols) {
    var number = symbols;
    var remains = 0;
    var deleter = 0;
    var ans = [];
    ans.length = 30;
    var i = 0;
    // console.log(symbols);
    do {
        remains = number / 16;
        deleter = Math.floor(number / 16);
        remains = remains - deleter;
        ans[i] = Math.floor(remains * 16);
        number = deleter;
        i++;
    } while (number != 0);
    i--;
    var hexasym = "";
    for (i; i >= 0; i--) {
        if (ans[i] < 10)
            hexasym += ans[i];

        else if (ans[i] === 10)
            hexasym += "A";

        else if (ans[i] === 11)
            hexasym += "B";

        else if (ans[i] === 12)
            hexasym += "C";

        else if (ans[i] === 13)
            hexasym += "D";

        else if (ans[i] === 14)
            hexasym += "E";

        else if (ans[i] === 15)
            hexasym += "F";
        else {
            console.log("some thing went wrong while convert to hexadecimal");
            return "+";
        }
    }
    return hexasym;
}
///////////////////////////////Open Section - inhtml//////////////////////////////////////////////////

function showURLText(type) {
    if (window.lastType == type) {
        atGlobal.sameBt = true;
    }
    else if (window.lastType != type || window.lastType == "none") {
        atGlobal.sameBt = false;
    }
    if (type === "Download") {
        atGlobal.dbt = true;
        atGlobal.obt = false;
    }
    else if (type == "Open") {
        atGlobal.dbt = false;
        atGlobal.obt = true;
    }

    var urlText = document.querySelector("#URLText");
    if (atGlobal.URLBoxShownAlready && atGlobal.sameBt) {
        urlText.style.display = "none";
        atGlobal.URLBoxShownAlready = false;
        dButton(true);//true means hide
    }
    else {
        atGlobal.showURLBoxNow = false;
        urlText.style.display = "block";
        atGlobal.URLBoxShownAlready = true;
        dButton(false);//false means show
    }
    window.lastType = type;
}
function dButton(showOrHide) {
    var URLButton = document.querySelector('.dbt');
    var OpenButton = document.querySelector('#obt');
    if (atGlobal.dbt && !atGlobal.obt) {
        if (showOrHide) {//download button hide
            URLButton.style.display = "none";
            atGlobal.connect = showOrHide;
        }
        else {//download button show
            if (atGlobal.index < 2) { atGlobal.index++ }
            OpenButton.style.display = "none";
            URLButton.style.display = "block";
            atGlobal.connect = showOrHide;
            if (atGlobal.index < 2) { mksure(1); }
        }
    }
    else if (!atGlobal.dbt && atGlobal.obt) {
        if (showOrHide) {//open button
            OpenButton.style.display = "none";
        }
        else {
            URLButton.style.display = "none";
            OpenButton.style.display = "block";
        }
    }
}
function openfunc() {
    var URLButtonText = document.querySelector('#URLText').value;
    let checker = [];
    'https://www.youtube.com/'
    checker = URLButtonText.split('/')
    if (checker[2] == 'www.youtube.com') {
        var videoCode2 = [];
        videoCode2 = URLButtonText.split('&');
        var videoCode = [];
        videoCode = videoCode2[0].split('=');
        openiframe("openIframe", videoCode[1]);
    }
    else if (checker[2] == "youtu.be") {
        openiframe("openIframe", checker[3]);
    }
}
function downloadbutton() {
    var URLButtonText = "download?URL=" + document.querySelector('#URLText').value;
    // console.log(URLButtonText)
    // console.log(URLButtonText);
    if (URLButtonText != "") {
        var i = "index";
        download(URLButtonText, i);
    }

}
function downloadbutton2(i) {
    var URLButtonText = 'download?URL=https://www.youtube.com/watch?v=' + youtubeDt.videoID[i];
    // console.log(URLButtonText)
    var i = "index";
    download(URLButtonText, i);
}
///////////////////////////////Show Loading//////////////////////////////////////////////////
function showloading() {
    document.querySelector("#videosContainer").style.display = "block";
    document.querySelector("#videosContainer").innerHTML = '<div id="looding-icon"></div>';
}
///////////////////////////////Connect Server - processing//////////////////////////////////////////////////
function getdata(dataSource, type, route) {
    // console.log(route);
    var request = new XMLHttpRequest;
    request.open("GET", dataSource, true);
    request.send(null);
    if (route == "mainroute")
        showloading();

    getResponse(request, type, route);
}
function getResponse(request, type, route) {
    request.onreadystatechange = function () {
        if (request.status == 200 && request.readyState == 4) {
            if (type == "json") { responseText = JSON.parse(request.responseText); dtOutput(responseText, type); }
            else if (type == "json" && route == "dtonly") { atGlobal.visitCount = JSON.parse(request.responseText); }
            else if (type == "html" || type == "text") { responseText = request.responseText; dtOutput(responseText, type); }
            //console.log(responseText);
            var data = window.data;
            dtOutput(responseText, type, route);
            //console.log(request);
            return request;
        }
        if(route == "mainroute"){
            if (request.status == 408) {
                document.querySelector("#videosContainer").innerHTML = "<h2>ERROR CODE: " + request.status + "<br> Response TimeOut</h2>";
            }
            else if (request.status == 500) {
                document.querySelector("#videosContainer").innerHTML = "<h2>ERROR CODE: " + request.status + "<br> Server Error</h2>";
            }
            else if (request.status == 403) {
                document.querySelector("#videosContainer").innerHTML = "<h2>ERROR CODE: " + request.status + "&nbsp;&nbsp;Forbidden<br>Google Quota End For Today Try to <mark>click search on Youtube</mark> Above, sorry for that but it's my limitation</h2>";
            }
            else{
                if(request.status != 0)
                document.querySelector("#videosContainer").innerHTML = "<h2>ERROR CODE: " + request.status + "&nbsp;&nbsp;Some thing Went Wrong "+"</h2>";
                else if(request.status == 200)
                {
                    document.querySelector("#videosContainer").innerHTML = "<h2>NO Error on connection site May be broken refresh please!</h2>";
                }
                else
                document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>&nbsp;&nbsp;Some thing Went Wrong<br>- You are may be not connected -</h2>";
            }
        }
    }
}
///////////////////////////////Processing Data - processing//////////////////////////////////////////////////
function dtOutput(data, type, route) {
    if (type == "json" && route == "mainroute") {
        window.youtubeDt = new Object;
        youtubeDt.thumbnail = [];
        youtubeDt.videoID = [];
        youtubeDt.videoTitle = [];
        youtubeDt.channelTitle = [];
        youtubeDt.date = [];
        youtubeDt.time = [];
        youtubeDt.playListID = [];
        youtubeDt.duration = [];
        for (var i = 0; i < 5; i++) {
            youtubeDt.fill = "done";
            youtubeDt.videoID[i] = data.items[i].id.videoId;
            //if i setup it correctly in css no need for it but it will help the reducing amount of data usage
            //in moile mode
            if ((innerWidth >= 960))
                //the big one
                youtubeDt.thumbnail[i] = data.items[i].snippet.thumbnails.medium.url;
            else {
                //the small one
                youtubeDt.thumbnail[i] = data.items[i].snippet.thumbnails.default.url;
            }
            youtubeDt.videoTitle[i] = data.items[i].snippet.title;
            youtubeDt.channelTitle[i] = data.items[i].snippet.channelTitle;
            youtubeDt.date[i] = data.items[i].snippet.publishedAt.split('T')[0];
            youtubeDt.time[i] = data.items[i].snippet.publishedAt.split('T')[1].replace("Z", "");
            youtubeDt.playListID[i] = data.items[i].id.playlistId;
            // console.log(youtubeDt.videoTitle[i]);
        }
        //console.log(route);
        getdata("html/search.html", "html", "mainroute");
    }
    else if (type == "html" && route == "mainroute") {
        window.html = new Object;
        html.dt = data;
        builder();
    }
    else if (type == "json" && route == "second") {

        if (data.items[0].contentDetails.duration != undefined) {
            youtubeDt.duration[atGlobal.index2] = data.items[0].contentDetails.duration;
            if (atGlobal.index2 < atGlobal.vArr.length) { getDuration(); }
            else {
                processDuration("both");
            }
            //console.log(youtubeDt.duration);
        }

    }
}
function processDuration(isitbuild) {
    if (isitbuild == "build" || isitbuild == "both") {
        for (let i in youtubeDt.duration) {
            var something = youtubeDt.duration[i];
            something = something.replace("PT", "");
            something = something.replace("H", "_");
            something = something.replace("M", "_");
            something = something.replace("S", "_");
            let time = something;
            time = time.split('_');
            time = time.filter(el=>el);
            time = time.map(el => {
                return (+el<10?`0${el}`:el);
            });
            time = time.join(':');
            youtubeDt.duration[i] = time;
            //console.log(time);
        }
    }
    if (isitbuild == "show" || isitbuild == "both") {
        for (var i in atGlobal.vArr) {
            var ii = parseInt(i) + 1;
            let vDuration = document.querySelector(".v" + atGlobal.vArr[i]);
            //console.log(atGlobal.vArr[i]);
            //console.log(i);
            vDuration.textContent = youtubeDt.duration[ii];
            
        }
    }
    //console.log(youtubeDt.duration);
}
///////////////////////////////Vidoeos Container - inhtml//////////////////////////////////////////////////
function builder() {
    if (window.lock) {
        var listindex = 0;
        var totalHtml = "";
        var htmlitself = html.dt;
        for (let i in youtubeDt.videoTitle) {
            var holder = htmlitself;
            holder = holder.replace(new RegExp("{{videoTitle}}", "g"), youtubeDt.videoTitle[i]);
            if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] == undefined)//channel
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i]+ '" class = "channel"');
            else if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] != undefined) {//playlist
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class="videoIcon"');
                atGlobal.list[listindex] = i
                listindex++;
            }
            else {//Videos and any thing else
                atGlobal.vArr[atGlobal.vIndex] = i;
                atGlobal.vIndex++;
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "videoIcon Duration v"' + atGlobal.vIndex);
            }
            holder = holder.replace(new RegExp("{{vindex}}", 'g'), i);
            holder = holder.replace(new RegExp("{{index}}", 'g'), i);
            holder = holder.replace(new RegExp("{{date}}", "g"), youtubeDt.date[i]);
            holder = holder.replace(new RegExp("{{channel}}", "g"), youtubeDt.channelTitle[i]);
            holder = holder.replace(new RegExp("{{downloadLink}}", "g"), "");
            // console.log(window.youtubeDt.videoTitle[i]);
            totalHtml += holder;
        }
        window.totalHtml = new Object;
        window.totalHtml = totalHtml;
        document.querySelector("#videosContainer").innerHTML = totalHtml;
        for (var i in atGlobal.list) {
            let listsign = document.querySelector(".listsign" + atGlobal.list[i]);
            if (listsign != null) {
                listsignst = listsign.style;
                listsignst.display = "block";
                listsignst.position = "absolute";
                listsignst.left = "0px";
                listsignst.top = "0px";
                listsignst.fontSize = "2vw";
                listsignst.zIndex = "12";
                listsignst.backgroundColor = "black";
                listsignst.opacity = "50%"
                listsignst.height = "20%";
                listsignst.width = "15%";
                listsignst.padding = "1%";
                listsignst.borderRadius = " 0 0 1vw 0";
            }
        }
        getDuration();
        // console.log(totalHtml);
        window.lock = false;
    }
}
function getDuration() {
    youtubeAPI2 = 'https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + youtubeDt.videoID[atGlobal.vArr[atGlobal.index2]] + '&key=AIzaSyB6MotaWQKv2-yljeI68UhM2X2x_iMRyB4';
    atGlobal.index2++;
    getdata(youtubeAPI2, "json", "second");

}
///////////////////////////////Open Iframe - inhtml//////////////////////////////////////////////////
function openiframe(i, vCode) {
    if (i >= 0) {
        if ((youtubeDt.videoID[i]) != undefined) {
            showloading();
            iframe = '<iframe id="waiting" src="https://www.youtube.com/embed/' + youtubeDt.videoID[i] + '"?rel="0" frameborder="0" allowfullscreen></iframe>';
            document.querySelector("#videosContainer").innerHTML = iframe + '<br>' + ' <button style="display:block;"  class="down dbt"><span id="download">Download</span></button>' + "<hr>" + totalHtml;
            var redirect = document.createElement('a');
            redirect.href = "#openplace";
            redirect.click();
            redirect.remove();
            mksure(2, i);
        }
        else if (youtubeDt.playListID[i] != undefined) {
            var channel = "https://www.youtube.com/playlist?list=" + youtubeDt.playListID[i];
            var a = document.createElement('a');
            a.style.display = "none"
            a.href = channel;
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            var channel = "https://www.youtube.com/results?search_query=" + processInput(youtubeDt.channelTitle[i]);
            var a = document.createElement('a');
            a.style.display = "none"
            a.href = channel;
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    else if (i == "openIframe") {
        showloading();
        iframe = '<iframe id="waiting" style="display:block;" src="https://www.youtube.com/embed/' + vCode + '"?rel="0" frameborder="0" allowfullscreen></iframe>';
        document.querySelector("#videosContainer").innerHTML = iframe + "<hr>";
    }
    processDuration("show");
}
///////////////////////////////Make Sure Server Connected//////////////////////////////////////////////////
function mksure(i, ii) {
    // window.outPut = false;
    // console.log(ii);
    let waiting = fetch(atGlobal.IP());
    waiting.then(res => {
        if (res.status == 404) {
            window.outPut = true;
            if (i == 1) {
                showbtnDown1();
            }
            else {
                showbtnDown2(ii);
            }
        }
    });
}
function showbtnDown1() {
    // console.log(atGlobal.connect);
    if (atGlobal.dbt && !atGlobal.obt && !atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:block;');
    }
    else if (atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:none;');
    }
    else if (!atGlobal.dbt && atGlobal.obt && !atGlobal.connect) {
        btnDownload = document.querySelectorAll('.down');
        btnDownload[0].setAttribute('onclick', "downloadbutton()");
        btnDownload[0].setAttribute('style', 'opacity:100%;cursor:pointer;display:none;');
    }
}
function showbtnDown2(ii) {
    btnDownload = document.querySelectorAll('.down');
    btnDownload[1].setAttribute('onclick', "downloadbutton2(" + ii + ")");
    btnDownload[1].setAttribute('style', 'opacity:100%;cursor:pointer;display:block;');

}
///////////////////////////////Download - processing//////////////////////////////////////////////////
function download(url, i) {
    // console.log(mksure(url));
    // window.location.href = 'http://192.168.1.2:4000/download?URL=' + url;
    let a = document.createElement('a');
    //console.log(atGlobal.IP() + url);
    a.href = atGlobal.IP() + url;
    a.target = '_blanck';
    a.click();
    a.remove();
}
///////////////////////////////////////////Dark Mode Switch//////////////////////////////////////////////////

//DarkMode Control System
function DMCS(where) {
    //check the last session darkmode if on or of
    //console.log(localStorage.D);
    if (localStorage.D == undefined)
        localStorage.setItem("D", false);
    if (where == 0) {
        let k = localStorage.getItem("D");
        if(k=='true')
        atGlobal.onOROffDark = false;
        else
        atGlobal.onOROffDark = true;
    }
//turning on or off the darkmode
    let dmode = document.querySelector('#dmode1');
    if (atGlobal.onOROffDark) {//this is (on) don't care with the name dmodeoff i badly named them 
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOff");
        // console.log(atGlobal.onOROffDark);
        button.setAttribute('class', "dmodeOff");
        dmode.setAttribute('href', 'css/CFEWSFC-D.css');
        localStorage.setItem("D", false);
        atGlobal.onOROffDark = false;
    }
    else {//off
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOn");
        // console.log(atGlobal.onOROffDark);
        button.setAttribute('class', "dmodeOn");
        dmode.setAttribute('href', 'css/CFEWSFC-L.css');
        localStorage.setItem("D", true);
        atGlobal.onOROffDark = true;
    }

}
////////////////////////////////Settings Icon - inhtml/////////////////////////////
let ul = document.querySelector('ul');
function showul() {
    ul.focus();
    button = document.querySelector('#darkmode');
    let el = document.querySelector('svg');
    el.style.transition = "250ms ease-out";
    if (atGlobal.showul) {
        button.setAttribute('style','cursor:pointer;')
        button.setAttribute('onclick', 'DMCS(1)');
        ul.setAttribute('style', 'opacity:100%;');
        atGlobal.showul = false;
        el.style.transform = "rotate(90deg)";
    }
    else {
        el.style.transform = "rotate(0deg)";
        ul.removeAttribute('style');
        button.removeAttribute('onclick');
        button.removeAttribute('style');
        atGlobal.showul = true;
    }
}

function hideul() {
    let ul = document.querySelector('ul');
    ul.setAttribute('style', 'opacity:0%;');
    atGlobal.showul = true;
}
///////////////////////////////////////////MAIN FUNCTION//////////////////////////////////////////////////
var main = (function (event) {
    window.atGlobal = {
        Data: "Do You want to show these elements below ?",
        obt: true,
        dbt: true,
        sameBt: false,
        showURLBoxNow: true,
        //////////////////////////////
        URLBoxShownAlready: false,
        /////////server-address///////////
        IP: () => {
            let address = null;
            let add = window.origin;
            if (add.includes(":")) {
                address = add.replace(":5500", ":4000") + "/";
            }
            else
                console.error("No Download Server Found!");
            return address;
        },
        index: 0,
        connect: false,
        onOROffDark: false,
        showul: true,
        list: [],
        vIndex: 0,
        vArr: [],
        index2: 0,
        visitCount: 0,

    }
    DMCS(0);
    console.log("This Site uses %cYoutube %cAPI!", "color:red;", "color:auto background:f2dd00;");
    document.querySelector("#youtubeSearchBox").focus();
    ul.addEventListener("blur", (event) => { if (atGlobal.showul) { atGlobal.showul = false; showul(); } });
    window.outPut = new Object;
    window.outPut = false;
    window.lastType = new Object;
    window.lastType = "none";
    youtubeDt = new Object;

    document.querySelector("#youtubeSearchBox").addEventListener("input",
        (event) => {
            if (document.querySelector("#youtubeSearchBox").value[0]) {
                let a = "أ".charCodeAt(0);
                let z = "ي".charCodeAt(0);

                let char = document.querySelector("#youtubeSearchBox").value[0];
                let searchBox = document.querySelector("#youtubeSearchBox").style;
                if (char.charCodeAt(0) >= a && char.charCodeAt(0) <= z) {
                    searchBox.direction = "rtl";
                }
                else
                    searchBox.direction = "ltr";
            }
        });
    document.querySelector('#youtubeSearchBox').addEventListener("keypress", getSearchcontent);
    function getSearchcontent(event) {
        var h1_1 = document.querySelector(".collapsed");
        if (h1_1 && (document.querySelector("#youtubeSearchBox").value == null || document.querySelector("#youtubeSearchBox").value == undefined)) {
            h1_1.animation = "800ms ease-out hideIcon forwards";
            h1_1.removeAttribute("class");
        }

        if (document.querySelector("#youtubeSearchBox").value != "") {
            window.lock = new Object;
            youtubeDt.fill = "null"
            // console.log(youtubeDt);
            lock = true;
            if (event.key == 'Enter') {
                var getSearchBox;
                var link = "https://www.youtube.com/results?search_query=";
                // console.log("YouTube: ");
                getSearchBox = document.querySelector('#youtubeSearchBox').value;
                // console.log(search);
                var processedSearch = processInput(getSearchBox);
                var a = document.querySelector("#openplace > a");
                var h1 = document.querySelector(".lable").style;
                var searchBox = document.querySelector("#youtubeSearchBox").style;
                a.setAttribute("href", link + processedSearch);
                a.setAttribute("target", "_blank");
                // console.log(search);
                if (getSearchBox) {
                    searchBox.position = "relative";
                    h1.animation = "800ms ease-out hideIcon forwards";
                    h1.position = "relative";
                    h1.top = "0px";
                    document.querySelector("h1").setAttribute("class", "collapsed");
                }
                // console.log(processedSearch);
                var youtubeAPI = "https://youtube.googleapis.com/youtube/v3/search?videoDuration=any&q=" + processedSearch + "&key=AIzaSyB6MotaWQKv2-yljeI68UhM2X2x_iMRyB4&part=id,snippet";
                var tryy = "data/data2.json";
                getdata(youtubeAPI, "json", "mainroute");
                // getdata(tryy, "json", "mainroute");
                // console.log(link);
            }
        }
    }
})();