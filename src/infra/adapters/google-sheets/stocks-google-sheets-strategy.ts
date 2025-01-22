import type { BrazilianStocksAgreement } from '@/infra/adapters/google-sheets/transformers'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianStocksRepository } from '@/application/contracts/repositories'
import { GoogleSheetsAdapter } from './google-sheets-adapter'
import type { ErrorsEnum } from '@/domain/enums'

export class StocksGoogleSheetsStrategy
extends GoogleSheetsAdapter<
  BrazilianStocksAgreement.Result,
  LoadAllBrazilianStocksRepository.Result,
  BrazilianStocksAgreement
>
implements LoadAllBrazilianStocksRepository {

  protected launchError(params: { error: ErrorsEnum, message: string }):
  LoadAllBrazilianStocksRepository.Result {
    // Specific implementation for error handling
    return {
        name: params.error,
        message: params.message,
    } as LoadAllBrazilianStocksRepository.Result
  }

  // Specific implementation of the loadAll method
  override async loadAll(): Promise<LoadAllBrazilianStocksRepository.Result> {

    const isDataStocks = await super.loadAll()
    return isDataStocks
  }
}
