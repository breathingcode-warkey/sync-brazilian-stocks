import { StocksGoogleSheetsStrategyFactory } from '@/main/factories/repositories'
import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'
import { BrazilianStockRepositoryFactory } from '@/main/factories/repositories'
import { SyncBrazilianStockService } from '@/application/services'

export class SyncBrazilianStocksServiceFactory {
  private static instance: SyncBrazilianStocksServiceFactory
  private syncBrazilianStockServiceInstance: SyncBrazilianStockService | undefined


  private constructor() {}

  public static getInstance(): SyncBrazilianStocksServiceFactory {
    if (!SyncBrazilianStocksServiceFactory.instance) {
      SyncBrazilianStocksServiceFactory.instance = new SyncBrazilianStocksServiceFactory()
    }

    return SyncBrazilianStocksServiceFactory.instance
  }

  public make(): SyncBrazilianStockService {
    const range = 'Stocks!A1:D230'
    if (!this.syncBrazilianStockServiceInstance) {
      this.syncBrazilianStockServiceInstance = new SyncBrazilianStockService(
        StocksGoogleSheetsStrategyFactory.getInstance().make(range),
        BrazilianStockRepositoryFactory.getInstance().make(),
        TreatmentErrorAdapterFactory.getInstance().make()
      )
    }

    return this.syncBrazilianStockServiceInstance
  }
}
