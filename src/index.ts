import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

// const cors = require('cors')
// import cors from 'cors';
const PORT = process.env.PORT || 8080;
// create an instance server
const app: Application = express();

//Rout Files
// import articels from './routes/articels';
// import users from './routes/users';

// HTTP request logger middleware
app.use(morgan('dev'));
// app.use(cors());
app.use(express.json());

// add routing for / path
app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Hello World 🌍",
    });
});

// start express server
const server = app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});

//Handle Unhandled Promise Rejections
void process.on('unhandledRejection', (error) => {
    //log some exception
    console.log(`--Error: ${error}`);
    //Close Server & Exit Process
    server.close(() => process.exit(1));
});

export default app;
