import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cors from 'cors'

import setRoutes from './routes';

const app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/ui', express.static(path.join(__dirname, '../public')));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const main = async (): Promise<any> => {
  try {
    setRoutes(app);
    app.listen(app.get('port'), () => console.log(`listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

main();

export { app }