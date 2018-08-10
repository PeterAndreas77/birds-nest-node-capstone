'use strict';

//  ----    FLIGHT PLAN FUNCTIONS   ----    //

function getFlightPlans(myname) {
    $.ajax({
        type: 'GET',
        url: `/flight-plan/${myname}`,
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
            `<div class="log-item" plan-id="${plans[index].id}">
            <p>${plans[index].city}, ${plans[index].country}</p>
            <p> ${plans[index].date.start} - ${plans[index].date.end}</p>
            <p>( ${plans[index].duration} days )</p>
            <p>created: ${created}</p>
            <div class="btn-groups">
            <button class="edit-btn">update</button>
            <button class="del-btn">delete</button>
            </div></div>`;
    };
    $('#flight-plans-view').html(myFlightPlans);
}

function searchFlightPlans(place, author) {
    $.ajax({
        type: 'GET',
        url: `/flight-plan/${author}/${place}`,
        dataType: 'json',
        contentType: 'application.json'
    })
        .done(result => {
            if (result == undefined || result.length == 0) {
                $('#flight-plans-view').html('No plans in that country or city were found!')
            }
            else {
                renderFlightPlans(result);
            }
        })
        .fail(err => console.log(err));
}

function createFlightPlan(newObj) {
    $.ajax({
        type: 'POST',
        url: '/flight-plan/create',
        dataType: 'json',
        data: JSON.stringify(newObj),
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan created');
            const username = localStorage.getItem('signedInUser');
            getFlightPlans(username);
            $('#create-plan-view').hide();
            $('#flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function updateFlightPlan(updPlanObj, updPlanID) {
    $.ajax({
        type: 'PUT',
        url: `/flight-plan/update/${updPlanID}`,
        data: JSON.stringify(updPlanObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('plan updated');
            const username = localStorage.getItem('signedInUser');
            getFlightPlans(username);
            $('#update-plan-view').hide();
            $('#flight-plans-view').show();
        })
        .fail(err => console.log(err));
}

function deleteFlightPlan(delPlanID) {
    $.ajax({
        type: 'DELETE',
        url: `/flight-plan/delete/${delPlanID}`,
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


//  ----    FLIGHT LOG FUNCTIONS   ----    //

function getMyFlightPlans(myname) {
    $.ajax({
        type: 'GET',
        url: `/flight-plan/${myname}`,
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
            `<div class="log-item" plan-id="${plans[index].id}">
            <p>${plans[index].city}, ${plans[index].country}</p>
            <p> ${plans[index].date.start} - ${plans[index].date.end}</p>
            <p>( ${plans[index].duration} days )</p>
            <p>created: ${created}</p>
            <div class="btn-groups">
            <button class="log-btn">log</button>
            </div></div>`;
    };
    $('#flight-logs-view').html(myFlightPlans);
}

function searchFlightLogs(place, author) {
    $.ajax({
        type: 'GET',
        url: `/flight-log/${author}/${place}`,
        dataType: 'json',
        contentType: 'application.json'
    })
        .done(result => {
            if (result == undefined || result.length == 0) {
                $('#flight-logs-view').html('No logs in that country or city were found!')
            }
            else {
                renderFlightLogs(result);
            }
        })
        .fail(err => console.log(err));
}

function getFlightLogs(myname) {
    $.ajax({
        type: 'GET',
        url: `/flight-log/${myname}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(result => renderFlightLogs(result))
        .fail((err) => console.log(err));
}

function renderFlightLogs(logs) {
    let myFlightLogs = [];
    for (let index in logs) {
        let created = formatDate(logs[index].created);
        let feathers = '';
        for (let i = 0; i < logs[index].rating; i++) {
            feathers += `<i class="fas fa-feather-alt"></i>`;
        }
        myFlightLogs +=
            `<div class="log-item" log-id="${logs[index].id}">
            <p>${logs[index].title}</p>
            <p>( ${feathers} )</p>
            <p>${logs[index].duration} days in ${logs[index].city}, ${logs[index].country}</p>
            <p>${logs[index].story}</p>
            <p>created: ${created}</p>
            <div class="btn-groups">
            <button class="edit-btn">update</button>
            <button class="del-btn">delete</button>
            </div></div>`;
    };
    $('#flight-logs-view').html(myFlightLogs);
}

function createFlightLog(newLogObj, newLogID) {
    $.ajax({
        type: 'PUT',
        url: `/flight-log/create/${newLogID}`,
        data: JSON.stringify(newLogObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('log created');
            const username = localStorage.getItem('signedInUser');
            getFlightLogs(username);
            $('#create-log-view').hide();
            $('#flight-logs-view').show();
        })
        .fail(err => console.log(err));
}

function updateFlightLog(updLogObj, updLogID) {
    $.ajax({
        type: 'PUT',
        url: `/flight-log/update/${updLogID}`,
        data: JSON.stringify(updLogObj),
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('log updated');
            const username = localStorage.getItem('signedInUser');
            getFlightLogs(username);
            $('#update-log-view').hide();
            $('#flight-logs-view').show();
        })
        .fail(err => console.log(err));
}

function deleteFlightLog(delLogID) {
    $.ajax({
        type: 'DELETE',
        url: `/flight-log/delete/${delLogID}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        .done(() => {
            console.log('log deleted');
            const username = localStorage.getItem('signedInUser');
            getFlightLogs(username);
        })
        .fail(err => console.log(err));
}


//  ----    MISCELLANEOUS FUNCTIONS   ----    //
function resetForms() {
    $('input').val('');
    $('textarea').val('');
}

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

// all handlers can be used when your document is ready
$(document).ready(function () {

    //****************************/
    //  LANDING PAGE
    //**************************/
    // handle when user click start button on landing page
    $('#cta-btn').on('click', () => {
        $('#landing-page').hide();
        $('#inside-pages').show();
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
                    $('.my-username').html(result.username);
                    getFlightPlans(localStorage.getItem('signedInUser'));
                    $('#toggle-nav').show();
                    $('#username-container').show();
                    $('.footer').show();
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
                    $('.my-username').html(result.username);
                    $('#toggle-nav').show();
                    $('#username-container').show();
                    $('.footer').show();
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
    $('#toggle-nav').on('click', () => {
        $('#navbar').toggleClass('toggle');
    });

    //****************************/
    // FLIGHT PLANS HANDLERS
    //**************************/
    // handle when user want to see their flight plans
    $('#my-flight-plans').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getFlightPlans(myname);
        $('#flight-plans').show();
        $('#flight-logs').hide();
    });

    // handle when user want to search plan by location
    $('.search-plan-btn').on('click', () => {
        let place = $('#searchPlan').val(),
            author = localStorage.getItem('signedInUser');
        searchFlightPlans(place, author);
    });

    // handle when user want to click create new flight plan
    $('#create-flight-plan').on('click', () => {
        if ($('#update-plan-view').css('display') == 'block') {
            $('#update-plan-view').hide();
        }
        $('#flight-plans-view').hide();
        $('#create-plan-view').show();
    });

    // handle when user click submit to create new story
    $('#create-plan-form').submit(event => {
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
    // handle when user cancel plan creation
    $('#create-plan-view').on('click', '.cancel-btn', () => {
        document.getElementById('create-plan-form').reset();
        $('#create-plan-view').hide();
        $('#flight-plans-view').show();
    });

    // handle when user click edit button to update their stories
    $('#flight-plans-view').on('click', '.edit-btn', event => {
        let updPlanID = $(event.currentTarget).closest('.log-item').attr('plan-id');
        localStorage.setItem('updPlanID', updPlanID);
        $('#flight-plans-view').hide();
        $('#update-plan-view').show();
    });

    // handle the submission of flight plan update form
    $('#update-plan-form').submit(event => {
        event.preventDefault();
        let country = $('#updateCountry').val(),
            city = $('#updateCity').val(),
            startDate = new Date($('#updateStartDate').val()),
            endDate = new Date($('#updateEndDate').val()),
            duration = differenceInDays(startDate, endDate),
            updPlanID = localStorage.getItem('updPlanID'),
            startStr = formatDate(startDate),
            endStr = formatDate(endDate);
        const updPlanObj = {
            id: updPlanID,
            country: country,
            city: city,
            date: { start: startStr, end: endStr },
            duration: duration
        };
        updateFlightPlan(updPlanObj, updPlanID);
    });
    // handle when user cancel plan update
    $('#update-plan-view').on('click', '.cancel-btn', () => {
        document.getElementById('update-plan-form').reset();
        $('#update-plan-view').hide();
        $('#flight-plans-view').show();
    });
    // handle when user want to delete their flight plan
    $('#flight-plans-view').on('click', '.del-btn', event => {
        let delPlanID = $(event.currentTarget).closest('.log-item').attr('plan-id');
        deleteFlightPlan(delPlanID);
    });


    //****************************/
    // FLIGHT LOGS HANDLERS
    //**************************/
    //  handle when user click my flight logs
    $('#my-flight-logs').on('click', () => {
        let myname = localStorage.getItem('signedInUser');
        getFlightLogs(myname);
        $('#flight-plans').hide();
        $('#flight-logs').show();
    });

    // handle when user want to search log by country
    $('.search-log-btn').on('click', () => {
        let place = $('#searchLog').val(),
            author = localStorage.getItem('signedInUser');
        searchFlightLogs(place, author);
    });

    // handle when user wanted to create new log
    $('#create-flight-log').on('click', event => {
        if ($('#update-log-view').css('display') == 'block') {
            $('#update-log-view').hide();
        }
        let myname = localStorage.getItem('signedInUser');
        getMyFlightPlans(myname);
        $('#flight-logs-view').show();
    });

    // handle when user want to click create new flight plan
    $('#flight-logs-view').on('click', '.log-btn', event => {
        let newLogID = $(event.currentTarget).closest('.log-item').attr('plan-id');
        localStorage.setItem('newLogID', newLogID);
        $('#flight-logs-view').hide();
        $('#create-log-view').show();
    });
    //handle when user created a new flight log from plan
    $('#create-log-form').submit(event => {
        event.preventDefault();
        let title = $('#createTitle').val(),
            rating = $('#createRating').val(),
            story = $('#createStory').val(),
            created = Date.now(),
            newLogID = localStorage.getItem('newLogID');
        const newLogObj = {
            id: newLogID,
            title: title,
            rating: rating,
            story: story,
            created: created,
            visited: true
        };
        createFlightLog(newLogObj, newLogID);
    });
    // handle when user cancelled log creation
    $('#create-log-view').on('click', '.cancel-btn', () => {
        document.getElementById('create-log-form').reset();
        $('#create-log-view').hide();
        $('#flight-logs-view').show();
    });

    // handle when user wanted to update their flight logs
    $('#flight-logs-view').on('click', '.edit-btn', event => {
        $('#flight-logs-view').hide();
        $('#update-log-view').show();
    });
    $('#update-log-form').submit(event => {
        event.preventDefault();
        let title = $('#updateTitle').val(),
            rating = $('#updateRating').val(),
            story = $('#updateStory').val(),
            created = Date.now(),
            updLogID = localStorage.getItem('updLogID');
        console.log(updLogID);
        const updLogObj = {
            id: updLogID,
            title: title,
            rating: rating,
            story: story
        };
        updateFlightLog(updLogObj, updLogID);
    });
    // handle when user cancelled log update
    $('#update-log-view').on('click', '.cancel-btn', () => {
        document.getElementById('create-plan-form').reset();
        $('#update-log-view').hide();
        $('#flight-logs-view').show();
    });

    // handle when user wanted to delete their flight logs
    $('#flight-logs-view').on('click', '.del-btn', event => {
        let delLogID = $(event.currentTarget).closest('.log-item').attr('log-id');
        deleteFlightLog(delLogID);
    });

    // handle how to use modal
    $('#open-how-to').on('click', ()=>{
        $('#how-to-container').show();
    })
    $('#close-how-to').on('click', ()=>{
        $('#how-to-container').hide();
    })

    // handle logout
    $('#logout').on('click', event => {
        localStorage.removeItem('signedInUser');
        $('#user-page').hide();
        $('#landing-page').show();
    });
});