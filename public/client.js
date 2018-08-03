'use strict';

function handleLogout() {
    $('#logout').on('click', event => {
        event.preventDefault();
        $('#user-page').hide();
        $('#landing-page').show();
    })
}

// SEARCH STORIES FUNCTIONALITY
// handle when user want to search for stories
function getSearchBar() {
    $('#search-stories').click(() => {
        $('.content').empty();
        displaySearchBar();
    })
}
// render search bar into the DOM
function displaySearchBar() {
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
function handleSearchSubmission() {
    $('.content').submit(event => {
        event.preventDefault();
        let search = $('#search').val();
        getSearchQueries(search);
    })
}
// get queries from database
function getSearchQueries(search) {
    const stories = FAKE_DATA.recentStories;
    const queries = [];
    for (let i in stories) {
        if (Object.values(stories[i]).includes(search)) {
            queries.push(stories[i]);
        }
    }
    displaySearchQueries(queries);
}
// display queries below search
function displaySearchQueries(data) {
    for (let i in data) {
        $('.search-view').append(`<p><a class="story-item">${data[i].title}</a></p>
        <p><a>${data[i].content}</a></p>`);
    }
}

function getter() {
    getSearchBar();
    handleSearchSubmission();
    handleLogout();
};

$(getter());

// all handlers can be used when your document is ready
$(document).ready(function () {

    //****************************/
    //  LANDING PAGE
    //**************************/
    // handle when user click start button on landing page
    $('.start-btn').on('click', () => {
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
                    //$('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    //            htmlUserDashboard();
                    getRecentStories();
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
                .done((result) => {
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
                .fail((jqXHR, error, errorThrown) => {
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
    $('.toggle-menu').on('click', () => {
        $('#navbar').toggleClass('toggle');
        $('#content-container').toggleClass('toggle');
    });
    // get recent stories from the database
    function getRecentStories() {
        $.ajax({
            type: 'GET',
            url: '/stories/recent',
            dataType: 'json',
            contentType: 'application/json'
        })
        // if ajax call is successful, show recent view
        .done((results) => {
            $('#recent-stories-view').show();
            displayRecentStories(results);
        })
        // if ajax call failed, show error on terminal
        .fail((err) => {
            console.log(err);
        })
    }
    // display recent stories into the DOM
    function displayRecentStories(stories) {
        const recentStories = [];
        for (let index in stories) {
            recentStories += `<div class="story-item">
            <h3 class="story-titles"><a>${stories[index].title}</a></h3>
            <p class="story-author">${stories[index].author}</p> 
            <p class="story-date">${stories[index].date}</p>
            <p class="story-content">${stories[index].content}</p>
        </div>`;
        };
        $('.recent-stories-wrapper').append(recentStories);
    }

    //****************************/
    //  MY STORIES PAGE
    //**************************/
    // handle when user want to see their own stories
    // $('#my-stories').on('click', () => {
    //     $('#recent-stories-view').hide();
    //     $('#my-stories-view').show();
    // });
    // // GET user stories by making ajax call to the server
    // function getMyStories(username) {
    //     // if username is empty, then signed in username is username
    //     if (username == "" || username == undefined || username == null) {
    //         username = $('#signedInUsername').val();
    //     }
    //     // make an object for the call
    //     const userObject = { username: username };
    //     console.log(userObject);
    //     // make an ajax call to the server
    //     $.ajax({
    //         type: 'GET',
    //         url: `/stories/${username}`,
    //         dataType: 'json',
    //         data: JSON.stringify(userObject),
    //         contentType: 'application/json'
    //     })
    //     // if the call is successful, display user stories
    //     .done((result) => {
    //         console.log(result);
    //         //displayMyStories(result);
    //     })
    //     // if the call failed, log the error
    //     .fail((err) => {
    //         console.log(err);
    //     });
    // }
    // // render my stories in the DOM
    // function displayMyStories(data) {
    //     for (let i in stories) {
    //         if (stories[i].author == me) {
    //             myStories.push(stories[i]);
    //         }
    //     }
    //     for (let i in myStories) {
    //         $('.content').empty();
    //         $('.content').append(`<p><a class="story-item">${myStories[i].title}</a></p>
    //     <p><a>${myStories[i].content}</a></p>`);
    //     }
    // }

    //****************************/
    //  CREATE STORY PAGE
    //**************************/
    // handle when user want to click create story
    $('#create-story').on('click', () => {
        $('#recent-stories-view').hide();
        $('#create-story-view').show();
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
            // if the post request is successful, show recent stories
            .done((response) => {
                alert('story has been created!');
                $('#create-story-view').hide();
                $('#recent-stories-view').show();
            })
            // if the post request fail, log the error
            .fail((err) => {
                console.log(err);
            });
    });


});