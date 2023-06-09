import { google } from 'googleapis'


function generateRandomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const auth = new google.auth.OAuth2({
    clientId: "323850014625-8pg4qtt491akn8lai8lg9uvsm3igb4d5.apps.googleusercontent.com",
    clientSecret: "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"
})

auth.setCredentials({
    refresh_token: "1//04YlaTxfLrxNGCgYIARAAGAQSNwF-L9Iruz_xWTWaPIzjOIwu3boab94ChY_FtL61y6ijgKA_0wOkSi4jZMhnWBxlVjH72oheqCI"
})

export default async function googleCalendar(start: string, end: string, email: string) {



    const calendar = google.calendar({ version: 'v3', auth, })

    try {
        return await calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            conferenceDataVersion: 1,

            requestBody: {
                summary: "Job Application Interview",

                start: {
                    dateTime: new Date(start).toISOString(),
                    timeZone: "Asia/Manila"
                },
                end: {
                    dateTime: new Date(end).toISOString(),
                    timeZone: "Asia/Manila"
                },
                conferenceData: {
                    createRequest: {
                        requestId: generateRandomString(16),
                        conferenceSolutionKey: { type: "hangoutsMeet" }
                    },

                },
                recurrence: [
                    'RRULE:FREQ=DAILY;COUNT=1'
                ],
                status: "confirmed",
                attendees: [ {
                    email: email
                } ],
                reminders: {
                    useDefault: false,
                    overrides: [ { 'method': 'email', 'minutes': 24 * 60 }, { 'method': 'popup', 'minutes': 10 }, ]
                }
            }
        }, {})


    }
    catch (error) {
        throw new Error(`Could not create event: ${(error as any).message}`);
    }
}