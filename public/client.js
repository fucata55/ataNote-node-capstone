//Define functions working in landing-page.html
//receive user registration in landing-page.html and send it to process function
//input values will not be null because HTML <input required: true>
function receiveRegisteration() {
    $('#registration').submit(event => {
        event.preventDefault();
        const firstName = $('#first-name').val();
        const lastName = $('#last-name').val();
        const email = $('#email').val();
        const userName = $('#username').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        console.log(`Your first name is ${firstName}, last name is ${lastName}, email is ${email}, username is ${userName}, and pasword is secret`);
        processRegistration(firstName, lastName, email, userName, password, confirmPassword);
    })
}

//return back regitration that doesn't have a consistent password
//send user data to database to be registered
function processRegistration(firstName, lastName, email, userName, password, confirmPassword) {
    if (password !== confirmPassword) {
        console.error('password does not match');
        alert("please enter matching passwords");
        //clear passwords input box if they submitted unmatched
        $('#password').val('');
        $('#confirmPassword').val('')
    }
    console.log('start registering');
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: password,
        confirmPassword: confirmPassword
    };
    //set url to POST request.
    //set endpoint at server.js
    $.getJSON('url', JSON.stringify(userData), showRegistrationResult)
}

//show response from database to landing-page.html
function showRegistrationResult() {
    //if registration fails, alert the reason
    console.error(`registration is failed because user name adasdas is already exist`)
    alert(`registration is failed because user name adasdas is already exist`)
    $('#username').val('');
    //if registration is success, direct to home
    //define variable for client.js use from database JSON response
    //respond POST request to add appropriate user data to home, editor, profile HTMLs that also works for login
    window.open('home.html with url of user data')
}

//Define functions working in login.html
//receive login data, send data to database, direct to home page of the user or error
//input values will not be null because HTML <input required: true>
function receiveLogin() {
    $('#login').submit(event => {
        event.preventDefault();
        const userName: $('#login-username').val();
        const password: $('#login-password').val();
        processLogin(userName, password);
    });
}

function processLogin(userName, password) {
    const userData = {
        userName: userName,
        password: password
    };
    $.getJson('GETbyUserPassurl', JSON.stringify(userData), showLoginResult)
};

function showLoginResult() {
    //if user does not exists or password is not correct, alert user does not exist or password does not match'
    //keep the input value, don't erase them so user can analyze their wrong input
    console.error('invalid user and password combination');
    alert('user does not exist or password does not match');
    //if user and password combination is correct, direct to the user's home
    //define variable for client.js use from database JSON response
    //respond POST request to add appropriate user data to home, editor, profile HTMLs
}
