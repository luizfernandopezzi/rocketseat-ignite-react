type User =  {
    name: String,
    email: String,
    adress: {
        city: String,
        state?: String //Utilizando state?, diz-se que state pode ou não estar definido, ou seja, não é obrigatoriamente uma string.
    }
}

function welcomeMsg(user: User){
    return `Welcome ${user.name}, your e-mail is ${user.email}. Your city is ${user.adress.city} and your state is ${user.adress.state}.`
}

welcomeMsg({
    name: 'John Doe',
    email: 'john@doe.com',
    adress: {
        city: 'New York'
    }
})