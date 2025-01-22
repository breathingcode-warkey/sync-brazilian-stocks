import { variables } from '@/main/config/variables'
import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'
import { BrazilianStocksTranformerFactory } from '@/main/factories/transformers'
import { StocksGoogleSheetsStrategy } from '@/infra/adapters/google-sheets'

export class StocksGoogleSheetsStrategyFactory {
  private static instance: StocksGoogleSheetsStrategyFactory
  private instanceStocksGoogleSheetsStrategy: StocksGoogleSheetsStrategy | undefined

  public static getInstance(): StocksGoogleSheetsStrategyFactory {
    if (!StocksGoogleSheetsStrategyFactory.instance) {
      StocksGoogleSheetsStrategyFactory.instance =
        new StocksGoogleSheetsStrategyFactory()
    }

    return StocksGoogleSheetsStrategyFactory.instance
  }

  public make(range: string): StocksGoogleSheetsStrategy {
    if (!this.instanceStocksGoogleSheetsStrategy) {
      this.instanceStocksGoogleSheetsStrategy = new StocksGoogleSheetsStrategy(
        BrazilianStocksTranformerFactory.getInstance().make(),
        TreatmentErrorAdapterFactory.getInstance().make(),
        variables.credentialsPath,
        variables.googleSheets.spreadSheetId,
        range,
        variables.googleSheets.authScope,
      )
    }
    return this.instanceStocksGoogleSheetsStrategy
  }
}
