import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import matter from 'gray-matter'
import { marked } from 'marked'
import { PostPageProps } from '../../interfaces/post-page-props'
import { useEffect } from 'react'
import { BACKEND_URL } from '../../data/constants'

interface IParams extends ParsedUrlQuery {
  slug: string
}

const PostPage = ({
  frontmatter: { name, date, cover_image },
  slug,
  content
}: PostPageProps) => {
  useEffect(() => {
    const data = getProductList()
    console.log('get product list', data)
  }, [])

  const getProductList = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}products`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log('error is', JSON.stringify(error))
    }
  }

  return (
    <div className='pt-4'>
      <Link href='/'>
        <a className='inline  text-white border-none px-4 py-2 rounded-md cursor-pointer no-underline text-sm bg-indigo-400  hover:bg-indigo-300'>
          Go Back
        </a>
      </Link>
      <div className='py-4 px-8 rounded-xl shadow shadow-indigo-200/50 '>
        <h1 className='my-2 mx-0'>{name}</h1>
        <div className='bg-gray-100 mb-5 px-2.5 py-0.5'>Posted on {date}</div>
        <div className='relative w-full'>
          <Image
            src={cover_image}
            alt=''
            width={160}
            height={90}
            layout='responsive'
            className='rounded-sm shadow '
          />
        </div>
        <div className='[&_ul]:postbody-ulol [&_ol]:postbody-ulol [&_pre]:postbody-pre'>
          <div
            dangerouslySetInnerHTML={{ __html: marked(content || '') }}></div>
        </div>
      </div>
    </div>
  )
}

/** fetch data at build time */
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams

  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content
    },
    revalidate: 10
  }
}

// /** pre-render many pages based on data. ssg  */
export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export default PostPage
