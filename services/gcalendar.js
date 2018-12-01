const {
    google
} = require('googleapis');

const JWT_TOKEN_PATH = 'credentials/google-jwt-token.json';
const fs = require('fs')
const calendarId = '39aesjke4pr0spvelmbvfgevkc@group.calendar.google.com'


function calendarInstance(auth) {
    return google.calendar({
        version: 'v3',
        auth
    });
}

/**
 * Create an JWTClient with the given credentials, and then execute the
 * given callback function.
 * @param {Object} service_account The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @return {function} if error in reading credentials.json asks for a new one.
 */
function authorized(service_account, callback) {
    let token = {};
    const jwtClient = new google.auth.JWT(
        service_account.client_email,
        null,
        service_account.private_key, ['https://www.googleapis.com/auth/calendar']);

    // Check if we have previously stored a token.
    try {
        token = JSON.parse(fs.readFileSync(JWT_TOKEN_PATH));
        if (token.expiry_date <= new Date().getTime()) {
            throw "Expired token!";
        } else {
            jwtClient.setCredentials(token)
            callback(jwtClient)
        }
    } catch (err) {

        getAccessToken(jwtClient, callback);
    }

}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(jwtClient, callback) {
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err); // TODO Logging
        } else {
            fs.writeFileSync(JWT_TOKEN_PATH, JSON.stringify(tokens));
            jwtClient.setCredentials(tokens)
            callback(jwtClient);;
        }
    });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, calendarId, callback) {
    const calendar = calendarInstance(auth);
    calendar.events.list({
        calendarId: calendarId,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, {
        data
    }) => {
        if (err) return console.log('The API returned an error: ' + err); // TODO Use logging
        const events = data.items;
        if (events.length) {
            events.forEach((event, i) => {
                callback(event)
            });
        } else {
            callback({
                err: 'No upcoming events found.'
            });
        }
    });
}


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function createEvent(auth,calendarId, event, callback) {
    const calendar = calendarInstance(auth);

    calendar.events.insert({
        calendarId: calendarId,
        resource: event
    }, (err, {
        data
    }) => {
        callback(data);
    });

}

function update(auth, calendarId, event, callback) {
    const calendar = calendarInstance(auth);
    calendar.events.update({
        calendarId: calendarId,
        eventId: event.id,
        resource: event
    }, (err, {
        data
    }) => {
        callback(data);
    });
}

function get(auth, calendarId, id, callback) {
    const calendar = calendarInstance(auth);
    calendar.events.get({
        calendarId: calendarId,
        eventId: id
    }, (err, {
        data
    }) => {
        callback(data);
    });
}

module.exports.participate = (googleConfiguration, id, name, callback) => {
    return authorized(googleConfiguration.credentials, (auth) => {
        get(auth, googleConfiguration.calendarId, id, (event) => {
            const sanitizedName = name.replace(",", " ");
            const split = event.description ? event.description.split(",") : [];
            if(split.includes(sanitizedName)) {
                callback(event);
            }
            else {
                event.description = event.description != null ? event.description + `,${sanitizedName}` : sanitizedName
                update(auth, event, callback)
            }
        });
    });
}

module.exports.upcoming = (googleConfiguration, callback) => {
    return authorized(googleConfiguration.credentials, (auth) => {
        listEvents(auth, googleConfiguration.calendarId, callback)
    });
}

module.exports.insert = (googleConfiguration, event, callback) => {
    return authorized(googleConfiguration.credentials, (auth) => {
        createEvent(auth, googleConfiguration.calendarId, event, callback)
    });
}


//const credentials = require('../credentials/google-credentials.json')
//authorize(credentials, (auth) => console.log(auth));
// Poll events from Google every 15 minutes and compare the diff to current time
// Emit event if there's upcoming event in e.g. 6 hours, 15 mins and so on (Separate module)
//