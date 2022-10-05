///////////////////////////////Convert section - processing//////////////////////////////////////////////////
function processInput(input) {
    var letterA = "أ".charCodeAt(0);
    var letterz = "ي".charCodeAt(0);
    var search = input;
    var processed = "";
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
    var URLButtonText = document.querySelector('#URLText').value;
    if (URLButtonText != "") {
        var i = "index";
        download(URLButtonText, i);
    }

}
function downloadbutton2(i) {
    var URLButtonText = 'https://www.youtube.com/watch?v=' + youtubeDt.videoID[i];
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
    var request = new XMLHttpRequest;
    request.open("GET", dataSource);
    request.send(null);
    if (route == "mainroute")
        showloading();
    getResponse(request, type, route);
} 
function getResponse(request, type, route) {
    request.onreadystatechange = function () {
        if (request.status == 200 && request.readyState == 4) {
            if (type == "json") { responseText = JSON.parse(request.responseText); dtOutput(responseText, type); }
            else if (type == "html" || type == "text") { responseText = request.responseText; dtOutput(responseText, type); }
            var data = window.data;
            dtOutput(responseText, type, route);
            return request;
        }
        else if (request.status == 408) {
            document.querySelector("#videosContainer").innerHTML = "<h2>" + request.status + "<br> Response TimeOut</h2>"
        }
        else if (request.status == 500) {
            document.querySelector("#videosContainer").innerHTML = "<h2>" + request.status + "<br> Server Error</h2>"
        }
        else if (request.status == 403) {
            document.querySelector("#videosContainer").innerHTML = "<h2>" + request.status + "&nbsp;&nbsp;Forbidden<br>Google Quota End For Today Try to <mark>click search on Youtube</mark> Above, sorry for that but it's my limitation</h2>"
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
        }
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
        }

    }
}
function processDuration(isitbuild) {
    if (isitbuild == "build" || isitbuild == "both") {
        for (let i in youtubeDt.duration) {
            var something = youtubeDt.duration[i];
            something = something.replace("PT", "");
            something = something.replace("H", ":");
            something = something.replace("M", ":");
            something = something.replace("S", "");
            youtubeDt.duration[i] = something;
        }
    }
    if (isitbuild == "show" || isitbuild == "both") {
        for (var i in atGlobal.vArr) {
            var ii = parseInt(i) + 1;
            let vDuration = document.querySelector(".v" + atGlobal.vArr[i]);
            vDuration.textContent = youtubeDt.duration[ii];
            if (vDuration != null) {
                vDuration = vDuration.style;
                vDuration.display = "block";
                vDuration.position = "absolute";
                vDuration.right = "0px";
                vDuration.bottom = "22px";
                vDuration.fontSize = "0.9vw";
                vDuration.zIndex = "12";
                vDuration.backgroundColor = "black";
                vDuration.opacity = "70%"
                vDuration.height = "max-content";
                vDuration.width = "max-content";
                vDuration.padding = "1%";
                vDuration.borderRadius = " 0.5vw";
            }
        }
    }
}
///////////////////////////////Vidoeos Container - inhtml//////////////////////////////////////////////////
function builder() {
    if (window.lock) {
        var listindex = 0;
        var totalHtml = "";
        var htmlitself = html.dt;
        for (var i = 0; i < 5; i++) {
            var holder = htmlitself;
            holder = holder.replace(new RegExp("{{videoTitle}}", "g"), youtubeDt.videoTitle[i]);
            if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] == undefined)//channel
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "channel"');
            else if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] != undefined) {//playlist
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class="videoIcon"');
                atGlobal.list[listindex] = i
                listindex++;
            }
            else {//Video and any thing else
                atGlobal.vArr[atGlobal.vIndex] = i;
                atGlobal.vIndex++;
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "videoIcon v"' + atGlobal.vIndex);
            }
            holder = holder.replace(new RegExp("{{vindex}}", 'g'), i);
            holder = holder.replace(new RegExp("{{index}}", 'g'), i);
            holder = holder.replace(new RegExp("{{date}}", "g"), youtubeDt.date[i]);
            holder = holder.replace(new RegExp("{{channel}}", "g"), youtubeDt.channelTitle[i]);
            holder = holder.replace(new RegExp("{{downloadLink}}", "g"), "");
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
        window.lock = false;
    }
}
function getDuration() {
    youtubeAPI2 = 'https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + youtubeDt.videoID[atGlobal.vArr[atGlobal.index2]] + '&key=AIzaSyDx7oiZ8o_IcUgCROckiJ7B4_XvNx0Z9ws';
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
            var channel = "https://www.youtube.com/watch?v=0&list=" + youtubeDt.playListID[i];
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
    let waiting = fetch(atGlobal.IP + 'https://www.youtube.com/watch?v=06h470AiBZ4');
    waiting.then(res => {
        if (res.status == 200) {
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
    let a = document.createElement('a');
    a.href = atGlobal.IP + url;
    a.target = '_blanck';
    a.click();
    a.remove();
}
///////////////////////////////////////////Dark Mode Switch//////////////////////////////////////////////////
function dmodeSwitch() {
    let dmode = document.querySelector('#dmode1');
    if (atGlobal.onOROffDark) {//this on don't care with dmodeoff i badly named them 
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOff");
        atGlobal.onOROffDark = false;
        button.setAttribute('class', "dmodeOff");
        dmode.setAttribute('href', 'css/CFEWSFC-D.css');
    }
    else {//off
        ball = document.querySelector('#ball');
        button = document.querySelector('#darkmode');
        ball.setAttribute('class', "dmodeBallOn");
        atGlobal.onOROffDark = true;
        button.setAttribute('class', "dmodeOn");
        dmode.setAttribute('href', 'css/CFEWSFC-L.css');
    }
}
////////////////////////////////Settings Icon - inhtml/////////////////////////////
function showul() {
    let ul = document.querySelector('ul');
    let el = document.querySelector('svg');
    el.style.transition = "250ms ease-out";
    if (atGlobal.showul) {
        ul.setAttribute('style', 'display:block');
        atGlobal.showul = false;
        el.style.transform = "rotate(90deg)";
    }
    else {
        el.style.transform = "rotate(0deg)";
        ul.setAttribute('style', 'display:none');
        atGlobal.showul = true;
    }
}
function hideul() {
    let ul = document.querySelector('ul');
    ul.setAttribute('style', 'display:none');
    atGlobal.showul = true;
}
///////////////////////////////////////////MAIN FUNCTION//////////////////////////////////////////////////
var main = (function (event) {
    console.log("this site purpose not to browse channels or to browse YouTube if you wanna just open YouTube it's make for those want to focus and don't want to be distract by YouTube ads and YouTube suggestion also I made it to try what I learned in javascript and hope it works well , this site doesn't open channel or playlist but it does open YouTube videos also searchs on YouTube , Download YouTube video for offline watching and it's liter than Youtube in data usage while searching.Note:while watching videos it uses as much as the video on YouTube uses in data");
    console.log("This Site Will Never Replace YouTube!")
    window.atGlobal = {
        Data: "Do You want to show these elements below ?",
        obt: true,
        dbt: true,
        sameBt: false,
        showURLBoxNow: true,
        //////////////////////////////
        URLBoxShownAlready: false,
        /////////server-IP///////////
        IP: 'http://192.168.1.9:4000/download?URL=',
        index: 0,
        connect: false,
        onOROffDark: false,
        showul: true,
        list: [],
        vIndex: 0,
        vArr: [],
        index2: 0
    }
    window.outPut = new Object;
    window.outPut = false;
    window.lastType = new Object;
    window.lastType = "none";
    youtubeDt = new Object;
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
            lock = true;
            if (event.key == 'Enter') {
                var getSearchBox;
                var link = "https://www.youtube.com/results?search_query=";
                getSearchBox = document.querySelector('#youtubeSearchBox').value;
                var processedSearch = processInput(getSearchBox);
                var a = document.querySelector("#openplace > a");
                var h1 = document.querySelector("h1").style;
                var searchBox = document.querySelector("#youtubeSearchBox").style;
                a.setAttribute("href", link + processedSearch);
                a.setAttribute("target", "_blank");
                if (getSearchBox) {
                    searchBox.position = "relative";
                    h1.animation = "800ms ease-out hideIcon forwards";
                    h1.position = "relative";
                    h1.top = "0px";
                    document.querySelector("h1").setAttribute("class", "collapsed");
                }
                var youtubeAPI = "https://youtube.googleapis.com/youtube/v3/search?videoDuration=any&q=" + processedSearch + "&key=AIzaSyCbzG1LFPCu4yabkfEMqaxKh_Rx-qIHSOk&part=id,snippet";
                getdata(youtubeAPI, "json", "mainroute");
            }
        }
    }
})();