//Middleware for fetching data 'id' from the token assigned to the logined user.
//token='data'+'signature' .....jwt.verify() fetch the 'data' from token
//req.user=data.user........we dynamically add a user object to the req from the 'data' object.

//FORMATE OF 'DATA' IN TOKEN
// const data={
//     user:{
//       id:user.id,
//     }
//   }
var jwt = require('jsonwebtoken');//Authentication Token

const JWT_SECRET="shubham@";

const fetchdata=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"});
    }
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;//we dynamically add a user object to the req from the 'data' object.
    next();
};

module.exports=fetchdata;