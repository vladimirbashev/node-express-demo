import express, {Response, Request, NextFunction} from "express"


const userRouter = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time users:', Date.now());
    next();
})

userRouter.post("/login", (req: Request, res: Response) => {
    res.send("login");
})

userRouter.post("/register", (req: Request, res: Response) => {
    res.send("register");
})

userRouter.get("", (req: Request, res: Response) => {
    res.json({
        users: [
            {id: 1, loginname: 'admin'}
        ]
    });
})


export { userRouter }
