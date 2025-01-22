import type { MongoConnection } from '@/infra/database/connections'
import type { 
  SaveBrazilianStocksRepository,   
  FindBrazilianStocksRepository,
  AddTransactionRepository
} from '@/application/contracts/database'

export class BrazilianStocksRepository implements 
SaveBrazilianStocksRepository,
AddTransactionRepository
{
  constructor(
    private readonly mongoConnection: MongoConnection
  ) {}

  async find(params: FindBrazilianStocksRepository.Filters):
  Promise<FindBrazilianStocksRepository.Result> {
    const { ticker, name } = params
    console.log('Parametros FILTER:: ', params)
    try {
      const filter = {
        ...(ticker ? { ticker: ticker } : {}), // Busca pelo ticker se definido
        ...(name ? { name: { $regex: typeof name === 'string' ? name : '', $options: 'i' } } : {}) // Busca pelo nome se definido
      }

      const options = {
        limit: 5, // Limita o número de resultados a 5
        sort: { value: -1 } // Ordena os resultados pelo campo 'value' em ordem decrescente
      };

      const result = await this.mongoConnection.find<FindBrazilianStocksRepository.Entity>(
        'brazilianStocks',
        filter,
        'warKey',
        options
      )

      console.log('REsultado do MOngoDB:: ', result)

      return result
    } catch (error: unknown) {
      console.error('Error fetching actions:', error)
      throw error
    }
  }

  async saveStocks(params: SaveBrazilianStocksRepository.Params):
  Promise<SaveBrazilianStocksRepository.Result> {
    const insertStocks: { registersUpdated: number }[] = []
    try {
      for (const action of params) {
        const { ticker, ...updateData } = action;
        const result = await this.mongoConnection.updateOne(
          'brazilianStocks',
          { ticker: ticker },
          { $set: updateData },
          updateData,
          'warKey'
        );
        insertStocks.push(result)
      }

      // const allActionsBefore = await this.mongoConnection.find('brazilianStocks', {})

      return insertStocks
    } catch (error: unknown) {
      console.error('Error fetching actions:', error)
      throw error
    }
  }

  async add(params: AddTransactionRepository.Params): Promise<AddTransactionRepository.Result> {
    const { userId, ...transaction} = params
    
    console.log('PARAMS:: Transaction:: ', transaction)
    console.log('PARAMS:: userId:: ', userId)
    
    // Atualiza ou cria uma carteira para o usuário
    const teste = await this.mongoConnection.updateOne(
      'wallet',
      { userId }, // Filtro pelo userId
      { $push: { transactions: transaction } },
      transaction, // Adiciona a transação ao array de transações
      'warKey'
    )

    console.log('INSERT TRANSACTION:: ', teste)
    
    return true
  }
}
