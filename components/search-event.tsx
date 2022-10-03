import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PostPageProps } from '../interfaces/post-page-props'

const SearchEvent = ({
  frontmatter: { name, date, cover_image },
  slug,
  content
}: PostPageProps) => {
  const [newContent, setNewContent] = useState('loading...')
  useEffect(() => {
    const result = content && content?.replace(/<br><\/br>##/, '')
    if (result) setNewContent(result)
  }, [content])
  return (
    <div className='col-span-full p-2 flex flex-col justify-start gap-2   md:col-span-6  border rounded-sm  border-slate-400 bg-white dark:bg-inherit'>
      <h2 className='font-semibold text-indigo-600 dark:text-indigo-400'>
        <Link href={`/blog/${slug}`}>
          <a>{name} </a>
        </Link>
      </h2>
      <p className='text-sm text-slate-400'>{date} </p>
      <p className='line-clamp-3'>{newContent}</p>
    </div>
  )
}

export default SearchEvent
