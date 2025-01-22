import type { BrazilianStocksAgreement } from '@/infra/adapters/google-sheets/transformers'

export class BrazilianStocksTranformer {
  async compose (params: BrazilianStocksAgreement.Params): Promise<BrazilianStocksAgreement.Result> {
    if (!params.values) return undefined;
    const header = params.values[0];
    const expectedHeader = ['Ticker', 'Name', 'Value', 'Currency'];

    if (!header || !header.every((value, index) => value === expectedHeader[index])) {
      return undefined
    }

    const data: BrazilianStocksAgreement.Result = params.values
    .slice(1).map((row: (string | number)[]) => {
      const checkDataFormat = row.every(value => typeof value === "string");
      
      if (checkDataFormat) {
        const value = Number.parseFloat(row[2].replace(',', '.'));
        return {
          ticker: row[0],
          name: row[1],
          value: Number.isNaN(value) ? 0 : value,
          currency: row[3]
        };
      }      return null;
    }).filter((item): item is BrazilianStocksAgreement.Entity => item !== null);
    
    return data;
  }
}
