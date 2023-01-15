import { Request, Response } from 'express';
import { getFiat } from 'base-ca';

export async function getFiatController(
	req: Request,
	res: Response,
): Promise<Response> {
	try {
		const { fiatSymbol } = req.query;

		const fiat = await getFiat({ symbol: fiatSymbol as string });

		return res.status(200).send({
			status_code: 200,
			results: {
				id: fiat.id,
				symbol: fiat.symbol,
				name: fiat.name,
			},
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
