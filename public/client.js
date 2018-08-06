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
    date = mm + "/" + dd + "/" + yyyy;
    return date;
}


//  ----    HISTORY FUNCTIONS   ----    //
function getFlightHistories(myname) {
    $.ajax({
        type: 'GET',
        url: `/flighthistory/${myname}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(result => renderFlightHistories(result))
        .fail((err) => console.log(err));
}

function renderFlightHistories(histories) {
    let myFlightHistories = [];
    for (let index in histories) {
        let created = formatDate(histories[index].created);
        let feathers = '';
        for (let i = 0; i<histories[index].rating; i++) {
            feathers += `<i class="fas fa-feather-alt"></i>`;
        }
        myFlightHistories +=
            `<div class="history-item" history-id="${histories[index].id}">
            <h4>${histories[index].title}</h4>
            <p>${histories[index].city}, ${histories[index].country}</p>
            <p>from ${histories[index].date.start} to ${histories[index].date.end}</p>
            <p>${histories[index].story}</p>
            <p>rating: ${feathers} created: ${created}</p>
            <button class="edit-btn">edit</button>
            <button class="del-btn">delete</button>
            </div>`;
    };
    $('.my-flight-histories-wrapper').html(myFlightHistories);
}

function createFlightHistory(newHistObj, id) {
    $.ajax({
        type: 'PUT',
        url: `/flighthistory/${id}`,
        data: JSON.stringify(newHistObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan updated');
            const username = localStorage.getItem('signedInUser');
            getFlightHistories(username);
            $('#create-flight-history-view').hide();
            $('#my-flight-plans').show();
        })
        .fail(err => console.log(err));
}

function deleteFlightHistory(id) {
    $.ajax({
        type: 'DELETE',
        url: `/flighthistory/${id}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('history deleted');
            const username = localStorage.getItem('signedInUser');
            getFlightHistories(username);
        })
        .fail(err => console.log(err));
}

function getFlightPlans(myname) {
    $.ajax({
        type: 'GET',
        url: `/flightplan/${myname}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(result => renderFlightPlans(result))
        .fail((err) => console.log(err));
}

function renderFlightPlans(plans) {
    let myFlightPlans = [];
    for (let index in plans) {
        let created = formatDate(plans[index].created);
        myFlightPlans +=
            `<div class="plan-item" plan-id="${plans[index].id}">
            <button class="bird-btn"><i class="fab fa-earlybirds"></i></button>
            <p>${plans[index].city}, ${plans[index].country}</p>
            <p class="plan-budget">duration: ( ${plans[index].duration} days )</p>
            <p> ${plans[index].date.start} - ${plans[index].date.end}</p>
            <p class="plan-info">created: ${created}</p>
            <div class="btn-groups">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="del-btn"><i class="fas fa-trash"></i></button>
            </div></div>`;
    };
    $('.my-flight-plans-wrapper').html(myFlightPlans);
}

function searchFlightPlan(place, author) {
    $.ajax({
        type: 'GET',
        url: `/flightplan/${author}/${place}`,
        dataType: 'json',
        contentType: 'application.json'
    })
        .done(result => {
            if (result == undefined || result.length == 0) {
                $('.my-flight-plans-wrapper').html('No plans in that country or city were found!')
            }
            else {
                renderMyFlightPlans(result);
            }
        })
        .fail(err => console.log(err));
}

function createFlightPlan(newObj) {
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
            getFlightPlans(username);
            $('#create-flight-plan-view').hide();
            $('#my-flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function updateFlightPlan(updObj, id) {
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
            getFlightPlans(username);
            $('#update-flight-plan-view').hide();
            $('#my-flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function deleteFlightPlan(id) {
    $.ajax({
        type: 'DELETE',
        url: `/flightplan/${id}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan deleted');
            const username = localStorage.getItem('signedInUser');
            getFlightPlans(username);
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
                    getFlightPlans(localStorage.getItem('signedInUser'));
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
        getFlightPlans(myname);
        $('#flight-plans-view').show();
    });

    // handle when user want to search plan by country
    $('.search-plan-btn').on('click', () => {
        let place = $('#searchPlan').val(),
            author = localStorage.getItem('signedInUser');
        searchFlightPlan(place, author);
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
            city = $('#createCity').val(),
            startDate = new Date($('#createStartDate').val()),
            endDate = new Date($('#createEndDate').val()),
            duration = differenceInDays(startDate, endDate),
            author = localStorage.getItem('signedInUser'),
            startStr = formatDate(startDate),
            endStr = formatDate(endDate);
        const newPlanObj = {
            country: country,
            city: city,
            date: { start: startStr, end: endStr },
            duration: duration,
            author: author
        };
        createFlightPlan(newPlanObj);
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
            city = $('#updateCity').val(),
            startDate = new Date($('#updateStartDate').val()),
            endDate = new Date($('#updateEndDate').val()),
            duration = differenceInDays(startDate, endDate),
            updateID = localStorage.getItem('updateID'),
            startStr = formatDate(startDate),
            endStr = formatDate(endDate);
        const updPlanObj = {
            id: updateID,
            country: country,
            city: city,
            date: { start: startStr, end: endStr },
            duration: duration
        };
        updateFlightPlan(updPlanObj, updateID);
    });

    // handle when user want to delete their flight plan
    $('.my-flight-plans-wrapper').on('click', '.del-btn', event => {
        let deleteID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        deleteFlightPlan(deleteID);
    });




    // handle when user check visited if they did their flight plan
    $('.my-flight-plans-wrapper').on('click', '.bird-btn', event => {
        let visitID = $(event.currentTarget).closest('.plan-item').attr('plan-id');
        localStorage.setItem('visitID', visitID);
        $('#my-flight-plans-view').hide();
        $('#create-flight-history-view').show();
    });


    //  handle when user click my flight histories
    $('#my-flight-histories').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getFlightHistories(myname);
        $('#flight-plans-view').hide();
        $('#flight-history-view').show();
        $('#flight-histories-view').show();
    });

    //handle when user created a new flight history from plan
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
        createFlightHistory(newHistory, visitID);
    });

    $('.my-flight-histories-wrapper').on('click', '.del-btn', event => {
        let deleteID = $(event.currentTarget).closest('.history-item').attr('history-id');
        deleteFlightHistory(deleteID);
    });

    // handle logout
    $('#logout').on('click', event => {
        localStorage.removeItem('signedInUser');
        $('#user-page').hide();
        $('#landing-page').show();
    });
});