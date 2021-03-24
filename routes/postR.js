const app=require("express");
const router=app.Router();
const postController=require("../controllers/postController");
const auth=require("../middleware/auth");
router.post("/createpost",auth.valid,postController.createpost);
router.get("/myposts/:id",auth.valid,postController.fetchposts);
router.get("/allposts",postController.allposts);
router.delete("/deletepost/:id",auth.valid,postController.deletepost);
router.get("/showpost/:slug",postController.showpost);
module.exports =router;