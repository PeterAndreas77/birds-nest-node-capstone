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
        $('.content').append(`<p><a>${stories[index].title}</a></p>`);
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
        $('.content').append(`<p><a>${myStories[i].title}</a></p>
        <p><a>${myStories[i].content}</a></p>`);
    }
}
// get my stories when I click on my stories
function getAndDisplayMyStories() {
    $('#my-stories').on('click', ()=>{
        getMyStories(displayMyStories);
    })
}

function addStories() {
    
}


$(function getter(){
    getAndDisplayRecent();
    getAndDisplayMyStories();
});


$(getter());