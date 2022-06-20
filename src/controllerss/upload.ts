
import { Request, Response } from 'express';


export default {
  upload(req: Request, res: Response) {
    res.json({
      code: 0,
      data: req.file
    })
  }
};

