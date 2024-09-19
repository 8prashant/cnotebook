const express =require('express');//to use the express router we need express
const router=express.Router();//We are going to use express router that why router.post()
const User =require('../models/User')//Mongoose scheema Model
const { body, validationResult } = require('express-validator');//Express-validator
const bcrypt = require('bcrypt');//Password Encryption
var jwt = require('jsonwebtoken');//Authentication Token
const fetchdata = require('../middleware/fetchdata');

                                            //Mongoose-Validation(Schema validation)
// router.post('/',(req,res)=>{
//     console.log(req.body);
//     const user=new User(req.body);  //Once req.body is passed to the Mongoose model, Mongoose schema validation takes over. The schema you define in Mongoose includes rules for each field (e.g., data type, required fields, custom validation logic). When you call user.save(), Mongoose automatically validates the document against the schema. If validation fails, Mongoose will throw a validation error.
//     user.save();
//     res.json("hello");
// })

// User.create()---Combines creation and saving into a single step.
// new User() and user.save()---Separates the creation of the instance from saving it to the database.---Provides more flexibility for additional operations before saving.
//Both are same


                                            //Express-validator+Mongoose-Validation
//Mongoose provides basic schema validation, such as required fields, type checking, and uniqueness constraints. However, it doesn't natively validate complex conditions like email format or password strength. This is where express-validator or similar middleware becomes useful.

const JWT_SECRET="shubham@";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  '/createuser',  //We call them end-points
  // Express-validator's Validation rule
  body('name','Enter a valid Name with the minimum length of 5.').isLength({ min: 5 }), // Name and password must be at least 5 chars long
  body('password','Enter a valid Password with the minimum length of 5.').isLength({ min: 5 }),
  body('mail','Enter a valid Mail').isEmail(),  // Mail must be an email

  async (req, res) => {
    // Check wheather the Validator pass or Not and Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:"false", error: "Please try to login with correct credentials" });
    }
    //At this point 1st level i.e express-validaton passed now we have to go for monogoose validation when we call User.create()
    console.log(req.body);
    try{
      const user=await User.findOne({mail:req.body.mail});
      if(user){
          return res.status(400).json({success:"false",errors:"Sorry User with this mail already exit."});
      }

      const salt = bcrypt.genSaltSync(10);//As with async, both techniques achieve the same end-result.
      const encodeedPassword = bcrypt.hashSync(req.body.password, salt);

      const newuser=await User.create({
          name: req.body.name,
          mail: req.body.mail,
          password: encodeedPassword,
      });

      //AUTHENTICATION TOKEN
      const data={
        user:{
          id:newuser.id,
        }
      };
      var authToken = jwt.sign(data, JWT_SECRET);
      res.json({success:"true",authToken:authToken});
      
      // .then(newuser => res.json(newuser))
      // .catch(err=>{console.log("EError::::"+err)
      //     res.json({error:'Please enter a valid Email'})
      // })
    }
    catch(error){
      return res.status(400).json({success:"false",errors:`${error}`});
      // console.log("Error"+error);
    }
  },
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  '/login',
  body('mail','Enter a valid Mail').isEmail(),
  body('password','Enter a valid Password').exists(),

  async (req, res) => {

    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success:"false",errors: errors.array() });
      }

      const { mail, password } = req.body; //Destructuring 

      const user=await User.findOne({mail});
      if(!user){
        return res.status(400).json({success:"false",error: "Please try to login with correct credentials"});
      }

      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success:"false",error: "Please try to login with correct credentials"});
      }

      const data={
        user:{
          id:user.id,
        }
      }

      const authToken=jwt.sign(data,JWT_SECRET);
      res.json({success:"true",authToken:authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success:"false",error:"Internal Server Error"});
    }
  },
);

router.post('/getuser',fetchdata,
  async (req, res) => {
    const user=await User.findById(req.user.id).select("-password");
    res.send({user});
  }
);

module.exports=router;



// validation is a layered process:

// 1.Client-side validation for immediate feedback and reducing unnecessary server requests.
// 2.Middleware validation(Express-Validator) for detailed checks on incoming requests before they hit your application logic.
// 3.Mongoose schema validation as the final defense to ensure data integrity before saving it to the database.