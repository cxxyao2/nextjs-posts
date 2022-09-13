import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: Record<string, any>
}

const Post = ({ post }: Props) => {
  return (
    <div className='p-4 rounded-lg shadow-md shadow-cyan-200/50'>
      <Image
        className='rounded-md'
        src={post.frontmatter.cover_image}
        width={200}
        height={200}
        objectFit='cover'
        layout='responsive'
        priority={true}
      />
      <div className='bg-gray-100 mb-5 py-1 px-2'>
        Posted on {post.frontmatter.date}
      </div>
      <h3>{post.frontmatter.title}</h3>
      <p className='mb-2'>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <a className='inline bg-blue-500 text-white border-0  py-2 px-4 rounded-md cursor-pointer no-underline text-sm hover:shadow'>
          Read More
        </a>
      </Link>
    </div>
  )
}

export default Post
