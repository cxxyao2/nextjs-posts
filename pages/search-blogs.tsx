import { useEffect, useState } from 'react'
import SearchEvent from '../components/search-event'
import { PostPageProps } from '../interfaces/post-page-props'

type Props = React.PropsWithChildren<{
  posts: PostPageProps[]
  keyword: string
}>

const SearchBlogs = ({ posts, keyword }: Props) => {
  const [data, setData] = useState<PostPageProps[]>([])

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.content?.toLowerCase().includes(keyword) ||
        post.slug.toLowerCase().includes(keyword) ||
        post.frontmatter['name'].toLowerCase().includes(keyword)
    )
    setData(filtered)

    return () => {
      setData([])
    }
  }, [posts, keyword])

  if (data.length === 0)
    return (
      <div className='text-center p-2 col-span-full rounded-md shadow shadow-gray-400'>
        No client found.
      </div>
    )

  return (
    <>
      {data.map((post) => (
        <SearchEvent
          key={post.slug}
          {...post}
        />
      ))}
    </>
  )
}

export default SearchBlogs
