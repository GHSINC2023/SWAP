import nodemailer from 'nodemailer'
import { google } from 'googleapis'


/** 
 * Example using Nodemailer with Google Gmail.
 * https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
 * https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
 * 
**/

const oAUth2Client = new google.auth.OAuth2({
    clientId: "323850014625-9bkvkgdb48jr6lctd9oam93mnegsjoeg.apps.googleusercontent.com", // ClientID 
    clientSecret: "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",
    redirectUri: "https://developers.google.com/oauthplayground"
})


oAUth2Client.setCredentials({ refresh_token: "1//04k3t7H0QzLfhCgYIARAAGAQSNwF-L9IrzOSIthKv6sBgaB74yqloWf0R-yRkTgINk3BMOrz21L2ZQRCmQH5fTEIRuv1qMXsqV-k" })
export async function GESend(Email: string, message: string, subject: string) {
    let accounts = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "gspecialistinc@gmail.com", //gmail account you useds to set the project up in google cloud console.
            clientId: "323850014625-9bkvkgdb48jr6lctd9oam93mnegsjoeg.apps.googleusercontent.com", // ClientID 
            clientSecret: "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", // Client Secret
            refreshToken: "1//04k3t7H0QzLfhCgYIARAAGAQSNwF-L9IrzOSIthKv6sBgaB74yqloWf0R-yRkTgINk3BMOrz21L2ZQRCmQH5fTEIRuv1qMXsqV-k", // Refresh Token
            accessToken: "ya29.a0AWY7Ckljugt-NOTaQzOSuptcUGpmfKP6l3_N-4DIr9Uwev190b4Noruwlih_UMsb58_X0RobGjzCQtFgGKe3fqbswOzv2VFJVSXjrTo3hm-qvTkyUkhQzokmCjaC13ZC1XBKIEzyj5IORusfu7-xqai09YH9aCgYKAZcSARISFQG1tDrpukSTLtNadTmT6iD8ZKLLGA0163" // Access Token Variable we defined earlier
        }
    })


    await accounts.sendMail({
        from: "gspecialistinc@gmail.com",
        to: Email,
        subject: subject,
        html: message,

    })

}

export async function Recipient(Email: string, message: string, subject: string) {
    let accounts = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "gspecialistinc@gmail.com", //gmail account you useds to set the project up in google cloud console.
            clientId: "782394693386-gooll1na41pkftagsb1np2d9scleeqfg.apps.googleusercontent.com", // ClientID 
            clientSecret: "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", // Client Secret
            refreshToken: "1//04FXnUOlIxqa7CgYIARAAGAQSNwF-L9Iro9-YzzVboDHkKEZ_5_QTPdfnSVOROlQ9dpBdOJcH4Skc_vFwM1um5nYpGhSaj_CEC4Y", // Refresh Token
            accessToken: "ya29.a0AVvZVsqC9ZrADOemh-V5dBo27O-2-0ohnjDtYhX2UIDfTHoNnKmh_fnibn4XLYAymrPQrazTfaPszQRCr0hOe_ipxdzAAqeKRLiAQbR0qLOVVlAyeZgI9lC7PlByFAwIiYXx9Za3XVixJ7XRCjAxzmvpKPTBaCgYKAdcSARMSFQGbdwaIj99uD19-4a3GlJihv82DCQ0163" // Access Token Variable we defined earlier
        }
    })


    await accounts.sendMail({
        from: "gspecialistinc@gmail.com",
        to: Email,
        subject: subject,
        html: message,

    })

}