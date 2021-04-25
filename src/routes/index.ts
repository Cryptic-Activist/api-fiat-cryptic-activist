import { Application } from 'express';

import fiats from './fiats';

export default (app: Application): void => {
  app.use('/fiats', fiats);
};
