import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NextLink from 'next/link';
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import TableContent from '../TableContent/TableContent'
import FileUpload from '../components/file-upload'
import Update from '../components/update'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/file-upload">File Upload</Link>
            </li>
            <li>
              <Link to="/update">Update</Link>
            </li>
            <li>
              <NextLink href="/settings">Settings</NextLink>
            </li>
          </ul>

          <Routes>
            <Route path="/file-upload" element={<FileUpload/>} />
            <Route path="/update" element={<Update/>} />
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </div>
      </Router>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          <TableContent />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}