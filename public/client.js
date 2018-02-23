let account = {
    username: 'fucata'
}
let otherAccount = {
    username: 'accountName'
};
let emptyNote = {
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

//Defining functions working in *************************REGISTRATION SECTION*************************

//Registering user
function processRegistration(firstName, lastName, email, username, password, confirmPassword) {
    if (password !== confirmPassword) {
        console.error('password does not match');
        alert('please enter matching passwords');
        $('#password').val('');
        $('#confirmPassword').val('')
    }
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
    };
    $.ajax({
            type: 'POST',
            url: '/user/signup',
            dataType: 'json',
            data: JSON.stringify(userData),
            contentType: 'application/json'
        })
        .done(result => {
            showLoginSection();
            console.log('sign up sucessful');
            alert: 'Sign up sucessful';
        })
        .fail(jqXHR, error, errorThrown => {
            alert(jqXHR.responseJSON.message);
            console.log(jqXHR);
            console.log(jqXHR.responseJSON.message);
            console.log(error);
            console.log(errorThrown);
        });
};

//Defining functions working in *************************LOGIN SECTION*************************

//Receiving login data, sending data to database, directing user to home page or error
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
        })
        .done(result => {
            account = result;
            emptyNote.username = account.username
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

//Defining functions in *************************HOME SECTION*************************

//Populating home with user's note
//Defining the numbers of notes on public and private
function getNotes(username) {
    $.ajax({
            type: 'GET',
            url: '/user/notes/all/' + username
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

//Adjusting notes icon base on the user
function adjustNotesIcon(notes) {
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
<button type='submit' class='function-icon openNoteSmall-js'><img src='../images/edit-icon.png' alt='edit note icon' title='edit note' /></button>
</form>

<form class='save-public-note-form'>
<input type='hidden' class='save-public-note-id' value='${note._id}'>
<button type='submit' class='function-icon save-public-js'><img src='../images/save-public-icon.png' alt='save note to profile icon' title='move note to profile' /></button>
</form>

<form class='delete-note-form'>
<input type='hidden' class='delete-note-id' value='${note._id}'>
<button type='submit' class='function-icon delete-js'><img src='../images/trash-icon.png' alt='delete note icon' title='delete note' /></button>
</form>


</div>
</div>`)
    });
};

//Giving amount of notes
function adjustNotesAmount(notes) {
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
        notes.forEach(note => {
            if (note.type == 'private') {
                count++
            }
        })
        return count
    };
    $('.number-public-notes').empty();
    $('.number-public-notes').append(amountOfPublicNotes);
    $('.number-private-notes').empty();
    $('.number-private-notes').append(amountOfPrivateNotes);
}


//Deleting a note
function deleteNote(note) {
    $.ajax({
            type: 'DELETE',
            url: '/user/notes' + note._id,
        })
        .done()
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//Defining functions in *************************EDITOR SECTION*************************

//Updating note status
//Making different request that determined by _note.type
function processNote(_note) {
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

//Populating editor page from ID
function adjustEditor(note) {
    $('.addID').val(note._id);
    $('.note-title').val(note.title);
    $('textarea').val(note.body);
    $('.saves-box').show();
    $('textarea').prop('disabled', false);
    $('.note-title').prop('disabled', false);
    showEditorSection();
}

//Customizing editor view for others' notes
function adjustOtherEditor(note) {
    $('.addID').val(note._id);
    $('.note-title').val(note.title);
    $('textarea').val(note.body);
    $('.saves-box').hide();
    $('textarea').attr('disabled', 'disabled');
    $('.note-title').attr('disabled', 'disabled');
}

//Define functions in *************************PROFILE SECTION*************************

//Displaying username
function displayUsername(account) {
    const username = account.username;
    $('.username').text(username)
}

//Displaying other username
function displayOtherUsername(username) {;
    $('.username').text(username)
}

//Getting notes of a user
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

//Displaying notes that shared to public
function displayPublicNotes(notes) {
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
<button type='submit' class='function-icon openNoteSmall-js'><img src='../images/edit-icon.png' alt='edit note icon' title='edit note' /></button>
</form>

<form class='save-private-note-form'>
<input type='hidden' class='save-private-note-id' value='${note._id}'>
<button type='submit' class='function-icon save-private-js'><img src='../images/save-private-icon.png' alt='save note to home icon' title='move note to home' /></button>
</form>

<form class='delete-note-form'>
<input type='hidden' class='delete-note-id' value='${note._id}'>
<button type='submit' class='function-icon delete-js'><img src='../images/trash-icon.png' alt='delete note icon' title='delete note' /></button>
</form>
</div>
</div>`)
        }
    });
}

//Displaying other users' note that shared to public
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
<button type='submit' class='function-icon openNoteSmall-js'><img src='../images/edit-icon.png' alt='edit note icon' title='edit note' /></button>
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

//Getting all usernames
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

//Displaying all users
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
<img class='avatar' src='./images/avatar.png' alt='avatar'>
<p class='ataNoteUsername'>${user}</p>
</a>`)
    })
}

//Displaying a user's profile
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



//Sections hide and show
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
//Receiving user registration in landing-page.html and send it to process function
//Input values will not be null because HTML <input required: true>
$('#registration').submit(event => {
    event.preventDefault();
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const email = $('#email').val();
    const username = $('#username').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    processRegistration(firstName, lastName, email, username, password, confirmPassword);
});

//Listeners in login
//Receving login data, send data to database, direct to home page of the user or error
//input values will not be null because HTML <input required: true>
$('.login').submit(event => {
    event.preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();
    processLogin(username, password);
});

//When editing note in editor
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

//When saving note to public
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
        .done(function (note) {
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//When saving note privately
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
        .done(function (note) {
            showHomeSection();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
})

//When deleting a note
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

//Listeners in editor
//Receiving note
$('#note-form').submit(event => {
    event.preventDefault();
    let id = $('.addID').val();
    let actionValue = $('input[name=action]:checked').val();
    let titleValue = $('.note-title').val();
    let bodyValue = $('#note').val();
    let note = {
        'title': titleValue,
        'body': bodyValue,
        'type': actionValue,
        'username': account.username
    }
    if (id == '0') {

        $.ajax({
                method: 'POST',
                url: '/user/notes',
                dataType: 'json',
                data: JSON.stringify(note),
                contentType: 'application/json'
            })
            .done(function (note) {
                showHomeSection();
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    }
    else {
        note._id = id;
        processNote(note);
    };
})

//Listeners in profile
//Listeners in world
$('.ataNoteUsers').on('click', '.ataNoteUser', event => {
    let userSelected = $(event.target).closest('a').attr('id');
    getUserProfile(userSelected);
})

//When opening a note
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
