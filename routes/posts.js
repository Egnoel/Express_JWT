const router = require("express").Router();
const verify = require('./verifyToken');

//private route with middleware
router.get('/',verify, (req, res)=>{
    res.json({
        posts:{
            title:"my firts post",
            description:"Random data you shouldnt access"
        }
    });
});



module.exports = router;