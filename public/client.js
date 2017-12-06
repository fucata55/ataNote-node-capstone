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

const otherAccount = {
    username: 'accountName'
};

const emptyNote = {
    title: '',
    body: '',
    type: 'private',
    username: account.username
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
    $('#world-section').hide();
}

function showLoginSection() {
    $('#login-navbar').show();
    $('#login-section').show();
    $('#home-navbar').hide();
    $('#registration-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
    $('#world-section').hide();
}

function showHomeSection(username) {
    getNotes(account.username);
    $('#home-navbar').show();
    $('#home-section').show();
    $('#login-navbar').hide();
    $('#registration-section').hide();
    $('#login-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
    $('#world-section').hide();
}

function showEditorSection() {
    $('#home-navbar').show();
    $('#editor-section').show();
    $('#login-navbar').hide();
    $('#regisration-section').hide();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#profile-section').hide();
    $('#world-section').hide();
}

function showProfileSection() {
    $('#home-navbar').show();
    $('#profile-section').show();
    $('#login-navbar').hide();
    $('#regisration-section').show();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
    $('#world-section').hide();
}

function showWorldSection() {
    getAllUsernames();
    $('#home-navbar').show();
    $('#world-section').show();
    $('#login-navbar').hide();
    $('#regisration-section').show();
    $('#login-section').hide();
    $('#home-section').hide();
    $('#editor-section').hide();
    $('#profile-section').hide();
}

//Define functions working in *************************REGISTRATION SECTION*************************
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
            showLoginSection();
            console.log('sign up sucessful');
            alert: 'Sign up sucessful';

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

//Define functions working in *************************LOGIN SECTION*************************
//receive login data, send data to database, direct to home page of the user or error
function processLogin(username, password) {
    const userData = {
        username: username,
        password: password
    };
    $.ajax({
            type: 'POST',
            url: '/user/signin',
            dataType: 'json',
            data: JSON.stringify(userData),
            contentType: 'application/json'
        }) //show login result
        .done(function (result) {
            account = result;
            emptyNote.username = account.username
            console.log(`account is ${account.username}`)
            getNotes(result.username);
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            alert('invalid user and password combination')
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);

        });
};

//Define functions in *************************HOME SECTION*************************
function getNotes(username) {
    //populate home with user's note
    //define the numbers of notes on public and private

    $.ajax({
            type: 'GET',
            url: '/user/notes/all/' + username
        })
        .done(function (notes) {
            //console.log('notes are' + notes);
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
    //    remove default notes icon
    $('.default').remove();
    $('.b').remove();
    notes.forEach(note => {
        $('#note1').after(`<div class='notes-icon b'>
<input type='hidden' class='note-id' value='${note._id}'>
<a data-contentId='${note._id}' class='openNote openNote-js'>
<h3>${note.title.slice(0,11)}...</h3>
<p class='small-note'>${note.body.slice(0, 140)}...</p>
</a>
<div class='function-container'>

<form class='edit-note-form'>
<input type='hidden' class='edit-note-id' value='${note._id}'>
<button type='submit' class='function-icon openNoteSmall-js'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></button>
</form>

<form class='save-public-note-form'>
<input type='hidden' class='save-public-note-id' value='${note._id}'>
<button type='submit' class='function-icon save-public-js'><img src="../images/save-public-icon.png" alt="save note to profile icon" title='move note to profile' /></button>
</form>

<form class='delete-note-form'>
<input type='hidden' class='delete-note-id' value='${note._id}'>
<button type='submit' class='function-icon delete-js'><img src="../images/trash-icon.png" alt="delete note icon" title='delete note' /></button>
</form>


</div>
</div>`)
    });
};


function adjustNotesAmount(notes) {
    let amountOfPublicNotes = function () {
        let count = 0;
        notes.forEach(note => {
            if (note.type == 'public') {
                count++
            }
        })
        //        console.log(`There are ${count} of public notes`);
        return count
    };
    let amountOfPrivateNotes = function () {
        let count = 0;
        notes.forEach(note => {
            if (note.type == 'private') {
                count++
            }
        })
        //        console.log(`There are ${count} of private notes`);
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
            url: "/user/notes" + note._id,
        })
        .done()
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//Define functions in *************************EDITOR SECTION*************************
//receive note. ^Search "//receive note"

//Make different request that determined by _note.type
function processNote(_note) {
    //console.log(_note);

    //if a note type is trash, trash the note
    if (_note.type == 'trash') {
        console.log('deleting a note')
        $.ajax({
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
                url: '/user/notes/c/' + _note._id,
            })
            .done(function (res) {
                console.log('Note deleted');
                showHomeSection();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        //if a note type is private or public, save the note as edited
    } else {
        $.ajax({
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(_note),
                url: '/user/notes/b/' + _note._id
            })
            .done(data => {
                console.log(`Successful to save note ${_note.type}ly`);
                showHomeSection();
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
    //console.log(`note is ${note}`);
    $('.addID').val(note._id);
    $('.note-title').val(note.title);
    $('textarea').val(note.body);
    $('.saves-box').show();
    $('textarea').prop('disabled', false);
    $('.note-title').prop('disabled', false);
    showEditorSection();
}

function adjustOtherEditor(note) {
    //console.log(`OTHER note is ${note}`);
    $('.addID').val(note._id);
    $('.note-title').val(note.title);
    $('textarea').val(note.body);
    $('.saves-box').hide();
    $('textarea').attr('disabled', 'disabled');
    $('.note-title').attr('disabled', 'disabled');
}

//Define functions in *************************PROFILE SECTION*************************
//display username
function displayUsername(account) {
    const username = account.username;
    $('.username').text(username)
}

function displayOtherUsername(username) {;
    $('.username').text(username)
}

function adjustNotesIconPublic(username) {
    $.ajax({
            type: 'GET',
            url: '/user/notes/all/' + username
        })
        .done(function (notes) {
            displayPublicNotes(notes);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Loading notes number has failed')
        });
};

function displayPublicNotes(notes) {
    console.log('displayPublicNotes ran')
    $('.e').remove();
    $('.h').remove();
    $('.b').remove();
    notes.forEach(note => {
        if (note.type == 'public') {
            $('.g').append(`<div class='notes-icon public h'>
<a class='openNote openNote-js'>
<h3>${note.title.slice(0,11)}...</h3>
<p class='small-note'>${note.body.slice(0, 140)}...</p>
</a>
<div class='function-container'>
<form class='edit-note-form'>
<input type='hidden' class='edit-note-id' value='${note._id}'>
<button type='submit' class='function-icon openNoteSmall-js'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></button>
</form>

<form class='save-private-note-form'>
<input type='hidden' class='save-private-note-id' value='${note._id}'>
<button type='submit' class='function-icon save-private-js'><img src="../images/save-private-icon.png" alt="save note to home icon" title='move note to home' /></button>
</form>

<form class='delete-note-form'>
<input type='hidden' class='delete-note-id' value='${note._id}'>
<button type='submit' class='function-icon delete-js'><img src="../images/trash-icon.png" alt="delete note icon" title='delete note' /></button>
</form>
</div>
</div>`)
        }
    });
}

function adjustOthersProfile(notes) {
    $('.e').remove();
    $('.b').remove();
    $('.h').remove();
    const publicNotes = [];
    notes.forEach(note => {
        if (note.type == 'public') {
            publicNotes.push(note);
            $('.f').after(`
<div class='notes-icon b'>
<input type='hidden' class='note-id' value='${note._id}'>
<a data-contentId='${note._id}' class='openNote openNote-js'>
<h3>${note.title.slice(0,11)}...</h3>
<p class='small-note'>${note.body.slice(0, 140)}...</p>
</a>
<div class='function-container'>

<form class='other'>
<input type='hidden' class='edit-note-id' value='${note._id}'>
<button type='submit' class='function-icon openNoteSmall-js'><img src="../images/edit-icon.png" alt="edit note icon" title='edit note' /></button>
</form>

</div>
</div>`)
        };
    })
    if (publicNotes.length == 0) {
        $('.g').append(`<p class='h'>User doesn't have a note in public yet</p>`);
    }
}
//Define functions in *************************WORLD SECTION*************************
//Request all usernames
function getAllUsernames() {
    $.ajax({
            method: 'GET',
            url: '/users',
        })
        .done(data => {
            displayUsers(data);
        })
        .fail((jqXHR, error, errorThrown) => {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })
}

function displayUsers(users) {
    let usernames = [];
    users.forEach(user => {
        usernames.push(user.username)
    });
    usernames.sort();
    $('.ataNoteUser').remove();
    usernames.forEach(user => {
        $('.ataNoteUsers').append(`
<a class='ataNoteUser' id='${user}'>
<img class='avatar' src="./images/avatar.png" alt="avatar">
<p class='ataNoteUsername'>${user}</p>
</a>`)
    })
}

//function to show profile when ataNoteUser is clicked
function getUserProfile(userSelected) {
    $.ajax({
            method: 'GET',
            url: `/user/notes/all/${userSelected}`,
        })
        .done(data => {
            otherAccount.username = userSelected;
            console.log(userSelected, otherAccount.username);
            displayOtherUsername(otherAccount.username);
            adjustOthersProfile(data)
            showProfileSection();
        })
        .fail((jqXHR, error, errorThrown) => {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        })
}

//Triggering functions starts below this line*************************TRIGGERS*************************

//When page loads
$('#login-navbar').show();
$('#registration-section').show();
$('#home-navbar').hide();
$('#login-section').hide();
$('#home-section').hide();
$('#editor-section').hide();
$('#profile-section').hide();
$('#world-section').hide();



//Sections hide and show (USE the functions at AJAX done instead)
$('.show-home-section').click(() => {
    showHomeSection();
})

$('show-registration-section').click(() => {
    showRegistrationSection();
})

$('.show-editor-section').click(() => {
    $('.saves-box').show();
    $('textarea').prop('disabled', false);
    $('.note-title').prop('disabled', false);
    showEditorSection();
});

$('.show-login-section').click(() => {
    showLoginSection();
});

$('.show-profile-section').click(() => {
    displayUsername(account);
    adjustNotesIconPublic(account.username);
    showProfileSection();
});

$('.addNote-js').click(() => {
    $('.addID').val('0');
    $('.note-title').val('');
    $('textarea').val('');
});

$('.show-world-section').click(() => {
    showWorldSection();
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
$('.login').submit(event => {
    event.preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();
    processLogin(username, password);
});



//Listeners in home

//Open note in editor
$(document).on('click', '.edit-note-form button', (event) => {
    event.preventDefault();
    let selectedId = $(event.target).closest('form').find('.edit-note-id').val();
    const _note = {
        id: selectedId
    };
    $.ajax({
            method: 'GET',
            url: '/user/notes/a/' + selectedId,
        })
        .done(function (note) {
            adjustEditor(note);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//Save note to public
$(document).on('click', '.save-public-note-form', event => {
    event.preventDefault();
    let selectedId = $(event.target).closest('form').find('.save-public-note-id').val();
    const updateNoteObject = {
        type: 'public'
    }
    $.ajax({
            method: 'PUT',
            url: '/user/notes/b/' + selectedId,
            dataType: 'json',
            data: JSON.stringify(updateNoteObject),
            contentType: 'application/json'
        })
        //POST will respond an empty note with unique ID
        .done(function (note) {
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

$(document).on('click', '.save-private-note-form', event => {
    event.preventDefault();
    let selectedId = $(event.target).closest('form').find('.save-private-note-id').val();
    const updateNoteObject = {
        type: 'private'
    }
    $.ajax({
            method: 'PUT',
            url: '/user/notes/b/' + selectedId,
            dataType: 'json',
            data: JSON.stringify(updateNoteObject),
            contentType: 'application/json'
        })
        //POST will respond an empty note with unique ID
        .done(function (note) {
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//Delete note
$(document).on('click', '.delete-note-form', (event) => {
    event.preventDefault();
    let selectedId = $(event.target).closest('form').find('.delete-note-id').val();
    $.ajax({
            method: 'DELETE',
            url: '/user/notes/c/' + selectedId
        })
        .done(function (res) {
            console.log('Note deleted');
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//Use when the whole note-icons are clickable in next update
//open editor with note when clicking a note icon
//$('.openNote-js').click(event => {
//    showEditorSection();
//    let noteIDValue = $(this).parent().find(".note-id").val();
//    console.log(this, `ID selected is ${noteIDValue}`);
//    $.ajax({
//            method: 'GET',
//            url: '/user/notes/' + NoteIDValue,
//            dataType: 'json',
//            data: JSON.stringify(updateNoteObject),
//            contentType: 'application/json'
//        })
//        //POST will respond an empty note with unique ID
//        .done(function (note) {
//            adjustEditor(note);
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//        });
//});


//Listeners in editor
//receive note
$('#note-form').submit(event => {
    event.preventDefault();
    let id = $('.addID').val();
    //control API request of note execution in editor.html
    //    let actionValue = $('input[name=action]:checked]', '#note-form').val();
    //    document.getElementById('RadioButton').checked
    let actionValue = $('input[name=action]:checked').val();
    let titleValue = $('.note-title').val();
    let bodyValue = $('#note').val();
    let note = {
        'title': titleValue,
        'body': bodyValue,
        'type': actionValue,
        'username': account.username
    }

    //    console.log(`actionValue is ${actionValue}`);
    //    console.log(`Note's title is ${titleValue}`);
    //    console.log(`Note's body is ${bodyValue}`);
    //    console.log(`Note's id is ${id}`);
    //    console.log(`Note's user is ${account.username}`);
    //    console.log(`note has ${note}`);
    //if note is new (has no id), request POST
    if (id == '0') {

        $.ajax({
                method: 'POST',
                url: '/user/notes',
                dataType: 'json',
                data: JSON.stringify(note),
                contentType: 'application/json'
            })
            //POST will respond an empty note with unique ID
            .done(function (note) {
                showHomeSection();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
    //if note exists (has id), request PUT to edit it
    else {
        note._id = id;
        processNote(note);
    };
})

//Listeners in profile
//Listeners in world
$('.ataNoteUsers').on('click', '.ataNoteUser', event => {
    let userSelected = $(event.target).closest('a').attr('id');
    //    console.log(`the user selected is ${userSelected}`);
    getUserProfile(userSelected);
})

$(document).on('click', '.other button', (event) => {
    event.preventDefault();
    let selectedId = $(event.target).closest('form').find('.edit-note-id').val();
    const _note = {
        id: selectedId
    };
    $.ajax({
            method: 'GET',
            url: '/user/notes/a/' + selectedId,
        })
        .done(function (note) {
            console.log(note.title);
            adjustOtherEditor(note);
            showEditorSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})
