import express, {Response, Request, NextFunction} from "express"
import { userRouter } from "./users/users.ts"

const port = 9000;

const app = express()

app.use((req: Request, res: Response, next) => {
    console.log('Time:', Date.now());
    next();
})

app.use('/hello', (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello');
    next();
})

app.get('/hello', (req: Request, res: Response) => {
    // res.set('Content-Type', 'text/html');
    res.type('text/html');
    res.send('Hello World!');
})

app.get('/error', (req: Request, res: Response) => {
    throw new Error('Error');
})

app.use('/users', userRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500).send(err.message);
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
