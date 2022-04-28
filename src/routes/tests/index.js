import express from 'express';
import fs from 'fs';

export const testsRouter = express.Router();

const json = JSON.parse(fs.readFileSync('data/tests.json'));

testsRouter.get('/', async (request, response) => {
    response.status(200).json(json);
});