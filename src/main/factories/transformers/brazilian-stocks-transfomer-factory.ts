import { BrazilianStocksTranformer } from '@/infra/adapters/google-sheets/transformers'

export class BrazilianStocksTranformerFactory {
  private static instance: BrazilianStocksTranformerFactory
  private instanceBrazilianStocksTranformer: BrazilianStocksTranformer | undefined

  public static getInstance(): BrazilianStocksTranformerFactory {
    if (!BrazilianStocksTranformerFactory.instance) {
      BrazilianStocksTranformerFactory.instance = new BrazilianStocksTranformerFactory()
    }

    return BrazilianStocksTranformerFactory.instance
  }

  public make(): BrazilianStocksTranformer {
    if (!this.instanceBrazilianStocksTranformer) {

      this.instanceBrazilianStocksTranformer =  new BrazilianStocksTranformer()
    }
    return this.instanceBrazilianStocksTranformer
  }
}
