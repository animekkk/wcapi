import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import SimpleNodeLogger from 'simple-node-logger';
import { groupsRouter, honorsRouter, videosRouter, videoRouter, xayoRouter } from './routes'
import { measure } from './metrics';

export const app = express();

export const log = SimpleNodeLogger.createSimpleLogger({
    logFilePath: 'logs.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

const globalLimiter = rateLimit({
    windowMs: 1000,
    max: 3,
    message: { error: 'Too many requests in one second.' }
});

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
app.use(measure);
app.use(express.static('public'));
app.set('json spaces', 2);
app.set('trust proxy', 1);

app.use('/groupBadges', groupsRouter, globalLimiter);
app.use('/honors', honorsRouter, globalLimiter);
app.use('/videos', videosRouter, globalLimiter);
app.use('/video', videoRouter, globalLimiter);
app.use('/user/xayo', xayoRouter, globalLimiter);

app.get('/', (request, response) => {
    response.status(200).json({ version: process.env.npm_package_version });
});