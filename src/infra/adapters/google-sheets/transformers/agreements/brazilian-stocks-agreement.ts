import type { LoadAllBrazilianStocksRepository } from '@/application/contracts/repositories'
import type { TransformerSheets } from '@/infra/adapters/google-sheets/transformers'

export interface BrazilianStocksAgreement extends TransformerSheets {
  compose: (params: BrazilianStocksAgreement.Params) => Promise<BrazilianStocksAgreement.Result>
}

interface GoogleSheetsResponse {
  range?: string | null
  majorDimension?: string | null
  values?: (string | number)[][] | null
}

export namespace BrazilianStocksAgreement {
  export type Params = GoogleSheetsResponse

  export type Entity = LoadAllBrazilianStocksRepository.Entity

  export type Result = LoadAllBrazilianStocksRepository.Entity [] | undefined
}
