import fs from 'fs'
import path from 'path'

import type { NextPage } from 'next'
import Head from 'next/head'
import matter from 'gray-matter'
import Post from '../components/post'
import { sortByDate } from '../utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

interface HomeProps {
  posts: {
    [key: string]: any
  }
}

const Home = ({ posts }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Markdown Files</title>
        <meta
          name='description'
          content='gas service center'
        />
      </Head>

      <div className='grid grid-cols-1 gap-8  md:grid-cols-2'>
        {posts.map((post: { [key: string]: any }) => (
          <Post
            post={post}
            key={post.frontmatter.date}></Post>
        ))}
      </div>
    </div>
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
      posts: posts.sort(sortByDate),
      ...(await serverSideTranslations(locale, ['common', 'footer']))
    }
  }
}
