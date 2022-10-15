import express from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';
import path from 'path'

import { config } from './common/config';

import apiRoutes from './routes'
import shopifyRoutes from './routes/shopify'
import shopifyService from './services/shopify/shopify.service';

if(config.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

shopifyService.ShopifyInit()
// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
// generate client

app.use(express.static(path.join(__dirname, '../client/build')))

app.use('/', shopifyRoutes)
app.use('/api', apiRoutes)

app.listen(3000, () => {
  console.log('your app is now listening on port 3000');
});