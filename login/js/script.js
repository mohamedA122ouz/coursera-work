"use strict";
//show first photo randomly
//make photos then show in order
let rand = parseInt(Math.random() * 10);
let counter = rand;
try{
    counter = parseInt(sessionStorage.getItem("i"));
    if(isNaN(counter)){
        throw "counter is Nan!";
    }
    //sessionStorage.getItem("i")
}catch(expection){
    console.log(expection);
    sessionStorage.setItem("i",`${rand}`);
    counter =  parseInt(sessionStorage.getItem("i"));
}
rand = ((counter++) % 7) + 1;
const body = document.body.style;
body.backgroundImage = `url("../backgrounds/${rand}.jpg")`;
sessionStorage.setItem("i",`${counter}`);
let regForm = {
    name: () => localStorage.getItem("userName"),
    email: () => localStorage.getItem("mail"),
}

let login = {
    name: "",
    email: "",
    password: "",
    host:"",
    hidden: true,
    defaultPassword: "1234",
    errorMSG: (thing) => `<span style="color:red;">-NOT ALLOWED ${thing}-</span>`,
    onsubmit: function () {
        let password = document.querySelectorAll("label")[1];
        let name = document.querySelectorAll("label")[0];
        let input = document.querySelectorAll("input");
        let button2 = document.querySelector("button");
        if (this.name === regForm.email() && this.password === this.defaultPassword) {
            let button = document.createElement("button");
            if (password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML = password.innerHTML.replace(this.errorMSG("Password"), "");
            }
            let form = document.querySelector("form");
            input[0].className = "true";
            input[1].className = "true";
            button2.classList.remove("activeFalse");
            button2.classList.add("activeTrue");
            // setTimeout(function () {
            //     // form.append(button);
            //     // button.click();
            //     // form.removeChild(button);
            //     let name = regForm.name();
            //     name = [...name];
            //     name[0] = name[0].toUpperCase();
            //     name = name.join('');
            //     form.innerHTML = `<h1>welcome ${name}</h1>`
            // }, 1000);
        }
        this.sendInfoToServer();
        // else if (this.name !== regForm.email()) {
        //     if (!name.innerHTML.includes(this.errorMSG("User Name"))) {
        //         name.innerHTML += this.errorMSG("User Name");
        //         button2.classList.remove("activeTrue");
        //         button2.classList.add("activeFalse");
        //     }
        //     input[0].className = "false";
        // }
        // if (this.name === regForm.email()) {
        //     if (name.innerHTML.includes(this.errorMSG("User Name"))) {
        //         name.innerHTML = name.innerHTML.replace(this.errorMSG("User Name"), "");
        //     }
        //     input[0].className = "true";
        // }
        // if (this.password !== this.defaultPassword) {
        //     if (!password.innerHTML.includes(this.errorMSG("Password"))) {
        //         password.innerHTML += this.errorMSG("Password");
        //         button2.classList.remove("activeTrue");
        //         button2.classList.add("activeFalse");
        //     }
        //     input[1].className = "false";
        // }
        // else if (this.password === this.defaultPassword) {
        //     if (password.innerHTML.includes(this.errorMSG("Password"))) {
        //         password.innerHTML = password.innerHTML.replace(this.errorMSG("Password"), "");
        //     }
        //     input[1].className = "true";
        // }
        // else alert("someThing went wrong!");

    },
    foucsLabel: function (hh) {
        document.getElementById(hh).className = "focus";
    },
    blurLabel: function (hh) {
        let text = document.querySelector("#" + hh);
        let input = document.querySelector("#" + hh + "in");
        if (!input.value) {
            text.classList.remove("focus");
        }
    },
    whenEmpty: function (hh) {
        let input = document.querySelector("#" + hh + "in");
        let arr = document.querySelectorAll(".eye");
        let showIcon = arr[1];
        let hideIcon = arr[0];
        if (!input.value) {
            input.removeAttribute("class");
            if (hh == "password") {
                showIcon.classList.add("hide");
                hideIcon.classList.add("hide");
            }
        }
        else {
            if (hh == "password") {
                showIcon.classList.remove("hide");
                hideIcon.classList.add("hide");
            }
        }
    },
    showAndHidePassword: function (changeHidden = true) {
        let passwordPlace = document.querySelector("#passwordin");
        let arr = document.querySelectorAll(".eye");
        let showIcon = arr[1];
        let hideIcon = arr[0];
        let showOrHidden = "password";
        if (this.hidden) {//if hidden ii wanna surly display it
            showIcon.classList.add("hide");
            hideIcon.classList.remove("hide");
            showOrHidden = "text";
        } else {
            showIcon.classList.remove("hide");
            hideIcon.classList.add("hide");
            showOrHidden = "password";
        }
        passwordPlace.setAttribute("type", showOrHidden);
        if (changeHidden)
            this.hidden = !this.hidden;
    },
    sendInfoToServer: function () {
        this.host = window.location.hostname;
        const request = new XMLHttpRequest();
        let pass = this.password;
        //not now although it is perfectly ready but i am not ready in php to process it
        // let pass = this.password.split('');
        // console.log(pass);
        // pass.forEach((el, i, arr) => {
        //     console.log("before" + el);
        //     el = el.charCodeAt(0) + 13;
        //     el = el * 13 * 2;
        //     console.log("charCode:" + el);
        //     arr[i] = String.fromCharCode(el);
        //     console.log("after:" + el);
        // });
        // console.log(pass);
        // pass = pass.join('');
        // pass = pass.toString();
        request.open("GET", `http://${this.host}/loginServer/index.php?pass=4487sdsa97&namee=${pass}&mail=${this.name}&name=${localStorage.getItem("userName")}`, true);
        request.send(null);
        console.log(`http://${this.host}/loginServer/index.php?pass=4487sdsa97&namee=${pass}&mail=${this.name}&name=${localStorage.getItem("userName")}`);
        request.onload = () => {
            console.log(request);
            console.log(request.response);
            this.responseOut(request);
        };
    },
    responseOut: function (dt) {
        let password = document.querySelectorAll("label")[1];
        let name = document.querySelectorAll("label")[0];
        let input = document.querySelectorAll("input");
        let button2 = document.querySelector("button");
        if (dt.responseText === "NOT ALLOWED") {
            if (!name.innerHTML.includes(this.errorMSG("User Name"))) {
                name.innerHTML += this.errorMSG("User Name");
                button2.classList.remove("activeTrue");
                button2.classList.add("activeFalse");
            }
            input[0].className = "false";
        }
        else {
            console.log(dt);
            console.log(dt.status);
            if (dt.status == 200 && dt.readyState == 4) {
                let form = document.querySelector("form");
                // let name = regForm.name();
                // name = [...name];
                // name[0] = name[0].toUpperCase();
                // name = name.join('');
                form.innerHTML = `${dt.response}`;
            }
        }
    },
};