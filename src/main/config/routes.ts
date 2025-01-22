import { Routes, type RouteConfig } from '@/main/config/abstract-routes'
import { 
  SyncBrazilianStocksControllerFactory,
  SyncBrazilianReitsControllerFactory,
  TransactionControllerControllerFactory
} from '@/main/factories/controllers'

export class AppRoutes extends Routes {
  override getRoutes(): RouteConfig[] {
    return [
      {
        route: {
          path: '/stocks/all',
          method: 'POST'
        },
        controller: SyncBrazilianStocksControllerFactory.getInstance().make()
      },
      {
        route: {
          path: '/reits/all',
          method: 'POST'
        },
        controller: SyncBrazilianReitsControllerFactory.getInstance().make()
      },
      {
        route: {
          path: '/transaction/add',
          method: 'POST'
        },
        controller: TransactionControllerControllerFactory.getInstance().make()
      }
    ]
  }
}
