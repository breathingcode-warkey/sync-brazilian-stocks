import type { BrazilianStockEntity } from '@/domain/entities'

export interface FindBrazilianStocksRepository {
  find: (params: FindBrazilianStocksRepository.Filters) => 
  Promise<FindBrazilianStocksRepository.Result>
}
  

export namespace FindBrazilianStocksRepository {
  export type Result = BrazilianStockEntity[]
  
  export type Entity  = BrazilianStockEntity

  export type Filters = {
    ticker?: string
    name?: string
  }
}
