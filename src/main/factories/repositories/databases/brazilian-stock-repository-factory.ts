import { DatabaseConnections } from '@/main/config/database-connections'
import { BrazilianStocksRepository } from '@/infra/database/repositories'
import type { MongoConnection } from '@/infra/database/connections'

export class BrazilianStockRepositoryFactory {
  private static instance: BrazilianStockRepositoryFactory
  private instanceStockRepository: BrazilianStocksRepository | undefined

  public static getInstance(): BrazilianStockRepositoryFactory {
    if (!BrazilianStockRepositoryFactory.instance) {
      BrazilianStockRepositoryFactory.instance =
        new BrazilianStockRepositoryFactory()
    }

    return BrazilianStockRepositoryFactory.instance
  }

  public make(): BrazilianStocksRepository {
    if (!this.instanceStockRepository) {
      this.instanceStockRepository = new BrazilianStocksRepository(
        DatabaseConnections.mongo as MongoConnection
      )
    }
    return this.instanceStockRepository
  }
}
