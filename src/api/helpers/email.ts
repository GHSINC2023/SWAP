import nodemailer from 'nodemailer'
import { google } from 'googleapis'


/** 
 * Example using Nodemailer with Google Gmail.
 * https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
 * https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a
 * 
**/

const oAUth2Client = new google.auth.OAuth2({
    clientId: "3323850014625-9bkvkgdb48jr6lctd9oam93mnegsjoeg.apps.googleusercontent.com", // ClientID 
    clientSecret: "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",
    redirectUri: "https://developers.google.com/oauthplayground"
})


oAUth2Client.setCredentials({ refresh_token: "1//04qimpdXIQftQCgYIARAAGAQSNwF-L9Ir-OLImyaBd1x9cDGUGCJ6GxXmtH10xRh1MsIkj6IkcJbdmkWmxpiTjUCfgSx3hvy38Yo" })
export async function GESend(Email: string, message: string, subject: string) {
    let accounts = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "gspecialistinc@gmail.com", //gmail account you useds to set the project up in google cloud console.
            clientId: "323850014625-9bkvkgdb48jr6lctd9oam93mnegsjoeg.apps.googleusercontent.com", // ClientID 
            clientSecret: "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", // Client Secret
            refreshToken: "1//04qimpdXIQftQCgYIARAAGAQSNwF-L9Ir-OLImyaBd1x9cDGUGCJ6GxXmtH10xRh1MsIkj6IkcJbdmkWmxpiTjUCfgSx3hvy38Yo", // Refresh Token
            accessToken: "ya29.a0AWY7CkkjaL2AlkjhVos6LNeQCGSIxwPnp-xEGIoN_HJ1RbGcCln7nr5OxwmHDaN7NsY-OW17LhHUfGq_M45V8hOUQMmZqGL-oWEaFvTc2tHn0v0n91LD5Y1hpCfPEUBS5TriTiXrOwFJZ598_fpYkycz1E0YaCgYKAbISARISFQG1tDrpi95Z5E_dwfTvfMigGYwa_A0163" // Access Token Variable we defined earlier
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
            clientId: "323850014625-9bkvkgdb48jr6lctd9oam93mnegsjoeg.apps.googleusercontent.com", // ClientID 
            clientSecret: "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", // Client Secret
            refreshToken: "1//04qimpdXIQftQCgYIARAAGAQSNwF-L9Ir-OLImyaBd1x9cDGUGCJ6GxXmtH10xRh1MsIkj6IkcJbdmkWmxpiTjUCfgSx3hvy38Yo", // Refresh Token
            accessToken: "ya29.a0AWY7CkkjaL2AlkjhVos6LNeQCGSIxwPnp-xEGIoN_HJ1RbGcCln7nr5OxwmHDaN7NsY-OW17LhHUfGq_M45V8hOUQMmZqGL-oWEaFvTc2tHn0v0n91LD5Y1hpCfPEUBS5TriTiXrOwFJZ598_fpYkycz1E0YaCgYKAbISARISFQG1tDrpi95Z5E_dwfTvfMigGYwa_A0163" // Access Token Variable we defined earlier
        }
    })


    await accounts.sendMail({
        from: "gspecialistinc@gmail.com",
        to: Email,
        subject: subject,
        html: message,

    })

}