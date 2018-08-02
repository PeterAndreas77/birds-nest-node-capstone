"use strict";

function handleSignin() {
  $(".btn-signin").on("click", event => {
    event.preventDefault();
    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        //console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                //            htmlUserDashboard();
                populateUserDashboardDate(result.username); //AJAX call in here??
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
    
    $(".signin-login-page").hide();
    $(".user-page").show();
  });
}

function handleSignup() {
  $(".btn-signup").on("click", event => {
    event.preventDefault();

    //take the input from the user
    const username = $("#name-signup").val();
    const password = $("#pwd-signup").val();
    const confirmPassword = $("#pwd-conf").val();

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
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $(".signin-login-page").hide();
                $(".user-page").show();
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
}

function handleFlip() {
  $(".flip").on("click", () => {
    $(".card").toggleClass("flipped");
  });
}

function handleNav(){
    $('.toggle-menu').on('click', ()=>{
        $('.navbar').toggleClass('toggle');
        $('.content-box').toggleClass('toggle');
    })
}
function handleStart(){
    $('.btn-start').on('click', ()=>{
        $('.landing-page').hide();
        $('.signin-login-page').show();
    })
}
function handleLogout() {
    $('#logout').on('click', event=>{
        event.preventDefault();
        $('.user-page').hide();
        $('.landing-page').show();
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

// ADD STORY FUNCTIONALITY
// handle event when user click 'add story'
function getAddForm() {
    $('#add-story').click(()=>{
        $('.content').empty();
        displayAddForm();
    })
}
// display add story form
function displayAddForm(){
    $('.content').append(`<form class="add-form" action="">
    <fieldset>
      <legend>Add Your Story</legend>
      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" name="title">
      </div>
      <div class="input-field">
        <div><label for="content">Story</label></div>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
      </div>
      <button type="submit" class="btn-add">submit</button>
    </fieldset>
  </form>`);
}

// submit user stories PROBLEM HERE
function handleStorySubmission() {
    $('.content').submit(event => {
        event.preventDefault();
        let obj = {};
        obj.id = "xxx";
        obj.title = $('#title').val();
        obj.content = $('#content').val();
        obj.author = "Oscar Wilde";
        obj.date = Date.now();
        FAKE_DATA.recentStories.push(obj);
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
    getAddForm();
    handleStorySubmission();
    getSearchBar();
    handleSearchSubmission();
    handleStart();
    handleSignin();
    handleSignup();
    handleFlip();
    handleNav();
    handleLogout();
};

$(getter());