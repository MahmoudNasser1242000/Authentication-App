const userImg = document.querySelector(".user-img");
const userName = document.querySelector(".user-name");
const userPhone = document.querySelector(".user-phone");

const _name = document.querySelector(".name");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const gender = document.querySelector(".gender");

const logout = document.querySelector(".logout");
const deleteAccount = document.querySelector(".del-account");

let userId;
if (localStorage.getItem("logged-user")) {
    userId = localStorage.getItem("logged-user");
} else {
    userId = "";
}

let accounts = JSON.parse(localStorage.getItem("accounts"));

const showUserInfo = () => {
    const loggedUser = accounts.find((user)=> user.id === userId);
    if (loggedUser !== undefined) {
        if (loggedUser.image !== "") {
            userImg.setAttribute("src", loggedUser.image)
        } else {
            if (loggedUser.gender === "male") {
                userImg.setAttribute("src", "../default-users-images/male_profile_image.jpg");
            } else {
                userImg.setAttribute("src", "../default-users-images/female_profile_image.jpg");
            }
        }

        userName.innerText = loggedUser.name;
        userPhone.innerText = loggedUser.phone;

        _name.innerText = loggedUser.name;
        email.innerText = loggedUser.email;
        phone.innerText = loggedUser.phone;
        gender.innerText = loggedUser.gender;
    }
}
showUserInfo();

logout.addEventListener("click", ()=> {
    localStorage.removeItem("logged-user");
    
    window.open("http://127.0.0.1:5500/index.html");
    window.close("http://127.0.0.1:5500/profile.html");
})

deleteAccount.addEventListener("click", ()=> {
    accounts = accounts.filter((user)=> user.id !== userId);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    localStorage.removeItem("logged-user");

    window.open("http://127.0.0.1:5500/signin.html");
    window.close("http://127.0.0.1:5500/profile.html");
})