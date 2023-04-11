import express from 'express';
import cors from 'cors';
// import routes from './routes';

const api = express();
api.use(cors());
api.use(express.json());
// api.use(routes);
api.listen(3334, () => { console.log('Server started on port 3334'); });