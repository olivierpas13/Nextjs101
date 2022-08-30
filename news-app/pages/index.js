import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'

export default function Home({articlesToShow}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NewsApp - Home</title>
        <meta name="description" content="newsApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Next.js tutorial</h1>
        <Link href='/about'>
        Go to about page
        </Link>
        {
           articlesToShow.map((article, index)=> (
            <div key={index}>
            <h2>{article?.title}</h2>
            <p>{article?.author}</p>
            <p>{article?.description}</p>
            {article.urlToImage
            ?<Image 
            src={`${article?.urlToImage}`}
            alt='Article image'
            width={1000}
              height={500}
            /> 
            :null}
            </div>
          ))
        }
      <button>Botón</button>
    </div>
  )
}
export const getStaticProps = async () =>{
  const response = fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
  const {articles} = await (await response).json()
  const articlesToShow = articles.map(article=> article = {
    ...article,
    urlToImage: `${process.env.CLOUDINARY_URL}/${article.urlToImage}`})
  
  return{
    props:{
      articlesToShow
    } 
  }
}
