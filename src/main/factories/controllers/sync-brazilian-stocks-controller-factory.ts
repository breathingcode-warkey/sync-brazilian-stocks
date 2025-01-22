import { SyncBrazilianStocksServiceFactory } from '@/main/factories/services'
import { RetryeValidationFactory } from '@/main/factories/validations'
import { SyncBrazilianStocksController } from '@/presentation/controllers'
import type { Controller } from '@/presentation/controllers/controller-abstract'

export class SyncBrazilianStocksControllerFactory {
  private static instance: SyncBrazilianStocksControllerFactory
  private instanceSyncBrazilianStocksController: Controller | undefined

  public static getInstance(): SyncBrazilianStocksControllerFactory {
    if (!SyncBrazilianStocksControllerFactory.instance) {
      SyncBrazilianStocksControllerFactory.instance = new SyncBrazilianStocksControllerFactory()
    }

    return SyncBrazilianStocksControllerFactory.instance
  }

  public make(): Controller {
    if (!this.instanceSyncBrazilianStocksController) {
      this.instanceSyncBrazilianStocksController = new SyncBrazilianStocksController(
        RetryeValidationFactory.getInstance().make(),
        SyncBrazilianStocksServiceFactory.getInstance().make()
      )
    }
    return this.instanceSyncBrazilianStocksController
  }
}
