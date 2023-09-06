const nodemailer=require('nodemailer')

const tranport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"chiranjsutariya372@gmail.com",
        pass:"gzkmiipgfaxvinrw"
    }
})

module.exports=tranport