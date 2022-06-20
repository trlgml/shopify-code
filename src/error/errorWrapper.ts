import { Request, Response, NextFunction } from 'express';

export const errorWrapper = (asyncHandler: (req: Request, res: Response, next: NextFunction) => {}) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await asyncHandler(req, res, next);
  } catch (e) {
    console.log(e);
    res.json({ code: 1, message: e });
  }
};

