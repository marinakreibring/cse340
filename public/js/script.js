//script for showing password on register form
const pswdBtn = document.querySelector("#pswdBtn");
pswdBtn.addEventListener("click", function () {
    const pswInput = document.getElementById("account_password");
    const type = pswInput.getAttribute("type");
    if (type == "password") {
        pswInput.setAttribute("type", "text");
        pswdBtn.innerHTML = "Hide password";
    } else{
        pswInput.setAttribute("type", "password");
        pswdBtn.innerHTML = "Show password";
    }
})