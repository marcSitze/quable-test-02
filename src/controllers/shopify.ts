import { Request, Response } from "express"
import Shopify, {AuthQuery} from "@shopify/shopify-api";
import path from 'path'

import { config } from "../common/config";

const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};

const { SHOP } = config;

export const getIndex = async (req: Request, res: Response) => {
  // This shop hasn't been seen yet, go through OAuth to create a session
  if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
    // not logged in, redirect to login
   res.redirect(`/login`);
 } else {

  const session = await Shopify.Utils.loadOfflineSession(SHOP);
  console.log('Session: ', session)
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
// Use `client.get` to request the specified Shopify REST API endpoint, in this case `products`.
//    const response = await client.get({
//    path: 'products',
//    });
//    res.json({msg: "Hello world!", response});
//    // Load your app skeleton page with App Bridge, and do something amazing!
//    res.end();

    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
 }
}

export const loginShopify = async (req: Request, res: Response) => {
    let authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      SHOP,
      '/auth/callback',
      false,
    );
    return res.redirect(authRoute);
  };


export const getAuthCallback = async (req: Request, res: Response) => {
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
}