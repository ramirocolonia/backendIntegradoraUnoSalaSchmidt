import {Router} from "express";

const viewsRouter = Router();

viewsRouter.get("/api/chat", (req,res)=>{
    res.render("chat", {})
});

export default viewsRouter;