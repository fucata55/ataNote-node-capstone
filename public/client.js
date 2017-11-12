//define account from login or register, and use it in home, profile, editor HTMLs
let account = {
    firstName: 'Stephen',
    lastName: 'Fucata',
    username: 'Fucata',
    password: 'Thinkful',
    confirmPassword: 'Thinkful',
    notes: [{
            title: 'The Flash Beats Zoom',
            body: 'In The Flash season 2, Flash beats Zoom on \'1 on 1\` fight. Flash created another of him by using time remnant',
            type: 'private'
    },
        {
            title: 'The Flash Beats Savatar',
            body: 'In The Flash season 3, Flash beats Savatar by team work. Thanks to Killer Frost who changed her mind to help the Flash after helping Savatar throughout the season.',
            type: 'public'
    }]
}

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
function showRegistrationResult(account) {
    //if registration fails, alert the reason
    console.error(`registration is failed because user name adasdas is already exist`)
    alert(`registration is failed because user name adasdas is already exist`)
    $('#username').val('');
    //if registration is success, direct to home
    //define variable for client.js use from database JSON response
    //respond POST request to add appropriate user data to home, editor, profile HTMLs that also works for login
    window.open('home.html with url of user data')
    account = account
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

function showLoginResult(account) {
    //if user does not exists or password is not correct, alert user does not exist or password does not match'
    //keep the input value, don't erase them so user can analyze their wrong input
    console.error('invalid user and password combination');
    alert('user does not exist or password does not match');
    //if user and password combination is correct, direct to the user's home
    //define variable for client.js use from database JSON response
    //respond POST request to add appropriate user data to home, editor, profile HTMLs
    account = account
};


//Define functions in editor.html
//receive note
$('#note-form').submit(event => {
    event.preventDefault();
    //update one of the user notes
    let note = account.notes[0]
    note = {
        title: `${$('.note-title').val()}`,
        body: `${$('#note').val()}`
    }
    //control API request of note execution in editor.html
    $('#save-public').click(event => {
        note.type = 'public'
    });
    $('#save-private').click(event => {
        note.type = 'private'
    });
    $('#delete').click(event => {
        note.type = 'trash'
    });
    console.loge(note)
    processNote(note);
});



//Make different request that determined by _note.type
function processNote(_note) {
    const note = JSON.stringify(_note);
    if (_note.type === 'trash') {
        $.ajax({
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
                data: note,
                //Make possible to make request to specific object
                url: '/user',
            })
            .done(function () {
                console.log('Note deleted');
                location.replace('./pages/home');
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    } else {
        $.ajax({
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: note,
                //Make possible to make request to specific object
                url: '/user',
            })
            .done(function () {
                console.log(`Note saved ${_note.type}`);
                location.replace('./pages/home');
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
}


//Define functions in home.html
//adjust number of public and private notes based on the amount in database
function adjustNotesAmount(account) {
    //in server.js, send the amount of notes private and public
    //GET request to server
    //define the numbers
    let amountOfPublicNotes = 2 //account.amountOfPublic
    let amountOfPrivateNotes = 4 //account.amountOfPrivate
    //change DOM in #notification
    $('.number-public-notes').empty();
    $('.number-public-notes').append(amountOfPublicNotes);
    $('.number-private-notes').empty();
    $('.number-private-notes').append(amountOfPrivateNotes);
}

//adjust notes icon base on the user
function adjustNotesIcon(account) {
    //Looping the amount of notes in database and adding them to home.html
    //in server.js, set dataSchema right
    //Link note.body to the editor.html with the note
    Object.keys(account.notes).map(note => {
        $('#note1').after(`<div class='notes-icon'>
<h3>${note.title}</h3>
<a href='url to editor with ${note.id}'><p class='small-note'>${note.body}</p>
<div class='function-container'>
<a href="url to editor with ${note.id}" class='function-icon'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></a>
<a href="url to save note publically request with ${note.id}" class='function-icon'><img src="../images/save-public-icon.png" alt="save note to profile icon" title='move note to profile' /></a>
<a href="url to DELETE request with ${note.id}" class='function-icon'><img src="../images/trash-icon.png" alt="delete note icon" title='delete note' /></a>
</div>
</div>`)
    })
}

//When a specific page is loaded, execute functions
$(document).ready(function () {
    if (window.location.pathname === 'home url') {
        $(.getJSON('url to get all of the data of a specific user', account, [adjustNotesAmount, adjustNotesIcon]))
    } else if (window.location.pathname === 'profile url') {
        $(.getJSON('url to get all of the data of a specific user', account, [displayUserName, adjustNotesIconPrivate]))
    }
})


//Define functions in profile.html
//display username
function displayUserName(account) {
    const userName = $ {
        account.userName
    };
    $('span .username').text(userName)
}

function adjustNotesIconPrivate(account) {
    //shows the notes that are open to public
    Object.keys(account.notes).map(note => {
        if (note.type === 'public') {
            $('.profile notes').after(`<div class='notes-icon public'>
<h3>${note.title}</h3>
<p class='small-note'>${note.body}</p>
<div class='function-container'>
<a href="#" class='function-icon'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></a>
<a href="#" class='function-icon'><img src="../images/save-private-icon.png" alt="save note to home icon" title='move note to home' /></a>
<a href="#" class='function-icon'><img src="../images/trash-icon.png" alt="delete note icon" title='delete note' /></a>
</div>
</div>`)
        }
        console.log(`note is private`)
    });
};

//Triggering functions starts below this line
