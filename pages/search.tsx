import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'

import { useEffect, useState } from 'react'

import { sortByDate } from '../utils'
import {
  downloadCustomerList,
  downloadProductList
} from '../serivces/master-service'
import IProduct from '../models/product'
import { Customer } from '../models/customer'
import { PostPageProps } from '../interfaces/post-page-props'
import { useNotificationContext } from '../context/notification-context'
import Notification from '../components/notification'
import SearchInput from './search-input'
import SearchTabs from './search-tabs'
import SearchProducts from './search-products'
import SearchCustomers from './search-customers'
import SearchBlogs from './search-blogs'

type SearchPageProps = {
  posts: PostPageProps[]
  productData: {
    products: IProduct[]
    errorMessage: string
  }
  customerData: {
    customers: Customer[]
    errorMessage: string
  }
}

const SearchPage = ({ posts, productData, customerData }: SearchPageProps) => {
  const [tab, setTab] = useState(1)
  const { showNotification, notification } = useNotificationContext()
  const [keyword, setKeyword] = useState('')
  const onKeywordChange = (keyword: string) => {
    setKeyword(keyword.toLocaleLowerCase())
  }

  const tabsArray = [
    { index: 1, description: 'Product' },
    { index: 2, description: 'Customer' },
    { index: 3, description: 'Blog' }
  ]

  useEffect(() => {
    if (productData.errorMessage) {
      showNotification({
        id: '',
        message: 'Please refresh page. ' + productData.errorMessage,
        status: 'error'
      })
      return
    }
    if (customerData.errorMessage) {
      showNotification({
        id: '',
        message: 'Please refresh page. ' + customerData.errorMessage,
        status: 'error'
      })
      return
    }
  }, [posts, productData, customerData])
  
  return (
    <>
      {notification && <Notification {...notification} />}

      <div className='shadow shadow-indigo-100  p-4 rounded-sm'>
        <div className='bg-indigo-400'>
          <SearchInput onChange={onKeywordChange} />
          <SearchTabs
            tabsArray={tabsArray}
            tabsContainerTabIndex={2}
            currentTab={tab}
            setCurrentTab={(newTabIndex) => setTab(newTabIndex)}
          />
        </div>

        <section id='searched'>
          <h2 className='font-semibold text-lg text-slate-600'>Results</h2>
          <div className='grid grid-cols-12 gap-6'>
            {tab === 1 && (
              <SearchProducts
                products={productData.products}
                keyword={keyword}
              />
            )}
            {tab === 2 && (
              <SearchCustomers
                customers={customerData.customers}
                keyword={keyword}
              />
            )}
            {tab === 3 && (
              <SearchBlogs
                posts={posts}
                keyword={keyword}
              />
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default SearchPage

export const getStaticProps: GetStaticProps = async () => {
  const productData = await downloadProductList()
  const customerData = await downloadCustomerList()

  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/.md$/, '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
      content
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
      productData,
      customerData
    }
  }
}
