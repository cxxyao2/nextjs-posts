import fs from 'fs'
import path from 'path'
import Link from 'next/link'

import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import matter from 'gray-matter'
import { marked } from 'marked'

interface IParams extends ParsedUrlQuery {
  slug: string
}

export type PostPageProps = {
  frontmatter: Record<string, any>
  slug: string
  content?: string
}

const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content
}: PostPageProps) => {
  return (
    <div className='pt-4'>
      <Link href='/'>
        <a className='inline  text-white border-none px-4 py-2 rounded-md cursor-pointer no-underline text-sm bg-gray-400 focus:outline-none hover:text-base'>
          Go Back
        </a>
      </Link>
      <div className='py-4 px-8 rounded-xl shadow-cyan-500/50    card-page'>
        <h1 className='my-2 mx-0'>{title}</h1>
        <div className='bg-gray-300 mb-5 px-2.5 py-0.5'>Posted on {date}</div>
        <img
          src={cover_image}
          alt=''
        />
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
    }
  }
}

// /** pre-render many pages based on data  */
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
