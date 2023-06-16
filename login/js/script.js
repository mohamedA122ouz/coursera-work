let regForm = {
    name: () => localStorage.getItem("userName"),
    email: () => localStorage.getItem("mail"),
}

let login = {
    name: "",
    email:"",
    password: "",
    defaultPassword: "1234",
    errorMSG: (thing) => `<span style="color:red;">-You have Entered a Wrong ${thing}-</span>`,
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
            setTimeout(function(){
                // form.append(button);
                // button.click();
                // form.removeChild(button);
                let name = regForm.name();
                name =[...name];
                name[0] = name[0].toUpperCase();
                name = name.join('');
                form.innerHTML = `<h1>welcome ${name}</h1>`
            },1000);
        }
        else if (this.name !== regForm.email()) {
            if (!name.innerHTML.includes(this.errorMSG("User Name"))) {
                name.innerHTML += this.errorMSG("User Name");
                button2.classList.remove("activeTrue");
                button2.classList.add("activeFalse");
            }
            input[0].className = "false";
        }
        if (this.name === regForm.email()) {
            if (name.innerHTML.includes(this.errorMSG("User Name"))) {
                name.innerHTML = name.innerHTML.replace(this.errorMSG("User Name"), "");
            }
            input[0].className = "true";
        }
        if (this.password !== this.defaultPassword) {
            if (!password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML += this.errorMSG("Password");
                button2.classList.remove("activeTrue");
                button2.classList.add("activeFalse");
            }
            input[1].className = "false";
        }
        else if (this.password === this.defaultPassword) {
            if (password.innerHTML.includes(this.errorMSG("Password"))) {
                password.innerHTML = password.innerHTML.replace(this.errorMSG("Password"), "");
            }
            input[1].className = "true";
        }
        
        else alert("someThing went wrong!");
    },
foucsLabel:function (hh){//add class focus to move all lable go up
    document.getElementById(hh).className = "focus";
},
blurLabel:function (hh){//remove class focus to make labe go down
    let text = document.querySelector("#"+hh);
    let input = document.querySelector("#"+hh+"in");
    if(!input.value){
        text.classList.remove("focus");
    }
},
whenEmpty:function (hh){
    let input = document.querySelector("#"+hh+"in");
    if(!input.value){
        input.removeAttribute("class");
    }
}
};