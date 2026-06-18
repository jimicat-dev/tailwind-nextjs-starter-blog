import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import Main from './Main'
import tagData from './tag-data.json'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const authors = allCoreContent(allAuthors)
  const author = authors.find((a) => a.slug === 'default') ?? authors[0]
  return <Main posts={posts} author={author} tags={tagData} />
}
