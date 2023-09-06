const passport = require("passport")
const user = require("../model/shcema")
const tranport = require("../config/email")

const homepage = (req, res) => {
    res.render('index')
}
const home = (req, res) => {
    res.render('index')
}
const singup = (req, res) => {
    res.render('singup')
}
const session = (req, res) => {
    if (req.session.visit) {
        (req.session.visit++)
        res.send(`visit ${req.session.visit}`)
    }
    else {
        req.session.visit = 1;
        res.send(`visit ${req.session.visit}`)
    }
}
const login = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    // await user.save();            
    await user.create(req.body)
    res.cookie('token', username)
    res.render('index')

}
const loginget = (req, res) => {
    res.render('login')
}
const loginpost = async (req, res) => {
    // console.log(req.body);
    // res.render('index')
    res.render('blog')
}
const getblog = (req, res) => {
    res.render('blog')
}
const postblog = async (req, res) => {
    req.user.blog.push(req.body)
    await user.findByIdAndUpdate(req.user.id, req.user)
    console.log(req.body);
    res.send('welcome')
}
const blogpage = async (req, res) => {
    const show = await user.find(req.user)
    res.status(200).json({
        Blog: (show.map((item) => (req) ? item.blog : ''))
    })

}

const password=(req,res)=>{
    res.render('password')
}
const patchpassword= async (req,res)=>{
    let userpassword=await user.findById(req.user.id)

    if(userpassword.password !== req.body.oldpassword) return res.json({success:false, message:"old password is incorrect"})

    if(req.body.newpassword !== req.body.confirmpassword    ) return res.json({success:false, message:"new password is incorrect"})

    userpassword.password = req.body.newpassword

    await userpassword.save()

    res.json({success:true})
}
const otp=Math.floor(Math.random()*10000)
const mail=(req,res)=>{
    const sendmail={
        form:"chiranjsutariya372@gmail.com",
        to:"chiranjsutariya372@gmail.com",
        subject:"testing node mail",
        html:`<a href="localhost:/8080/email/verifyotp/${otp}">${otp}</a>`
    }
    tranport.sendMail(sendmail,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("welcome");
        }
    })
}

const verifyotp=async(req, res)=>{
    if(req.params.otp !==otp.toString()){
        res.send("otp is not match");
    }
    else{
        res.send("welcome!");
    }
}


module.exports = { home, login, singup, session, loginget, loginpost, homepage, getblog, postblog, blogpage, password, patchpassword, mail, verifyotp }