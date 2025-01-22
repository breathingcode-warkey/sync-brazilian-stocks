export class NotLoadBrazilianStockError extends Error {
  private readonly statusCode: number
  constructor(description: string) {
    super(`Error Stocks B3${description}`)
    this.name = 'NotLoadBrazilianStockError'
    this.statusCode = 404
  }
}
