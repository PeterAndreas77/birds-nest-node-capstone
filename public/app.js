// function handleSignin() {
//   $(".btn-signup").on("click", event => {
//     event.preventDefault();
//     $(".landing-page").hide();
//     $(".user-page").show();
//   });
// }

// function handleLogin() {
//   $(".btn-login").on("click", event => {
//     event.preventDefault();
//     $(".landing-page").hide();
//     $(".user-page").show();
//   });
// }

// function handleFlip() {
//   $(".flip").on("click", () => {
//     $(".card").toggleClass("flipped");
//   });
// }

// function handler() {
//   handleSignin();
//   handleLogin();
//   handleFlip();
// }
// $(handler);

"use strict";
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
        $('.content-view').append(`<p class="story-item"><a>${stories[index].title}</a></p>`);
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
        $('.content-view').empty();
        $('.content-view').append(`<p><a class="story-item">${myStories[i].title}</a></p>
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
        $('.content-view').empty();
        displayAddForm();
    })
}
// display add story form
function displayAddForm(){
    $('.content-view').append(`<form class="add-form" action="">
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
    $('.content-view').submit(event => {
        event.preventDefault();
        let obj = {};
        obj.id = "xxx";
        let title = $('#title').val();
        obj.content = $('#content').val();
        obj.author = "Oscar Wilde";
        obj.date = Date.now();
        console.log(obj);
        FAKE_DATA.recentStories.push(obj);
    })
}

// SEARCH STORIES FUNCTIONALITY
// handle when user want to search for stories
function getSearchBar(){
    $('#search-stories').click(()=>{
        $('.content-view').empty();
        displaySearchBar();
    })
}
// render search bar into the dom
function displaySearchBar(){
    $('.content-view').append(`<form class="search-form" action="">
    <fieldset>
      <legend>Search Stories</legend>
      <div class="input-field">
        <label for="query">Search</label>
        <input type="text" id="query" name="query">
      </div>
      <div class="input-field">
        <label for="by">By</label>
        <select name="by" id="by">
          <option value="author">author</option>
          <option value="title">title</option>
          <option value="date">date</option>
        </select>
      </div>
      <button class="btn-search" type="submit">Submit</button>
    </fieldset>
  </form>`);
}
// function handleSearchQueries(){
//     $('.content-wrapper').
// }

function getter(){
    getAddForm();
    handleStorySubmission();
    getSearchBar();
    getAndDisplayRecent();
    getAndDisplayMyStories();
};

$(getter());