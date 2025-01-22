import type { BrazilianStockEntity } from '@/domain/entities/brazilian-stock'

export interface FindOneBrazilianStocksUsecase {
  perform: (paramns: FindOneBrazilianStocksUsecase.Params) => 
  Promise<FindOneBrazilianStocksUsecase.Result>
}
export namespace FindOneBrazilianStocksUsecase {
  export type Params = {
    ticker?: string
    name?: string
  }

  export type Result = BrazilianStockEntity[] | Error
}
