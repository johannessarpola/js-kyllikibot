const {
    google
} = require('googleapis');
const JWT_TOKEN_PATH = 'credentials/google-jwt-token.json';
const fs = require('fs')

/**
 * Create an JWTClient with the given credentials, and then execute the
 * given callback function.
 * @param {Object} service_account The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 * @return {function} if error in reading credentials.json asks for a new one.
 */
function authorized(service_account, callback) {
    let token = {};
    const jwtClient = new  google.auth.JWT(
        service_account.client_email,
        null,
        service_account.private_key, ['https://www.googleapis.com/auth/calendar']);

            // Check if we have previously stored a token.
    try {
        token = JSON.parse(fs.readFileSync(JWT_TOKEN_PATH));
        if(token.expiry_date <= new Date().getTime()) {
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
function listEvents(auth, sink) {
    const calendar = google.calendar({
        version: 'v3',
        auth
    });
    calendar.events.list({
        calendarId: '39aesjke4pr0spvelmbvfgevkc@group.calendar.google.com',
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
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                let evt = `${start} - ${event.summary}`
                sink(evt)
            });
        } else {
            sink('No upcoming events found.');
        }
    });
}
module.exports.upcoming = (sink) => {
    const credentials = require('../credentials/google-service-account.json')
    return authorized(credentials, (auth) => {
        listEvents(auth, sink)
    });
}


//const credentials = require('../credentials/google-credentials.json')
//authorize(credentials, (auth) => console.log(auth));
// Poll events from Google every 15 minutes and compare the diff to current time
// Emit event if there's upcoming event in e.g. 6 hours, 15 mins and so on (Separate module)
//