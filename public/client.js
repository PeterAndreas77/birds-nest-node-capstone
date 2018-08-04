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
                    //getRecentStories();
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
    // handle when user want to see their flight plans
    $('#my-flight-plans').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getMyFlightPlans(myname);
        $('#recent-stories-view').hide();
        $('#my-flight-plans-view').show();
    });

    function getMyFlightPlans(myname) {
        $.ajax({
            type: 'GET',
            url: `/flightplan/${myname}`,
            dataType: 'json',
            contentType: 'application/json'
        })
            .done((result) => { displayMyFlightPlans(result); })
            .fail((err) => { console.log(err); });
    }

    function displayMyFlightPlans(plans) {
        let myFlightPlans = [];
        for (let index in plans) {
            myFlightPlans +=
                `<div class="plan-item" plan-id="${plans[index].id}">
                <h4 class="plan-country">Country: ${plans[index].country}</h4>
                <p class="plan-location">Location: ${plans[index].location}</p>
                <p class="plan-budget">budget: $ ${plans[index].budget}</p>
                <p class="plan-info">created: ${plans[index].created}</p>
                <button class="edit-btn">edit</button>
                <button class="delete-btn">delete</button>
                </div>`;
        };
        $('.my-flight-plans-wrapper').append(myFlightPlans);
    }
    // handle when user wanted to update their stories
    $('.my-flight-plans-wrapper').on('click', '.edit-btn', event => {
        let updateID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        localStorage.setItem('updateID', updateID);
        $('#my-flight-plans-view').hide();
        $('#update-story-view').show();
    });
    // handle the submission of update form
    $('.update-plan-form').submit(event => {
        event.preventDefault();
        const country = $('#updateCountry').val();
        const location = $('#updateLocation').val();
        const budget = $('#updateBudget').val();
        const duration = $('#updateDuration').val();
        const updateID = localStorage.getItem('updateID');
        const updateObject = {
            country: country,
            location: location,
            budget: budget,
            duration: duration
        };
        console.log(updateObject);
        $.ajax({
            type: 'PUT',
            url: `/flightplan/${updateID}`,
            data: JSON.stringify(updateObject),
            dataType: 'json',
            contentType: 'application/json'
        }).done(result => {
            console.log('story updated');
        }).fail(err =>
            console.log(err));
    });

    // handle when user want to delete their flight plan
    $('.my-flight-plans-wrapper').on('click', '.delete-btn', event => {
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
    // CREATE NEW FLIGHT PLAN PAGE
    //**************************/
    // handle when user want to click create new flight plan
    $('#create-flight-plan').on('click', () => {
        $('#recent-stories-view').hide();
        $('#create-flight-plan-view').show();
    });

    // handle when user click submit to create new story
    $('.create-plan-form').submit(event => {
        event.preventDefault();

        // get input from the form user filled
        const country = $('#createCountry').val();
        const location = $('#createLocation').val();
        const budget = $('#createBudget').val();
        const duration = $('#createDuration').val();
        const author = localStorage.getItem('signedInUser');
        $('#createTitle').value = '';
        $('#createLocation').value = '';
        $('#createContent').value = '';
        // make a new object to send to the server
        let createdObject = {
            country: country,
            location: location,
            budget: budget,
            duration: duration,
            author: author
        };
        // make a post request to the server
        $.ajax({
            type: 'POST',
            url: '/flightplan/create',
            dataType: 'json',
            data: JSON.stringify(createdObject),
            contentType: 'application/json'
        })
            // if the post request is successful, show recent stories
            .done((response) => {
                alert('plan has been created!');
                $('#create-flight-plan-view').hide();
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