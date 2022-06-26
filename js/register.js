


var formEl = document.querySelector(".register-form")
var nameEl = document.querySelector(".register-name")
var emailEl = document.querySelector(".register-email")
var passwordEl = document.querySelector(".register-password")

formEl.addEventListener('submit', async event => {
    event.preventDefault()

    const credentials = {
        email:emailEl.value,
        password:passwordEl.value,
        name:nameEl.value,
        isAdmin:true
    }
    const result = await registerRequest(credentials)
    if(result){
        const { name,isAdmin, ...loginCredentials } = credentials
        const result = await loginRequest(loginCredentials)
        localStorage.setItem('token', result['Authorization'])
        window.location.href = "/admin.html"
        console.log(result)
    }
})


var showPassword = document.querySelector(".show-password")
// showPassword.addEventListener('click', () => {
//     if(password.type == 'password') {
//         password.type = 'text';
//         showPassword.classList.toggle('fa-eye-slash')
//         showPassword.classList.toggle('fa-eye')
//     }
//     else {
//         password.type = 'password'
//         showPassword.classList.toggle('fa-eye')
//         showPassword.classList.add('fa-eye-slash')
//     }
// })


showPassword.addEventListener('click', () => {
    let nextSibling = showPassword.nextElementSibling
    if(nextSibling.type == "password")nextSibling.type = 'text'
    else{
        nextSibling.type = 'password'
    }
})