'use strict';

function differenceInDays(start, end) {
    let startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
        endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()),
        duration = Math.floor((endUTC - startUTC) / (1000 * 60 * 60 * 24));
    return duration;
}

function formatDate(anyDate) {
    let date = new Date(anyDate),
        dd = date.getUTCDate(),
        mm = date.getUTCMonth() + 1,
        yyyy = date.getUTCFullYear();
    if (dd < 10) {
        dd = '0' + dd;
        if (mm < 10) {
            mm = '0' + mm;
        }
    }
    date = mm + "-" + dd + "-" + yyyy;
    return date;
}

function createMyFlightHistory(newHistObj, id) {
    $.ajax({
        type: 'PUT',
        url: `/flighthistory/${id}`,
        data: JSON.stringify(newHistObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan updated');
            // const username = localStorage.getItem('signedInUser');
            // getMyFlightPlans(username);
            // $('#update-flight-plan-view').hide();
            // $('#my-flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function getMyFlightPlans(myname) {
    $.ajax({
        type: 'GET',
        url: `/flightplan/${myname}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(result => renderMyFlightPlans(result))
        .fail((err) => console.log(err));
}

function renderMyFlightPlans(plans) {
    let myFlightPlans = [];
    for (let index in plans) {
        let created = formatDate(plans[index].created);
        myFlightPlans +=
            `<div class="plan-item" plan-id="${plans[index].id}">
            <h4 class="plan-country">Country: ${plans[index].country}</h4>
            <p class="plan-location">Location: ${plans[index].location}</p>
            <p class="plan-budget">duration: ${plans[index].duration} days, from ${plans[index].date.start} to ${plans[index].date.end}</p>
            <p class="plan-info">created: ${created}</p>
            <button class="visited-btn">visited</button>
            <button class="edit-btn">edit</button>
            <button class="delete-btn">delete</button>
            </div>`;
    };
    $('.my-flight-plans-wrapper').html(myFlightPlans);
}

function searchMyFlightPlans(place, author) {
    $.ajax({
        type: 'GET',
        url: `/flightplan/${author}/${place}`,
        dataType: 'json',
        contentType: 'application.json'
    })
        .done(result => {
            if (result == undefined || result.length == 0) {
                $('.my-flight-plans-wrapper').html('No plans in that country or location were found!')
            }
            else {
                renderMyFlightPlans(result);
            }
        })
        .fail(err => console.log(err));
}

function createMyFlightPlan(newObj) {
    $.ajax({
        type: 'POST',
        url: '/flightplan/create',
        dataType: 'json',
        data: JSON.stringify(newObj),
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan created');
            const username = localStorage.getItem('signedInUser');
            getMyFlightPlans(username);
            $('#create-flight-plan-view').hide();
            $('#my-flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function updateMyFlightPlan(updObj, id) {
    $.ajax({
        type: 'PUT',
        url: `/flightplan/${id}`,
        data: JSON.stringify(updObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan updated');
            const username = localStorage.getItem('signedInUser');
            getMyFlightPlans(username);
            $('#update-flight-plan-view').hide();
            $('#my-flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function deleteMyFlightPlan(id) {
    $.ajax({
        type: 'DELETE',
        url: `/flightplan/${id}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan deleted');
            const username = localStorage.getItem('signedInUser');
            getMyFlightPlans(username);
        })
        .fail(err => console.log(err));
}

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
                    getMyFlightPlans(localStorage.getItem('signedInUser'));
                    // $('section').hide();
                    // $('.navbar').show();
                    // $('#user-dashboard').show();
                    //$('#loggedInName').text(result.name);
                    // $('#loggedInUserName').val(result.username);
                    //            htmlUserDashboard();
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

    //****************************/
    // FLIGHT PLANS HANDLERS
    //**************************/
    // handle when user want to see their flight plans
    $('#my-flight-plans').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getMyFlightPlans(myname);
        $('#flight-plans-view').show();
    });

    // handle when user want to search plan by country
    $('.search-plan-btn').on('click', () => {
        let place = $('#searchPlace').val(),
            author = localStorage.getItem('signedInUser');
        searchMyFlightPlans(place, author);
    })

    // handle when user want to click create new flight plan
    $('#create-flight-plan').on('click', () => {
        $('#my-flight-plans-view').hide();
        $('#create-flight-plan-view').show();
    });

    // handle when user click submit to create new story
    $('.create-plan-form').submit(event => {
        event.preventDefault();
        let country = $('#createCountry').val(),
            location = $('#createLocation').val(),
            startDate = new Date($('#createStartDate').val()),
            endDate = new Date($('#createEndDate').val()),
            duration = differenceInDays(startDate, endDate),
            author = localStorage.getItem('signedInUser'),
            startStr = formatDate(startDate),
            endStr = formatDate(endDate);
        const createdObject = {
            country: country,
            location: location,
            date: { start: startStr, end: endStr },
            duration: duration,
            author: author
        };
        createMyFlightPlan(createdObject);
    });

    // handle when user click edit button to update their stories
    $('.my-flight-plans-wrapper').on('click', '.edit-btn', event => {
        let updateID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        localStorage.setItem('updateID', updateID);
        $('#my-flight-plans-view').hide();
        $('#update-flight-plan-view').show();
    });

    // handle the submission of flight plan update form
    $('.update-plan-form').submit(event => {
        event.preventDefault();
        let country = $('#updateCountry').val(),
            location = $('#updateLocation').val(),
            startDate = new Date($('#updateStartDate').val()),
            endDate = new Date($('#updateEndDate').val()),
            duration = differenceInDays(startDate, endDate),
            updateID = localStorage.getItem('updateID'),
            startStr = formatDate(startDate),
            endStr = formatDate(endDate);
        const updateObject = {
            id: updateID,
            country: country,
            location: location,
            date: { start: startStr, end: endStr },
            duration: duration
        };
        updateMyFlightPlan(updateObject, updateID);
    });

    // handle when user want to delete their flight plan
    $('.my-flight-plans-wrapper').on('click', '.delete-btn', event => {
        let deleteID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        deleteMyFlightPlan(deleteID);
    });

    // handle when user check visited if they did their flight plan
    $('.my-flight-plans-wrapper').on('click', '.visited-btn', event => {
        let visitID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        localStorage.setItem('visitID', visitID);
        $('#my-flight-plans-view').hide();
        $('#create-flight-history-view').show();
    });

    //handle when user created a new flight history
    $('.create-history-form').submit(event => {
        event.preventDefault();
        let title = $('#createTitle').val(),
            rating = $('#createRating').val(),
            story = $('#createStory').val(),
            visitID = localStorage.getItem('visitID');
        const newHistory = {
            id: visitID,
            title: title,
            rating: rating,
            story: story,
            visited: true
        };
        createMyFlightHistory(newHistory, visitID);
    });

    // handle logout
    $('#logout').on('click', event => {
        localStorage.removeItem('signedInUser');
        $('#user-page').hide();
        $('#landing-page').show();
    });
});