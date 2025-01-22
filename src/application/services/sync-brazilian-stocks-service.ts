import { ApplicationErrors } from '@/application/contracts'
import type { TreatmentErrorContract } from '@/application/contracts'
import type { LoadAllBrazilianStocksRepository } from '@/application/contracts/repositories'
import type { SaveBrazilianStocksRepository, FindBrazilianStocksRepository } from '@/application/contracts/database'
import type { SyncBrazilianStocksUsecase } from '@/domain/usecases'

export class SyncBrazilianStockService implements SyncBrazilianStocksUsecase {
  constructor(
    private readonly loadStocksRepository: LoadAllBrazilianStocksRepository,
    private readonly stocks: SaveBrazilianStocksRepository & FindBrazilianStocksRepository,
    private readonly treatment: TreatmentErrorContract,
  ) {}

  async perform(): Promise<SyncBrazilianStocksUsecase.Result> {

    const dataStocks = await this.loadStocksRepository.loadAll()
    if (dataStocks instanceof Error) {
      return this.treatment.launchError({
        errorDescription: ApplicationErrors.Enumerable.MISSING_PARAM_ERROR,
        messageDescription: 'Failed to Load Stocks'
      })
    }

    //console.log('Data Stocks:: ', dataStocks)

    const dataInsert = await this.stocks.saveStocks(dataStocks)

    console.log('Retorno Inserção Stocks:: ', dataInsert)

    const oneStock = await this.stocks.find({name: 'Ambev SA'})
    console.log('One Stock:: ', oneStock);

    return true
  }
}
