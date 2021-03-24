const app=require("express");
const router=app.Router();
const reg =require("../controllers/userController");
const valid=require("../middleware/validations");
router.post("/signup",valid.regvalidations,reg.signup);
router.post("/login",valid.loginvalid,reg.login);

module.exports =router;