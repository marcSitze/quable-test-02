import express from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';
import path from 'path'
import axios from 'axios'

import { config } from './common/config';
import { quableProductsToAdd } from './common/helper';

import apiRoutes from './routes'

if(config.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME } = config;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME,
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.October22 // all supported versions are available, as well as "unstable" and "unversioned"
});
// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};

// the rest of the example code goes here

// app.use(express.static(path.join(__dirname, '../client/build')))

app.get("/", async (req, res) => {
   // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
     // not logged in, redirect to login
    res.redirect(`/login`);
  } else {

   const session = await Shopify.Utils.loadOfflineSession(SHOP);
   console.log('Session: ', session)
   const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
// Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
    const response = await client.get({
    path: 'products',
    });
    res.json({msg: "Hello world!", response});
    // Load your app skeleton page with App Bridge, and do something amazing!
    res.end();

		// res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }
});

app.get('/login', async (req, res) => {
    let authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      SHOP,
      '/auth/callback',
      false,
    );
    return res.redirect(authRoute);
  });

app.get('/auth/callback', async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query as unknown as AuthQuery,
      ); // req.query must be cast to unkown and then AuthQuery in order to be accepted
      ACTIVE_SHOPIFY_SHOPS[SHOP] = session.scope;
      console.log(session.accessToken);
    } catch (error) {
      console.error(error); // in practice these should be handled more gracefully
    }
    return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`); // wherever you want your user to end up after OAuth completes
});

app.use('/api', apiRoutes)

app.listen(3000, () => {
  console.log('your app is now listening on port 3000');
});