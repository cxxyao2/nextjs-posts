import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { sortByDate } from '../utils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <footer className='py-6 text-center text-gray-500 text-sm'>
      <span className='text-gray-900 font-fold text-lg dark:text-gary-100'>
        Jennifer
      </span>
      &copy; {new Date().getFullYear()} All right reserved.
      {t('greeting')}
    </footer>
  )
}

export default Footer

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
