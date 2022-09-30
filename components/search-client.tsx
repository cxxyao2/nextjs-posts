import { Customer } from '../models/customer'
import DashBoardDataTable from './table-sample'

type SearchClientProps = {
  client: Customer
}
const SearchClient = ({ client }: SearchClientProps) => {
  return (
    <>
      <div>client {client.name}</div>
    </>
  )
}

export default SearchClient
