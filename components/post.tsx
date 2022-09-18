import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: Record<string, any>
}

const Post = ({ post }: Props) => {
  return (
    <div className='p-4 rounded-lg shadow-md shadow-indigo-200 '>
      <Image
        className='rounded-md'
        src={post.frontmatter.cover_image}
        width={120}
        height={100}
        layout='responsive'
        priority={true}
      />
      <div className='bg-gray-100 mb-5 py-1 px-2'>
        Posted on {post.frontmatter.date}
      </div>
      <h3>{post.frontmatter.title}</h3>
      <p className='mb-2'>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <a className='inline bg-indigo-400 text-white   py-1 px-4 rounded-md cursor-pointer no-underline text-sm hover:shadow'>
          Read More
        </a>
      </Link>
    </div>
  )
}

export default Post
