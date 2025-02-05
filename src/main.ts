import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from 'cors';
export class Main{
    private app = express();
    constructor(){
        this.middelwares();
        this.routes();
    }
    private middelwares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(validateToken);
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            next();
        });

    }
    private routes(){

    }
    public startServer(port: number | string){
        this.app.listen(port, () => console.log(`Server is running on port ${port}`));
    }
}