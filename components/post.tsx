import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: Record<string, any>
}

const Post = ({ post }: Props) => {
  return (
    <div className='p-4 rounded-lg shadow-[0_0_4px_2px_rgba(0,0,0,0.3)] bg-white'>
      <div className='relative h-40'>
        <Image
          className='rounded-md'
          src={post.frontmatter.cover_image}
          layout='fill'
          priority={true}
          alt='post'
          objectFit='cover'
        />
      </div>

      <div className='mb-5 py-1 pe-2 text-gray-700'>
        Posted on {post.frontmatter.date}
      </div>
      <h3 className='font-semibold text-gray-600 dark:text-white text-lg'>
        {post.frontmatter.name}
      </h3>
      <p className='mb-2'>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <button className='inline bg-indigo-600 text-white   py-1 px-4 rounded-md cursor-pointer no-underline text-sm hover:shadow'>
          Read More
        </button>
      </Link>
    </div>
  )
}

export default Post
