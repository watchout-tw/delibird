const CronJob = require('cron').CronJob
const config = require('./config/config')
const dataCenter = require('./service/dataCenter')
const mail = require('./service/mail')
const templateManager = require('./service/templateManager')

const isImmediatelyStartJob = true
const doWhenJobStop = null
const makeEmail = async () => {
    console.log('make email now')
    let personaList = await dataCenter.getpersonaList()
    let commonData = await dataCenter.getCommonData()
    
    personaList.forEach( async (persona) => {
        let privateData = await dataCenter.getPrivateData(persona)
        let html = await templateManager.render(commonData, privateData)
        let mailOptions = {
            from: config.email.from, // sender address
            to: persona.email, // list of receivers
            subject: config.email.subject, // Subject line
            html: html
        };
        mail.sendMail(mailOptions)
    });
}

const job = new CronJob(config.schedule.loopPeriod, makeEmail, doWhenJobStop, isImmediatelyStartJob, config.schedule.timezone)
