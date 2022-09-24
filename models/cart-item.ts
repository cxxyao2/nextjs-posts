export default interface ICartItem {
  id: string
  imageUrl: string
  name: string
  price: number
  description: string
  quantity: number
  clientId?: string
  clientName?: string
  salesPersonId?: string
  salesPersonName?: string
}
