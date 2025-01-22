import type { LoadRepository } from '@/application/contracts/repositories'
import type { BrazilianStockEntity } from '@/domain/entities'

export interface LoadAllStocksRepository<T, R> extends LoadRepository<T, R | undefined> {}

/* export namespace LoadAllStocksRepository {
  export type Filters = {
    email: string
  }

  export type Entity = BrazilianStockEntity

  export type Result = Entity[] | Error
} */
