import { Request, Response } from 'express';
import { getFiats, createFiat, getFiat } from 'cryptic-base';

import fiatsJson from '../../../fiats.json';

export async function index(req: Request, res: Response): Promise<Response> {
  try {
    const fiats = await getFiats(null);

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

export async function createFiatController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, symbol } = req.body;

    const newFiat = await createFiat({
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

export async function getFiatController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, symbol } = req.params;

    const fiat = await getFiat({
      name,
      symbol,
    });

    return res.status(200).send({
      status_code: 200,
      results: fiat,
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
      await createFiat({
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
