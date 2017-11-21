//define account from login or register, and use it in home, profile, editor HTMLs
let account = {
    firstName: 'Stephen',
    lastName: 'Fucata',
    username: 'Fucata',
    password: 'Thinkful',
    confirmPassword: 'Thinkful',
    notes: [{
            id: '12',
            title: 'The Flash Beats Zoom',
            body: 'In The Flash season 2, Flash beats Zoom on \'1 on 1\` fight. Flash created another of him by using time remnant',
            type: 'private'
    },
        {
            title: 'The Flash Beats Savatar',
            body: 'In The Flash season 3, Flash beats Savatar by team work. Thanks to Killer Frost who changed her mind to help the Flash after helping Savatar throughout the season.',
            type: 'public'
    }]
};

const emptyNote = {
    title: '',
    body: '',
    type: 'private',
    user: account.username
}


//Hide and show functions
function showRegistrationSection() {
    $('#login-navbar').show();
    $('#regisration-section').show();
    $('#home-navbar').hide();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
}

function showLoginSection() {
    $('#login-navbar').show();
    $('#login-section').show();
    $('#home-navbar').hide();
    $('#registration-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
}

function showHomeSection() {
    $('#home-navbar').show();
    $('#home-section').show();
    $('#login-navbar').hide();
    $('#registration-section').hide();
    $('#login-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
}

function showEditorSection() {
    $('#home-navbar').show();
    $('#editor-section').show();
    $('#login-navbar').hide();
    $('#regisration-section').hide();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#profile-section').hide();
}

function showProfileSection() {
    $
    $('#home-navbar').show();
    $('#profile-section').show();
    $('#login-navbar').hide();
    $('#regisration-section').show();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
}
//Define functions working in registration section
//return back regitration that doesn't have a consistent password
//send user data to database to be registered
function processRegistration(firstName, lastName, email, username, password, confirmPassword) {
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
        username: username,
        password: password
    };
    //set url to POST request.
    //set endpoint at server.js
    $.ajax({
            type: 'POST',
            url: '/user/signup',
            dataType: 'json',
            data: JSON.stringify(userData),
            contentType: 'application/json'
        })
        //expect request POST will respond user data
        .done(function (result) {
            //show registration result
            account = result;
            getNotes(result)
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            alert(jqXHR.responseJSON.message);
            console.log(jqXHR);
            console.log(jqXHR.responseJSON.message);
            console.log(error);
            console.log(errorThrown);
            //            $('#username').val('');

        });
};

//Define functions working in login.html
//receive login data, send data to database, direct to home page of the user or error
function processLogin(username, password) {
    const userData = {
        username: username,
        password: password
    };
    $.ajax({
            type: 'GET',
            url: '/user/signin',
            dataType: 'json',
            data: JSON.stringify(userData),
            contentType: 'application/json'
        }) //show login result
        .done(function (result) {
            account = result;
            console.log(`account is ${account}`)
            getNotes(account);
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('invalid user and password combination')
        });
};

//Define functions in home section
//adjust number of public and private notes based on the amount in database
function getNotes(account) {
    //in server.js, send the amount of notes private and public
    //GET request to server
    //define the numbers of notes on public and private
    $.ajax({
            type: 'GET',
            url: '/user/notes',
            dataType: 'json',
            data: JSON.stringify(account),
            contentType: 'application/json'
        })
        .done(function (notes) {
            adjustNotesIcon(notes);
            adjustNotesAmount(notes);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Loading notes number has failed')
        });

}

//adjust notes icon base on the user
function adjustNotesIcon(notes) {
    notes.forEach.map(note => {
        $('#note1').after(`<div class='notes-icon'>
<input type='hidden' class="note-id" value='${note.id}'>
<a href="#" class='show-editor-section openNote' />
<h3>${note.title}</h3>
<p class='small-note'>${note.body.slice(1, 90)}</p>
<div class='function-container'>
<a href='#' class='function-icon openNote'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></a>
<a href='#' class='function-icon save-public-js'><img src="../images/save-public-icon.png" alt="save note to profile icon" title='move note to profile' /></a>
<a href='#' class='function-icon delete-js'><img src="../images/trash-icon.png" alt="delete note icon" title='delete note' /></a>
</div>
</div>`)
    });
};

$('.openNote').click(event => {
    let noteIDValue = $(this).parent().parent().find(".note-id").val();
})

function adjustNotesAmount(notes) {
    console.log(`${account.username} note/(s/) is loaded`);
    let amountOfPublicNotes = function () {
        let count = 0;
        notes.forEach(note => {
            if (note.type == 'public') {
                count++
            }
        })
        return count
    };
    let amountOfPrivateNotes = function () {
        let count = 0;
        account.notes.forEach(note => {
            if (note.type == 'private') {
                count++
            }
        })
        return count
    };
    //change DOM in #notification
    $('.number-public-notes').empty();
    $('.number-public-notes').append(amountOfPublicNotes);
    $('.number-private-notes').empty();
    $('.number-private-notes').append(amountOfPrivateNotes);
}


//delete note
function deleteNote(note) {
    $.ajax({
            type: "DELETE",
            url: "/user/notes" + note.id,
        })
        .done()
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//Define functions in editor.html
//receive note. ^Search "//receive note"

//Make different request that determined by _note.type
function processNote(_note) {
    const note = JSON.stringify(_note);
    console.log(_note);
    if (_note.type === 'trash') {
        $.ajax({
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
                url: '/user/notes/' + _note.id,
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
                url: '/user/notes/' + _note.id,
            })
            .done(function (data) {
                console.log(`Note saved ${_note.type}`);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
}

//populate editor page from ID
function adjustEditor(note) {
    console.log(`note is ${note}`);
    $('.note-title').val(note.title).addClass(note.id);
    $('textarea').val(note.body).addClass(note.id);
    $("input[type='radio']").addClass(note.id);
}


//Define functions in profile.html
//display username
function displayUsername(account) {
    const username = `${account.username}`;
    $('.username').text(username)
}

function adjustNotesIconPublic(account) {

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

//When page loads
$('#login-navbar').show();
$('#registration-section').show();
$('#home-navbar').hide();
$('#login-section').hide();
$('#home-section').hide();
$('#editor-section').hide();
$('#profile-section').hide();


//Sections hide and show (USE the functions at AJAX done instead)
$('.show-home-section').click(() => {
    showHomeSection();
})

$('show-registration-section').click(() => {
    showRegistrationSection();
})

$('.show-editor-section').click(() => {
    showEditorSection();
});

$('.show-login-section').click(() => {
    showLoginSection();
});

$('.show-profile-section').click(() => {
    showProfileSection();
})

//Listeners in index
//receive user registration in landing-page.html and send it to process function
//input values will not be null because HTML <input required: true>
$('#registration').submit(event => {
    event.preventDefault();
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const email = $('#email').val();
    const username = $('#username').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    console.log(`Your first name is ${firstName}, last name is ${lastName}, email is ${email}, username is ${username}, and pasword is secret`);
    processRegistration(firstName, lastName, email, username, password, confirmPassword);
});



//Listeners in login
//receive login data, send data to database, direct to home page of the user or error
//input values will not be null because HTML <input required: true>
$('#login').submit(event => {
    event.preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();
    console.log(`username and password are ${username} ${password}`);
    processLogin(username, password);
});




//Listeners in home
//create note
$('.addNote').click(event => {
    $.ajax({
            method: 'POST',
            url: '/user/notes',
            dataType: 'json',
            data: JSON.stringify(emptyNote),
            contentType: 'application/json'
        })
        //POST will respond an empty note with unique ID
        .done(function (note) {
            adjustEditor(note);
            showEditorSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//In home.html, when a small note is clicked, load editor with the note
$('.openNote').click(event => {
    const thisID = this.attr('id');
    console.log(this, `ID selected is ${thisID}`);
    $.getJSON('/user/notes/' + thisID, adjustEditor);
})
//In home.html, when a save-to-public button is clicked, share the note selected to public
$('.save-public-js').click(event => {
    const thisID = this.attr('id');
    console.log(this, `ID selected is ${thisID}`);
    const updateNoteObject = {
        type: 'public'
    };
    $.ajax({
            method: 'PUT',
            url: '/user/notes/' + thisID,
            dataType: 'json',
            data: JSON.stringify(updateNoteObject),
            contentType: 'application/json'
        })
        //POST will respond an empty note with unique ID
        .done(function (note) {
            showProfileSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
//In home.html, when a delete button is clicked, delete button
$('.delete-js').click(event => {
    const thisID = this.attr('id');
    console.log(this, `ID selected is ${thisID}`);
    $.getJSON('/user/notes/' + thisID, deleteNote)
});



//Listeners in editor
//receive note
$('#note-form').submit(event => {
    event.preventDefault();
    //update one of the user notes
    let note = account.notes[0]
    note = {
        id: '12',
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
    console.log(note)
    processNote(note);
});

//Listeners in profile
