import { Request, Response } from 'express';
import { DataType } from '@shopify/shopify-api';
import path from 'path';
import shopifyCtrl from './shopify'
import { cvsToJson, formatData } from '../utils'



export default {
  async get(req: Request, res: Response) {
    const client = await shopifyCtrl.getClient(req, res)
    const product = await client.get({
      path: 'products'
    });
    res.json({
      code: 0,
      data: product
    })
  },
  async create(req: Request, res: Response) {
    const { path: CvsPath } = req.body
    const data = await cvsToJson(path.join(process.cwd(), CvsPath))
    const CvsData = formatData(data)
    const client = await shopifyCtrl.getClient(req, res)

    const story: boolean[] = await Promise.all(CvsData.map(async (item) => {
      try {
        await client.post({
          path: 'products',
          data: { product: item },
          type: DataType.JSON
        })
        return true
      } catch (err) {
        return false
      }
    }))
    res.json({
      code: 0,
      data: {
        success: story.filter(Boolean).length
      }
    })
  }
};

