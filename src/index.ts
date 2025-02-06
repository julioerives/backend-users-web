import { config } from "dotenv";
import { Main } from "./main";
config()

const main: Main = new Main();
main.startServer(process.env.PORT || 3000);