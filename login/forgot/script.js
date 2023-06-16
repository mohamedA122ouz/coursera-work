"use strict";
let welcome = {
    color: "blue",
    message: "Hello to Html,css,JavaScript World!",
    container: () => {
        return document.querySelector("#welcome");
    },
    innerHTM: function () {
        let container = this.container();
        container.innerHTML = `<h1>${this.message}</h1>`;
        container.style.color = this.color;
    },
    writeDocMSG: function () {
        document.write(this.message);
        document.write("<hr>");
    }
}
welcome.writeDocMSG();
let simpleCalc = {
    name: "simple Calculator",
    x: 33,
    y: 10,
    sum: function () { return this.x + this.y; },
    diff: function () { return this.x - this.y; },
    prod: function () { return this.x * this.y; },
    div: function () { return this.x / this.y; },
    mod: function () { return this.x % this.y; },
    "x++": function () { return ++this.x; },
    "y--": function () { return --this.y; },
    notTable: function () {
        let arr = Object.keys(this);
        console.log(arr);
        let container = document.querySelector("#simpleCalc");
        container.innerHTML += '*'.repeat(15) + this.name + '*'.repeat(15) + "<br><hr>";
        container.innerHTML += `x = ${this.x} and y = ${this.y}<br><hr>`;
        arr.forEach(
            (el, i) => {
                if (i > 2 && i < 5) {
                    container.innerHTML += `${el} = ${this[el]()}<br>`;
                }
                else if (i > 2 && i >= 5 && el !== "notTable") {
                    container.innerHTML += `${el} = ${this[el]()}<br>`;
                }
                if (i > 2 && i % 2 == 0 || (i >= 6 && i !== 9)) {
                    container.innerHTML += `<hr>`
                }
            }
        );
        container.innerHTML += '*'.repeat(15) + "End " + this.name + '*'.repeat(15) + "<br><hr>";
    },
};
let calcTable = {
    addRow: function (data1, data2) {
        return `<tr>${this.addCol(data1)}${this.addCol(data2)}</tr>`;
    },
    addCol: function (data) {
        return `<td colspan = 2>${data || "NO data Available"}</td>`;
    },
    setTable: function () {
        simpleCalc.x--;
        simpleCalc.y++;
        let arr = Object.keys(simpleCalc);
        arr.shift();
        arr.pop();
        let xyRow = `<tr><td>${arr[0]}</td><td>${simpleCalc[`${arr[0]}`]}</td><td>${arr[1]}</td><td>${simpleCalc[arr[1]]}</td></tr>`;
        arr.shift();
        arr.shift();
        let cc = document.querySelector("table");
        cc.innerHTML = xyRow;
        arr.forEach(
            function (el) {
                cc.innerHTML += calcTable.addRow(el, simpleCalc[el]());
            });
    }
}
function calculate() {
    let x = document.querySelector("#xin").value;
    let output = document.querySelector("#funcX");
    output.textContent = x < 0 ? x ** 2 : 1 <= x && x < 20 ? ((x ** 2) - 4) : 20 <= x && x <= 35 ? (((x - 4) ** (1 / 2)) / (2 * x)) : isNaN(x) ? "Enter numbers only" : "undefined";
};
let regForm = {
    name: "",
    email:"",
    checkName: function () {
        document.querySelector("h3").textContent = !this.name ? "You should Enter Your Name!" : "";
        // document.querySelector("#text").value = (this.name ? this.name : "");
        localStorage.setItem("mail",this.email);
        localStorage.setItem("userName",this.name);
        window.alert(this.name);
    }
}
let order = {
    name: "",
    password: "",
    defaultPassword: "1234",
    errorMSG: (thing) => `<span style="color:red;">You have Entered a Wrong ${thing}</span>`,
    onsubmit: function () {
        let password = document.querySelectorAll("label")[5];
        let name = document.querySelectorAll("label")[4];
        if (this.name === regForm.name && this.password === this.defaultPassword) {
            if (password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML = password.innerHTML.replace(this.errorMSG("Password"), "");
            }
            let form = document.querySelectorAll("form")[2];
            let button = document.createElement("button");
            form.append(button);
            button.click();
            form.removeChild(button);
        }
        else if (this.name !== regForm.name) {
            if (!name.innerHTML.includes(this.errorMSG("User Name"))) {
                name.innerHTML += this.errorMSG("User Name");
            }
        }
        if (this.name === regForm.name) {
            if (name.innerHTML.includes(this.errorMSG("User Name"))) {
                name.innerHTML = name.innerHTML.replace(this.errorMSG("User Name"), "");
            }
        }
        else if (this.password !== this.defaultPassword) {
            if (!password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML += this.errorMSG("Password");
            }
        }
        else if (this.password === this.defaultPassword) {
            if (password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML = password.innerHTML.replace(this.errorMSG("Password"), "");
            }
        }
        else alert("someThing went wrong!");
    }
}
welcome.innerHTM();
simpleCalc.notTable();
calcTable.setTable();