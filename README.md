# ataNote: Designed for note takers who need to take quick edits

ataNote is a responsive notebook app that allows the users to make quick changes
## Screenshots
![Landing page screenshot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/register-section.png)
![Login screen shot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/login-section.png)
![User homepage screen shot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/home-section.png)
![Editor screen shot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/editor-section.png)
![Profile screen shot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/profile-section.png)
![World screen shot](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/world-section.png)

## Use Case

ataNote is designed for note takers to be swift in controling note privacy and collaborating with others


## Initial UX
User Stories
AS A VISITOR, NOT LOGGED IN

* As an initial visitor to the page, I want to quickly land on the web page and takes a second to read what the app does and decide whether or not to create an account to be able to use the app
* As a visitor, I want to create a new account so that I can use the app
(LANDING PAGE--wireframe will have title, logo, a few details about logging in and what the app is about)
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-register-section.jpg)

* As a visitor, I want to be able to recover my account if I forget the login Id or password. (RECOVER PAGE - recover account by email)
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-recover.jpg)

* As a visitor who has already created an account, I want to log in so that I can access my account
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-login-section.jpg)

AS A LOGGED-IN USER
* As a user, I want to set up my new account and see an call-to-action button and status of my account in an instant. In this case, create a note and amount of notes
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-home-section.jpg)

* As a user, I want to create a note and be able to control its privacy before I save it
* As a user, I want to see clear page with minimum distraction while I'm writing notes
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-editor-section.jpg)

* As a user, I want to see other users and check their notes shared to public
![UI Flow handwritten draft](https://github.com/fucata55/ataNote-node-capstone/blob/master/github-images/wireframe-profile-and-world-section.jpg)

## Working Prototype
Find a working prototype with Node at https://atanote-node-capstone.herokuapp.com/ .

## Technical
ataNote was built as two separate parts.

<h3>Front End</h3>
<ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
    <li>jQuery</li>
</ul>
<h3>Back End</h3>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>mLab database</li>
    <li><a href="https://mochajs.org/">Mocha</a> and <a href="http://chaijs.com/">Chai</a> for testing</li>
</ul>
<h3>Responsive</h3>
<ul>
    <li>The app is responsive and optimized for both mobile and desktop viewing and use.</li>
</ul>
<h3>Security</h3>
<ul>
    <li>User passwords are encrypted using <a href="https://github.com/dcodeIO/bcrypt.js">bcrypt.js</a>.</li>
</ul>

## Functionality
* Sign up<br>
* Sign in<br>
* Create a note<br>
* Read a note<br>
* Edit a note<br>
* Delete a note<br>
* Control note privacy level<br>
* Create a public profile<br>
* See other users profile<br>
* See other users shared note<br>


## Development Roadmap
Planned additional features and improvements will allow users to:
* Fork other user's notes
* Upload a profile picture
* Upload attachements to editor
* Able to leave a comment
* Able to send messages to other users
* Two users work on the same note in real time
* Share a note to specific user
* Search a user
* Have free editing control in editor section to mimic handwriting freedom
