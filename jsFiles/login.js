let loginButon = document.getElementById("signInButton");
let errorInputMessage = document.getElementById("loginError");
errorInputMessage.style.display = "none";
/**
 * this method just for partice to change the color when hovering over button.
 * deleting it won't break the page.
 */

function login() {
    loginButon.addEventListener('mouseover', function () {
        loginButon.style.backgroundColor = "blue";
        console.log("login hovered");
    });
    loginButon.addEventListener('mouseout', function () {
        loginButon.style.backgroundColor = "white";
    });
}

/**
 * temporary method to check login username and password.
 * will be deleted after I partice node.js
 */

const tempUserName = "managerMike"
const tempPassword = "SWE432"

function loginCheckUp() {

    loginButon.addEventListener('click', function () {
        let userNameInput = document.getElementById("userName").value;
        let userPasswordInput = document.getElementById("password").value;
        if ((userNameInput == tempUserName) && (userPasswordInput == tempPassword)) {
            console.log(input);
            window.location.href = "manager.html"
        }
        else {
            console.log("hereeee");
            errorInputMessage.style.display = "block";
        }
    });
}


login();
loginCheckUp();