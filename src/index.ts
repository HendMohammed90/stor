import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import errorHandler from './middleware/error';


// create an instance server
const app: Application = express();


const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message : "Too Many Request From That IP Try Again After An Hour",
})


//Rout Files
// import articels from './routes/articels';
// import users from './routes/users';

// Some of Useful middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);

// Add routing for main Path
app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: "Hello World 🌍",
    });
});



// app.use(errorHandler);
app.use((_req:Request , res:Response)=>{
    res.status(400).json({
        Message : "Some Thing bad Has Happened Pleas Back To The Documentation"
    })
})

const PORT = process.env.PORT || 8080;

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
