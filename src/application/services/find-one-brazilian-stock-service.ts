import { ApplicationErrors } from '@/application/contracts'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianStocksRepository } from '@/application/contracts/repositories'
import type { FindBrazilianStocksRepository } from '@/application/contracts/database'
import type { FindOneBrazilianStocksUsecase } from '@/domain/usecases'

export class FindOneBrazilianStockService implements FindOneBrazilianStocksUsecase {
  constructor(
    private readonly loadStocks: LoadAllBrazilianStocksRepository,
    private readonly findStocksRepository: FindBrazilianStocksRepository,
    private readonly treatment: TreatmentErrorContract
  ) {}

  async perform(): Promise<FindOneBrazilianStocksUsecase.Result> {

    const isStock = await this.findStocksRepository.find({ticker: 'GGBR4'})
    if (isStock instanceof Error) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: 'Failed to Load Stocks'
      })
    }

    console.log('Data Stocks:: ', isStock)

    return isStock
  }
}
