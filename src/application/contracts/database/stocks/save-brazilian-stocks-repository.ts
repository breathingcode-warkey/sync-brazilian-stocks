import type { BrazilianStockEntity } from '@/domain/entities'

export interface SaveBrazilianStocksRepository {
  saveStocks: (params: SaveBrazilianStocksRepository.Params) => 
  Promise<SaveBrazilianStocksRepository.Result>
}
  

export namespace SaveBrazilianStocksRepository {
  export type Result =  { registersUpdated: number }[] | Error

  export type Params = BrazilianStockEntity[]
}
