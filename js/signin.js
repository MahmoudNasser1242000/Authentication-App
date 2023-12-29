'use strict';
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

const userName = document.querySelector("[type='name']");
const userEmail = document.querySelector("[type='email']");
const userPass = document.querySelector("[type='password']");
const userPhone = document.querySelector("[type='tel']");
const userGender = document.querySelectorAll("[name='gender']");
const userImg = document.querySelector("[type='file']");
const submit = document.querySelector("[type='submit']");

const invalidRadio = document.querySelector("#invalid-radio");
const invalidEmail = document.querySelector(".invalid-email");


let accounts;
if (localStorage.getItem("accounts")) {
    accounts = JSON.parse(localStorage.getItem("accounts"))
} else {
    accounts = [];
}

const validationUserName = ()=> {
    if (userName.value.length >= 3) {
        return true;
    } else {
        return false;
    }
}
const validationUserEmail = ()=> {
    const regex = /^[^0-9\W](.*)@[\w-]+(\.com)+$/gm;
    if (regex.test(userEmail.value)) {
        return true;
    } else {
        return false;
    }
}
const validationUserPassword = ()=> {
    const regex = /^(?=.*\d{3})(?=.*[a-zA-Z]{2})(?=.*\W*).{5,15}$/gm;
    if (regex.test(userPass.value)) {
        return true;
    } else {
        return false;
    }
}
const validationUserPhone = ()=> {
    const regex = /^01([0-2]|5)[0-9]{8}$/gm
    if (regex.test(userPhone.value)) {
        return true;
    } else {
        return false;
    }
}
const validationUserGender = (gender)=> {
    if (gender !== "") {
        return true;
    } else {
        return false;
    }
}

const removeInvalidationMsg = ()=> {
    userName.classList.remove("is-invalid");
    userEmail.classList.remove("is-invalid");
    userPass.classList.remove("is-invalid");
    userPhone.classList.remove("is-invalid");
    invalidRadio.classList.replace("d-block", "d-none");
}

const checkProfileImage = (imgValue, gender)=> {
    const userInfo = {
        id: nanoid(),
        name: userName.value,
        email: userEmail.value,
        password: userPass.value,
        phone: userPhone.value,
        image: imgValue,
        gender: gender.value,
    };
    accounts.push(userInfo);
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

const clearInputs = (gender)=> {
    userName.value = "";
    userEmail.value = "";
    userPass.value = "";
    userPhone.value = "";
    userImg.value = "";
    gender.checked = false;
}

submit.addEventListener("click", (e) => {
    e.preventDefault();

    let genderItem = "";
    userGender.forEach((gender)=>{
        if (gender.checked === true) {
            genderItem = gender;
        }
    })

    if (validationUserName() === false) {
        userName.classList.add("is-invalid");
    }else if (validationUserEmail() === false) {
        userEmail.classList.add("is-invalid");
        invalidEmail.innerText = "you should write a valid email!";
    }else if (validationUserPassword() === false) {
        userPass.classList.add("is-invalid");
    }else if (validationUserPhone() === false) {
        userPhone.classList.add("is-invalid");
    }else if (validationUserGender(genderItem) === false) {
        invalidRadio.classList.replace("d-none", "d-block");
    }else if (accounts.find((user)=> user.email === userEmail.value) !== undefined) {
        userEmail.classList.add("is-invalid");
        invalidEmail.innerText = "Email has allready exist before!";
    } else {
        removeInvalidationMsg();

        if (userImg.value !== "") {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                checkProfileImage(reader.result, genderItem);
                clearInputs(genderItem);
            })
            reader.readAsDataURL(userImg.files[0]);
        } else {
            checkProfileImage("", genderItem);
            clearInputs(genderItem);
        }

        window.open("http://127.0.0.1:5500/index.html");
        window.close("http://127.0.0.1:5500/signin.html");
    }
});
