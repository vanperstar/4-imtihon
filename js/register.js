


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
        window.location.href = "/index.html"
        console.log(result)
    }
})