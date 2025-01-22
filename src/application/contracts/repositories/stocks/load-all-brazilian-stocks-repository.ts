import type { BrazilianStockEntity } from '@/domain/entities'

export interface LoadAllBrazilianStocksRepository {
  loadAll: () =>
     Promise<LoadAllBrazilianStocksRepository.Result>
}
  

export namespace LoadAllBrazilianStocksRepository {
  export type Entity = BrazilianStockEntity

  export type Result = Entity[] | Error
}
