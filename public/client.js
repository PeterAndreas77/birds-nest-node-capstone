"use strict";

function handleLogout() {
    $('#logout').on('click', event=>{
        event.preventDefault();
        $('#user-page').hide();
        $('#landing-page').show();
    })
}


let FAKE_DATA = {
    "recentStories": [
      {
        "id": "1",
        "title": "Mercury",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, soluta.",
        "author": "Mark Twain",
        "created": Date.now()
      },
      {
        "id": "2",
        "title": "Venus",
        "content": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, voluptas!",
        "author": "Ernest Hemingway",
        "created": Date.now()
      },
      {
        "id": "3",
        "title": "Earth",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, deleniti!",
        "author": "Charles Dickens",
        "created": Date.now()
      },
      {
        "id": "4",
        "title": "Mars",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, modi?",
        "author": "William Shakespeare",
        "created": Date.now()
      },
      {
        "id": "5",
        "title": "Jupiter",
        "content": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, nesciunt.",
        "author": "George Orwell",
        "created": Date.now()
      },
      {
        "id": "6",
        "title": "Saturn",
        "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, accusamus?",
        "author": "Oscar Wilde",
        "created": Date.now()
      }
    ]
  }

// POPULATE ON INITIAL RENDER
// populate beginning with recent stories
function getRecentStories(callbackFunction) {
    setTimeout(function(){callbackFunction(FAKE_DATA)}, 100);
}
// this function stays the same with the data
function displayRecentStories(data) {
    const stories = data.recentStories;
    for (let index in stories) {
        $('.content').append(`<p class="story-item"><a>${stories[index].title}</a></p>`);
    }
}
// populate data with recents
function getAndDisplayRecent() {
    getRecentStories(displayRecentStories);
}

// MY STORIES
// get my data when I click my stories
function getMyStories(callbackFunction) {
    setTimeout(function(){callbackFunction(FAKE_DATA)}, 100);
}
// render my stories in the DOM
function displayMyStories(data) {
    let me = "Oscar Wilde";
    let myStories = [];
    let stories = data.recentStories;
    for(let i in stories) {
        if(stories[i].author == me){
            myStories.push(stories[i]);
        }
    }
    for(let i in myStories){
        $('.content').empty();
        $('.content').append(`<p><a class="story-item">${myStories[i].title}</a></p>
        <p><a>${myStories[i].content}</a></p>`);
    }
}
// get my stories when I click on my stories
function getAndDisplayMyStories() {
    $('#my-stories').on('click', ()=>{
        getMyStories(displayMyStories);
    })
}


// SEARCH STORIES FUNCTIONALITY
// handle when user want to search for stories
function getSearchBar(){
    $('#search-stories').click(()=>{
        $('.content').empty();
        displaySearchBar();
    })
}
// render search bar into the DOM
function displaySearchBar(){
    $('.content').append(`<form class="search-form" action="">
    <fieldset>
      <legend>Search Stories</legend>
      <div class="input-field">
        <label for="search">Search</label>
        <input type="text" id="search" name="search">
      </div>
      <button class="btn-search" type="submit">Submit</button>
    </fieldset>
  </form>
  <section class="search-view">
</section>`);
}
// handle when user submitted their search queries
function handleSearchSubmission(){
    $('.content').submit(event=>{
        event.preventDefault();
        let search = $('#search').val();
        getSearchQueries(search);
    })
}
// get queries from database
function getSearchQueries(search){
    const stories = FAKE_DATA.recentStories;
    const queries = [];
    for(let i in stories){
        if(Object.values(stories[i]).includes(search)){
            queries.push(stories[i]);
        }
    }
    displaySearchQueries(queries);
}
// display queries below search
function displaySearchQueries(data){
    for(let i in data){
        $('.search-view').append(`<p><a class="story-item">${data[i].title}</a></p>
        <p><a>${data[i].content}</a></p>`);
    }
}

function getter(){
    getAndDisplayRecent();
    getAndDisplayMyStories();
    getSearchBar();
    handleSearchSubmission();
    handleLogout();
};

$(getter());

// all handlers can be used when your document is ready
$(document).ready(function(){

    //****************************/
    //  LANDING PAGE
    //**************************/
    // handle when user click start button on landing page
    $('.start-btn').on('click', ()=>{
        $('#landing-page').hide();
        $('#signin-signup-page').show();
    });


    //****************************/
    //  SIGN IN & SIGN UP PAGE
    //**************************/
    // handle when user sign in to the app
    $(".signInForm").submit(event => {
        event.preventDefault();
        //take the input from the user
        const username = $("#signInUsername").val();
        const password = $("#signInPassword").val();
    
        //validate the input
        if (username == "") {
            alert('Please input username');
        } else if (password == "") {
            alert('Please input password');
        }
        //if the input is valid
        else {
            //create the payload object (what data we send to the api call)
            const signinUserObject = {
                username: username,
                password: password
            };
            //console.log(signinUserObject);
    
            //make the api call using the payload above
            $.ajax({
                    type: 'POST',
                    url: '/users/signin',
                    dataType: 'json',
                    data: JSON.stringify(signinUserObject),
                    contentType: 'application/json'
                })
                //if call is succefull
                .done(function (result) {
                    //console.log(result);
                    $("#signin-signup-page").hide();
                    $("#user-page").show();
                    // $('section').hide();
                    // $('.navbar').show();
                    // $('#user-dashboard').show();
                    // $('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    //            htmlUserDashboard();
                    // populateUserDashboardDate(result.username); //AJAX call in here??
                    //                noEntries();
    
                })
                //if the call is failing
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                    alert('Incorrect Username or Password');
                });
        };
      });

    // handle when user sign up for the app
    $(".signUpForm").on("click", event => {
        event.preventDefault();
    
        //take the input from the user
        const username = $("#signUpUsername").val();
        const password = $("#signUpPassword").val();
        const confirmPassword = $("#confirmPassword").val();
    
        //validate the input
        if (username == "") {
            alert('Please add an user name');
        } else if (password == "") {
            alert('Please add a password');
        } else if (password != confirmPassword) {
            alert('The passwords do not match');
        }
        //if the input is valid
        else {
            //create the payload object (what data we send to the api call)
            const newUserObject = {
                username: username,
                password: password
            };
            console.log(newUserObject);
    
            //make the api call using the payload above
            $.ajax({
                    type: 'POST',
                    url: '/users/signup',
                    dataType: 'json',
                    data: JSON.stringify(newUserObject),
                    contentType: 'application/json'
                })
                //if call is succefull
                .done(function (result) {
                    console.log(result);
                    $("#signin-signup-page").hide();
                    $("#user-page").show();
                    // $('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    // $('section').hide();
                    // $('.navbar').show();
                    // $('#user-dashboard').show();
                    // populateUserDashboardDate(result.username);
                })
                //if the call is failing
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
      });

    // handle when user want to click to switch to other form
    $(".flip").on("click", () => {
        $(".card").toggleClass("flipped");
    });

    //****************************/
    //  MAIN USER PAGE
    //**************************/
    // handle when user click menu to open & close side navbar
    $('.toggle-menu').on('click', ()=>{
        $('#navbar').toggleClass('toggle');
        $('#content-container').toggleClass('toggle');
    });

    

    //****************************/
    //  CREATE STORY PAGE
    //**************************/
    // handle when user want to click create story
    $('#create-story').on('click', ()=>{
        $('#recent-container').hide();
        $('#create-story-container').show();
    });

    // handle when user click submit to create new story
    $('.create-form').submit(event => {
        event.preventDefault();

        // get input from the form user filled
        const storyTitle = $('#createTitle').val();
        const storyLocation = $('#createLocation').val();
        const storyContent = $('#createContent').val();
        const storyAuthor = 'demo';
        $('#createTitle').value = '';
        $('#createLocation').value = '';
        $('#createContent').value = '';
        // make a new object to send to the server
        let createdObject = {
            storyTitle: storyTitle,
            storyLocation: storyLocation,
            storyContent: storyContent,
            storyAuthor: storyAuthor,
            storyDate: Date.now(),
            signedInUsername: storyAuthor
        };
        // make a post request to the server
        $.ajax({
            type: 'POST',
            url: '/story/create',
            dataType: 'json',
            data: JSON.stringify(createdObject),
            contentType: 'application/json'
        })
        // if the post request is successful, show recent container
        .done((response) => {
            alert('story has been created!');
            $('#create-story-container').hide();
            $('#recent-container').show();
        })
        // if the post request fail, log the error
        .fail((err) => {
            console.log(err);
        });
    });


});