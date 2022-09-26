import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

type PaginatorProps = {
  className: string
  itemCount: number
  pageChanged: (currentPage: number, itemNumberPerpage: number) => void
}

const Paginator = ({
  className = '',
  itemCount,
  pageChanged
}: PaginatorProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [itemNumberPerPage, setItemNumberPerPage] = useState(5)

  useEffect(() => {
    // calculate pageNUmber
    const newTotalPage = Math.max(Math.ceil(itemCount / itemNumberPerPage), 1)
    setTotalPage(() => newTotalPage)
  }, [itemCount, itemNumberPerPage])

  return (
    <div className={`flex justify-end items-center space-x-4  ${className}`}>
      <div className='flex items-center '>
        Items per page{' '}
        <select
          className='px-2 mx-1 rounded-sm'
          onChange={(e) => {
            setItemNumberPerPage(parseInt(e.target.value))
          }}>
          <option value={5}> 5</option>
          <option value={10}> 10</option>
          <option value={15}> 15</option>
          <option value={20}> 20</option>
        </select>
      </div>
      <div>
        Page {currentPage} of {totalPage}{' '}
      </div>
      <div className='flex mx-4'>
        <ChevronLeftIcon
          onClick={() => {
            if (currentPage <= 1) return
            setCurrentPage((current) => {
              let newCurrent = current > 1 ? current - 1 : current
              pageChanged(newCurrent, itemNumberPerPage)
              return newCurrent
            })
          }}
          className={`${
            currentPage <= 1
              ? 'text-gray-400 dark:text-gray-700 '
              : 'text-gray-700 dark:text-gray-400 '
          } w-6 h-6 mr-2`}
        />

        <ChevronRightIcon
          onClick={() => {
            if (currentPage >= totalPage) return
            console.log('clicked', currentPage)
            setCurrentPage((current) => {
              let newCurrent = current >= totalPage ? current : current + 1
              pageChanged(newCurrent, itemNumberPerPage)
              return newCurrent
            })
          }}
          className={`${
            currentPage >= totalPage
              ? 'text-gray-400 dark:text-gray-700 '
              : 'text-gray-700 dark:text-gray-400'
          } w-6 h-6`}
        />
      </div>
    </div>
  )
}

export default Paginator
