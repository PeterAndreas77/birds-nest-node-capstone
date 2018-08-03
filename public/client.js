'use strict';


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
                    localStorage.setItem('signedInUser', result.username);
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
                    localStorage.setItem('signedInUser', result.username);
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
                displayRecentStories(results);
            })
            // if ajax call failed, show error on terminal
            .fail((err) => {
                console.log(err);
            })
    }
    // display recent stories into the DOM
    function displayRecentStories(stories) {
        let recentStories = [];
        for (let index in stories) {
            recentStories +=
                `<div class="story-item">
                <h4 class="story-title">${stories[index].title}</h4>
                <h6 class="story-location">${stories[index].location}</h6>
                <p class="story-content">${stories[index].content}</p>
                <p class="story-info">created: ${stories[index].date}, 
                by: ${stories[index].author}</p>
                </div>`;
        };
        $('.recent-stories-wrapper').append(recentStories);
    }

    //****************************/
    // MY STORIES PAGE
    //**************************/
    // handle when user want to see their own stories
    $('#my-stories').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getMyStories(myname);
        $('#recent-stories-view').hide();
        $('#my-stories-view').show();
    });
    // get user stories by making ajax call to the server
    function getMyStories(myname) {
        // make an object for the call
        $.ajax({
            type: 'GET',
            url: `/mystories/${myname}`,
            dataType: 'json',
            contentType: 'application/json'
        })
            // if the call is successful, display user stories
            .done((result) => {
                displayMyStories(result);
            })
            // if the call failed, log the error
            .fail((err) => {
                console.log(err);
            });
    }
    // render my stories in the DOM
    function displayMyStories(stories) {
        let myname = localStorage.getItem('signedInUser');
        let myStories = [];
        for (let index in stories) {
            if (stories[index].author === myname) {
                stories[index].author = 'Me';
            }
            myStories +=
                `<div class="story-item" story-id="${stories[index].id}">
                <h4 class="story-title">${stories[index].title}</h4>
                <h6 class="story-location">${stories[index].location}</h6>
                <p class="story-content">${stories[index].content}</p>
                <p class="story-info">created: ${stories[index].date}, 
                by: ${stories[index].author}</p>
                <button class="edit-btn">edit</button>
                <button class="delete-btn">delete</button>
                </div>`;
        };
        $('.my-stories-wrapper').append(myStories);
    }
    // handle when user wanted to update their stories
    $('.my-stories-wrapper').on('click', '.edit-btn', event => {
        let updateID = $(event.currentTarget).closest('.story-item').attr('story-id');
        localStorage.setItem('updateID', updateID);
        $('#my-stories-view').hide();
        $('#update-story-view').show();
    });
    $('.update-form').submit(event => {
            event.preventDefault();
            const storyTitle = $('#updateTitle').val();
            const storyLocation = $('#updateLocation').val();
            const storyContent = $('#updateContent').val();
            const updateID = localStorage.getItem('updateID');
            const updateObject = {
                storyTitle: storyTitle,
                storyLocation: storyLocation,
                storyContent: storyContent
            }
            console.log(updateObject);
            $.ajax({
                type: 'PUT',
                url: `/story/${updateID}`,
                data: JSON.stringify(updateObject),
                dataType: 'json',
                contentType: 'application/json'
            }).done(result => {
                console.log('story updated');
            }).fail(err =>
                console.log(err));
    });

    // handle when user want to delete their stories
    $('.my-stories-wrapper').on('click', '.delete-btn', event => {
        let deleteID = $(event.currentTarget).closest('.story-item').attr('story-id');
        $.ajax({
            type: 'DELETE',
            url: `/story/${deleteID}`,
            dataType: 'json',
            contentType: 'application/json'
        }).done(result => {
            console.log('story deleted');
        }).fail(err =>
            console.log(err));
    });

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
        const storyAuthor = localStorage.getItem('signedInUser');
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

    //****************************/
    //  SEARCH LOCATION PAGE
    //**************************/
    // handle when user want to search for stories
    $('#search-stories-by-loc').click(() => {
        $('#recent-stories-view').hide();
        $('#search-loc-view').show();
    });
    // handle when user submitted their search queries
    $('.search-loc-form').submit(event => {
        event.preventDefault();
        let query = $('#search').val();
        $.ajax({
            type: 'GET',
            url: `/stories/location/${query}`,
            dataType: 'json',
            contentType: 'application/json'
        })
            // if the call is successful, display user stories
            .done((result) => {
                console.log(result);
                //display(result);
            })
            // if the call failed, log the error
            .fail((err) => {
                console.log(err);
            });
    });

    // function displaySearchQueries(data) {
    //     for (let i in data) {
    //         $('.search-view').append(`<p><a class="story-item">${data[i].title}</a></p>
    //     <p><a>${data[i].content}</a></p>`);
    //     }
    // }

    // handle logout
    $('#logout').on('click', event => {
        localStorage.removeItem('signedInUser');
        $('#user-page').hide();
        $('#landing-page').show();
    });

});