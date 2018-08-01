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
  function getRecentStories(callbackFunction) {
    setTimeOut(function(){callbackFunction(FAKE_DATA)}, 100);
  }
  // THIS FUNCTION STAYS THE SAME WHEN WE CONNECT TO REAL API LATER
  function displayRecentStories(data) {
    const stories = data.recentStories;
    for (index in stories) {
      $('.content').append(`<a>${stories[index].title}</a>`);
    }
  }
  function getAndDisplayStories(data) {
    getRecentStories(displayRecentStories);
  }
  $(getRecentStories());