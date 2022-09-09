import fs from "fs"
import path from "path"

import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Post } from "../interfaces/post"

type Props = {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  console.log(posts)
  return (
    <div className={styles.container}>
      <Head>
        <title>Markdown Files</title>
      </Head>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"))

  const posts = files.map((filename) => {
    const slug = filename.replace(/.md$/, "")
  })

  return {
    props: {
      posts: [{ id: "The Posts" }]
    }
  }
}
