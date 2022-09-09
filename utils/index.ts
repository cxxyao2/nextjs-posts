import { PostPageProps } from '../pages/blog/[slug]'

export const sortByDate = (a: PostPageProps, b: PostPageProps) => {
  return new Date(b.frontmatter['date']) > new Date(a.frontmatter['date'])
    ? -1
    : 1
}
