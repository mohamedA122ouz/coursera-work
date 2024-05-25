///////////////////////////////Convert section - processing//////////////////////////////////////////////////
let interval = null;
const injected = `<div class="details" onclick="openiframe({{index}})">
<div class="thumbnail">
    <div style="display: none;" class="listsign{{index}}">
        <svg class="listStyle" style="color:white"
            xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
    </div>
    <div class="v{{vindex}} duration"></div>
    <img {{thumbnail}} alt="{{videoTitle}}">
</div>
<div class="text">
    <span class="vTitle">
        {{videoTitle}}
    </span>
    <br>
    <span class="publishTime">{{date}}</span>
    <br>
    <div class="channelDetails">
    <img src="{{imgTh}}" alt="{{imgThName}}"/>
    <span class="channelName">{{channel}}</span>
    </div>
</div>
</div>`;
///////////////////////////////Open Section - inhtml//////////////////////////////////////////////////
const customError = 0x45;
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
class Emotion {
    static emojies = {
        sad: ['😣', '😓', '😢', '😭'],
        happy: ['😁', '😄', '😉', '😊', '😎', '🤩'],
        waiting: [['🤨', '🤔', '😒', '🥱', '😪', '😴'], ['👶🏾', '🧒🏾', '👦🏾', '🧑🏾', '👨🏾', '🧓🏾', '👴🏾'], ['🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦']],
        frasted: ['😐', '😑', '🙁', '☹', '😠', '😡', '🤬'],
        transition: ['😯'],
        E: ['💀','☠']
    };
    static #emojiElement = (emoji) => `<div style="font-size:32px;text-align:center;">${emoji}</div>`;
    static COOL = Emotion.emojies.happy[4];
    static STAR = Emotion.emojies.happy[5];
    static CRY = Emotion.emojies.sad[3];
    static THINKING = Emotion.emojies.waiting[0][1];
    static wink = Emotion.emojies.happy[2];
    static FRASTRATED = Emotion.emojies.frasted[5];
    static SLEEPY = Emotion.emojies.waiting[3];
    static SLEEPING = Emotion.emojies.waiting[5];
    static EXTREAM = 0x20;
    static HARD = 0x21;
    static MEDIUM = 0x22;
    static BASIC = 0x23;
    static FIRST = 0x24;
    static randomNumberInRange = (min, max) => parseInt(Math.random() * (max - min) + min);
    static feelingStrengthEmotion(emotion, feelingStrength) {
        let savedEmojie;
        if (emotion.includes("waiting")) {
            let num = parseInt(emotion);
            let numberLength = (num + "").length;
            try {
                savedEmojie = Emotion.emojies[emotion.substring(numberLength)];
                savedEmojie = savedEmojie[parseInt(emotion)];
                if (!savedEmojie)
                    throw "error";
            } catch {
                return Emotion.emojies.transition[0];
            }
        }
        else
            savedEmojie = Emotion.emojies[emotion]
        if (emotion !== "transition") {
            if (feelingStrength == this.EXTREAM) {
                return savedEmojie[savedEmojie.length - 1];
            } else if (feelingStrength == this.HARD) {
                return ((this.randomNumberInRange(0, 10)) % 2) ? savedEmojie[savedEmojie.length - 2] : savedEmojie[savedEmojie.length - 3];
            }
            else if (this.MEDIUM == feelingStrength) {
                let randomemojiIndex = this.randomNumberInRange(2, savedEmojie.length - 3);
                return savedEmojie[randomemojiIndex];
            }
            else if (this.BASIC === feelingStrength) {
                let randomemojiIndex = this.randomNumberInRange(0, 2);
                return savedEmojie[randomemojiIndex];
            }
            else if (this.FIRST === feelingStrength) {
                return savedEmojie[0];
            }
            else
                return savedEmojie[0];
        }
        return savedEmojie[0];
    }
    static randomEmotion(emotion) {
        let randomNum = this.randomNumberInRange(0, Emotion.emojies[emotion].length);
        return Emotion.emojies[emotion][randomNum];
    }
    static showLoading() {
        if(interval === null){

            let container = document.querySelector("#videosContainer");
            container.style.display = "block";
            let counter = 0;
            let i = -1;
            let chooseRandom = Emotion.randomNumberInRange(0, this.emojies["waiting"].length);
            interval = setInterval(() => {
                i = (++i) % (this.emojies["waiting"][chooseRandom].length);
                container.innerHTML = Emotion.#emojiElement(this.emojies["waiting"][chooseRandom][i]);
                if (i === 0) {
                    counter++;
                }
                if (counter === 4 && i == (this.emojies["waiting"].length - 2)) {
                    container.innerHTML = this.#emojiElement(Emotion.FRASTRATED);
                }
                else if (counter === 4 && i == (this.emojies["waiting"].length - 1)) {
                    clearInterval(interval);
                    showloading();
                }
            }, 700);
        }
    }
    static stopLoadingemoji(emoji) {
        return new Promise((acc, rej) => {
            if (interval !== null) {
                let container = document.querySelector("#videosContainer");
                clearInterval(interval);
                interval = null;
                if (emoji) {
                    container.innerHTML = this.#emojiElement(emoji);
                }
            }
            setTimeout(() => {
                acc();
            }, 500);
        })
    }
}
///////////////////////////////Connect Server - processing//////////////////////////////////////////////////
async function showError(status) {

    // await Emotion.stopLoadingemoji(Emotion.randomEmotion("sad"));
    if (status == 408) {
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("transition"));
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "<br> Response TimeOut ⏰</h2>";
    }else if(status === customError){
        await Emotion.stopLoadingemoji(Emotion.emojies.transition[0]);
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>😵‍💫No results found 🫗<br>(Contact the Admin to check whether it is an error😥)</h2>";
    }
    else if (status == 500) {
        await Emotion.stopLoadingemoji(Emotion.emojies.E[0]);
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "<br> Server Error 🛠</h2>";
    }
    else if (status == 403) {
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("frasted",Emotion.EXTREAM));
        document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "&nbsp;&nbsp;Forbidden<br>Google Quota End For Today Try to <mark>click search on Youtube</mark> Above, sorry for that but it's my limitation</h2>";
    }
    else {
        if (status != 0 && status != 200){
            await Emotion.stopLoadingemoji(Emotion.THINKING);
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>ERROR CODE: " + status + "&nbsp;&nbsp;Some thing Went Wrong " + "</h2>";
        }
        else if (status == 200) {
            await Emotion.stopLoadingemoji(Emotion.emojies.E[1]);
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>Sorry😢 it's not you it is us 😔this site is broken right now😖 try again later🛠</h2>";
        }
        else{
            await Emotion.stopLoadingemoji(Emotion.randomEmotion("sad"));
            document.querySelector("#videosContainer").innerHTML = "<h2 style='text-align:center;'>Cannot Connect Server ✂🔗</h2>";
        }
    }

}

async function getdata(url, type, route) {
    // showloading();
    Emotion.showLoading();
    try {
        let data = await fetch(url);
        if (data.status === 200) {
            data = await data.json();
            dtOutput(data, type, route);
        }
        else
            showError(data.status);
    } catch (ex) {
        console.log(ex);
        showError(0);
    }
}

///////////////////////////////Processing Data - processing//////////////////////////////////////////////////
async function dtOutput(data, type, route) {
    console.log(data);
    if(data.items.length === 0){
        showError(customError);
    }
    else if (type == "json" && route == "mainroute") {
        window.youtubeDt = new Object;
        youtubeDt.thumbnail = [];
        youtubeDt.videoID = [];
        youtubeDt.videoTitle = [];
        youtubeDt.channelTitle = [];
        youtubeDt.date = [];
        youtubeDt.time = [];
        youtubeDt.playListID = [];
        youtubeDt.duration = [];
        youtubeDt.channelImg = [];
        for (let i in data.items) {
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
            try {
                youtubeDt.duration[i] = data.items[i].contentDetails.duration;
                // youtubeDt.date[i] = data.items[i].snippet.publishedAt.split('T')[0];
                // youtubeDt.time[i] = data.items[i].snippet.publishedAt.split('T')[1].replace("Z", "");
                youtubeDt.channelImg[i] = data.items[i].channelImg;
                throw "er";
            } catch {
                youtubeDt.date[i] = data.items[i].snippet.publishedAt;
                console.log("date");

            }
            youtubeDt.playListID[i] = data.items[i].id.playlistId;
            // console.log(youtubeDt.videoTitle[i]);
        }
        builder();
    }
}
function processDuration() {
    for (var i in youtubeDt.duration) {
        var ii = parseInt(i) + 1;
        let vDuration = document.querySelector(".v" + i);
        vDuration.textContent = youtubeDt.duration[i];
    }
}
///////////////////////////////Vidoeos Container - inhtml//////////////////////////////////////////////////
async function builder() {
    try {
        var listindex = 0;
        var totalHtml = "";
        var htmlitself = injected;
        for (let i in youtubeDt.videoTitle) {
            var holder = htmlitself;
            holder = holder.replace(new RegExp("{{videoTitle}}", "g"), youtubeDt.videoTitle[i]);
            if ((youtubeDt.videoID[i]) == undefined && youtubeDt.playListID[i] == undefined) {//channel
                holder = holder.replace("{{thumbnail}}", 'src="' + youtubeDt.thumbnail[i] + '" class = "channel"');
                holder = holder.replace("openiframe({{index}})", `openChannel('${youtubeDt.date[i]}')`);
            }
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
            if(youtubeDt.channelImg[i]){
                holder = holder.replace(new RegExp("{{imgTh}}", "g"), youtubeDt.channelImg[i]);
                holder = holder.replace(new RegExp("{{imgThName}}", "g"), youtubeDt.channelTitle[i] + " image");
            }else{
                holder = holder.replace(new RegExp(`<img src="{{imgTh}}" alt="{{imgThName}}"/>`, "g"), "");
            }

            // console.log(window.youtubeDt.videoTitle[i]);
            totalHtml += holder;
        }
        window.totalHtml = new Object;
        window.totalHtml = totalHtml;
        await Emotion.stopLoadingemoji(Emotion.randomEmotion("happy"));
        document.querySelector("#videosContainer").innerHTML = window.totalHtml;
        for (var i in atGlobal.list) {
            let listsign = document.querySelector(".listsign" + atGlobal.list[i]);
            if (listsign != null) {
                listsign.style.cssText = `
            display:block;
            position:absolute;
            left:0;
            top:0;
            z-index:12;
            font-size:2vw;
            background-color:black;
            opacity:50%;
            height:20%;
                width:15%;
                padding:1%;
                border-radius:0 0 1vw 0;
                `;
            }
        }
        processDuration();
        // console.log(totalHtml);    
    } catch {
        showError(200);
    }
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
            a.style.display = "none";
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
    else if (i == "openIframe" && vCode) {
        showloading();
        iframe = '<iframe id="waiting" style="display:block;" src="https://www.youtube.com/embed/' + vCode + '"?rel="0" frameborder="0" allowfullscreen></iframe>';
        document.querySelector("#videosContainer").innerHTML = iframe + "<hr>";
    }
    processDuration("show");
}
///////////////////////////////Make Sure Server Connected//////////////////////////////////////////////////
function mksure(i, ii) {
    try {

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
    } catch {
        console.log("error");
    }
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
        if (k == 'true')
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
        button.setAttribute('style', 'cursor:pointer;')
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
function openChannel(url) {
    // getdata("https://youtube-6rrj.onrender.com/search?q="+url,"json","mainroute");
    getdata(`http://localhost:3002/get?q=${url}`, "json", "mainroute");
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
    let path = window.location.href;
    path = path.substring(path.indexOf("watch?v=") + 8).trim();
    //openiframe("openIframe",path);
    console.log(path);
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
                var processedSearch = (getSearchBox);
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
                var youtubeAPI2 = "http://localhost:3002/search?q=" + processedSearch;
                var youtubeAPI6 = "http://192.168.1.5:3002/search?q=" + processedSearch;
                var youtubeAPI3 = "https://youtube-6rrj.onrender.com/search?q=" + processedSearch;
                var tryy = "data/data2.json";
                //getdata(youtubeAPI2, "json", "mainroute");
                getdata(youtubeAPI6, "json", "mainroute");
                youtubeDt = {};
                // getdata(youtubeAPI3, "json", "mainroute");
                // getdata(youtubeAPI, "json", "mainroute");
                // getdata(tryy, "json", "mainroute");
                // console.log(link);
            }
        }
    }
})();