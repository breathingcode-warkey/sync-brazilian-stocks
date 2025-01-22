import { TreatmentErrorAdapterFactory } from '@/main/factories/adapters'
import { InsertTransactionService } from '@/application/services'
import { BrazilianStockRepositoryFactory } from '@/main/factories/repositories/databases'


export class InsertTransactionServiceFactory {
  private static instance: InsertTransactionServiceFactory
  private instanceInsertTransactionService: InsertTransactionService | undefined


  private constructor() {}

  public static getInstance(): InsertTransactionServiceFactory {
    if (!InsertTransactionServiceFactory.instance) {
      InsertTransactionServiceFactory.instance = new InsertTransactionServiceFactory()
    }

    return InsertTransactionServiceFactory.instance
  }

  public make(): InsertTransactionService {
    if (!this.instanceInsertTransactionService) {
      this.instanceInsertTransactionService = new InsertTransactionService (
        BrazilianStockRepositoryFactory.getInstance().make()
      )
    }
    return this.instanceInsertTransactionService
  }
}
