import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import Post from '../components/post'
import { sortByDate } from '../utils'
import Paginator from '../components/paginator'
import { useEffect, useState } from 'react'
import Meta from '../components/meta'

interface PostListProps {
  posts: Array<any>
}

const Home = ({ posts }: PostListProps) => {
  const [current, setCurrent] = useState(1)
  const [itemNumber, setItemNumber] = useState(5)
  const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5))

  const handlePageChanged = (
    currentPage: number,
    itemNumberPerPage: number
  ) => {
    setCurrent(currentPage)
    setItemNumber(itemNumberPerPage)
  }

  useEffect(() => {
    setDisplayedPosts(
      posts.slice((current - 1) * itemNumber, current * itemNumber)
    )
  }, [current, itemNumber, posts])

  return (
    <>
      <Meta
        title='Activities'
        keywords='activite marketing strategy'
        description='gas service center'></Meta>
      <Paginator
        itemCount={posts?.length}
        pageChanged={(currentPage, itemNumberPerPage) =>
          handlePageChanged(currentPage, itemNumberPerPage)
        }
        className='mt-2'></Paginator>
      <div className='grid grid-cols-1 gap-8  md:grid-cols-2 p-2'>
        {displayedPosts.map((post: { [key: string]: any }) => (
          <Post
            post={post}
            key={post.frontmatter.date}></Post>
        ))}
      </div>
    </>
  )
}

export default Home

export const getStaticProps = async ({ locale = 'en' }) => {
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/.md$/, '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
