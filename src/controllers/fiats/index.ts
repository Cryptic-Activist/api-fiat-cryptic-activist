import { Request, Response } from 'express';
import CrypticBase from 'cryptic-base';

import fiatsJson from '../../../fiats.json';

const crypticbase = new CrypticBase(false);

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const fiats = await crypticbase.getFiats(null);

    console.log('fiats:', fiats);

    return res.status(200).send({
      status_code: 200,
      results: fiats,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: [],
      errors: [err.message],
    });
  }
}

export async function createFiat(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, symbol } = req.body;

    const newFiat = await crypticbase.createFiat({
      name,
      symbol,
    });

    return res.status(200).send({
      status_code: 200,
      results: newFiat,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}

export async function createFiatsJSON(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    fiatsJson.forEach(async (fiat) => {
      await crypticbase.createFiat({
        name: fiat.name,
        symbol: fiat.symbol,
      });
    });

    return res.status(200).send({
      status_code: 200,
      results: {},
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: [],
      errors: [err.message],
    });
  }
}
