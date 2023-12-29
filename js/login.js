const userEmail = document.querySelector("[type='email']");
const userPass = document.querySelector("[type='password']");
const submit = document.querySelector("[type='submit']");

let accounts;
if (localStorage.getItem("accounts")) {
    accounts = JSON.parse(localStorage.getItem("accounts"))
} else {
    accounts = [];
}

const clearInputs = ()=> {
    userEmail.value = "";
    userPass.value = "";
}

window.addEventListener("load", ()=> {
    if (localStorage.getItem("logged-user")) {
        window.open("http://127.0.0.1:5500/profile.html");
        window.close("http://127.0.0.1:5500/index.html");
    }
})

submit.addEventListener("click", (e)=>{
    e.preventDefault();

    const checkUser = accounts.find((user)=>user.email === userEmail.value)
    if (checkUser !== undefined) {
        userEmail.classList.remove("is-invalid");

        if (checkUser.password === userPass.value) {
            userPass.classList.remove("is-invalid");
            window.open("http://127.0.0.1:5500/profile.html");
            window.close("http://127.0.0.1:5500/index.html");

            localStorage.setItem("logged-user", checkUser.id);
            clearInputs();
        } else {
            userPass.classList.add("is-invalid");
        }
    } else {
        userEmail.classList.add("is-invalid");
    }
})