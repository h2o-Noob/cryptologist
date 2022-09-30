//creating token and saving in cookie

const sendtoken = (user, statuscode, res)=>{
  const token = user.getJWTtoken()
  
      res.status(statuscode).json({
          success: true,
          message: "user logged in successfully",
          user,
          token: token
      })
  }
  
  module.exports = sendtoken