export interface SyncBrazilianStocksUsecase {
  perform: () => 
  Promise<SyncBrazilianStocksUsecase.Result>
}
export namespace SyncBrazilianStocksUsecase {
  export type SuccessResult = true

  export type Result = SuccessResult | Error
}
