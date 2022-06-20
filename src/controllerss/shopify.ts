

import { Request, Response } from 'express';
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api';

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST } = process.env;

Shopify.Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES: [SCOPES],
  HOST_NAME: HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: HOST.split("://")[0],
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.April22
});

const ACTIVE_SHOPIFY_SHOPS: { [key: string]: string | undefined } = {};
export default {
  async home(req: Request, res: Response) {
    if (ACTIVE_SHOPIFY_SHOPS[SHOP] === undefined) {
      res.redirect(`/login`);
    } else {
      res.redirect(`/ui/index.html`);
    }
  },
  async login(req: Request, res: Response) {
    let authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      SHOP,
      '/auth/callback',
      false,
    );
    return res.redirect(authRoute);
  },
  async auth(req: Request, res: Response) {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query as unknown as AuthQuery,
      );
      ACTIVE_SHOPIFY_SHOPS[SHOP] = session.scope;
    } catch (error) {
      console.error(error);
    }
    return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`);
  },
  async getClient(req: Request, res: Response) {
    const session = await Shopify.Utils.loadCurrentSession(req, res);
    const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
    return client
  }
};

