import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import FileDownload from 'js-file-download'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState()
  const [fileName, setFileName] = useState('')

  const downloadBook = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("file", file)
      const response = await axios({
        url: 'http://localhost:5000/book/download',
        method: 'POST',
        responseType: 'blob',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      FileDownload(response.data, `${fileName}.mobi`)
      console.log(response)

    } catch(err) {
      console.log(err)
    }
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={downloadBook} className={styles.form}>
        <h1 className={styles.title}>File Converter</h1>
        <input type="text" className={styles.inputFileName} name="fileName" placeholder="File Name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
        <label for="file" className={styles.inputFileCustom}>
              Upload File
        </label>
        <input type="file" id="file" className={styles.inputFile} name="file" onChange={handleFile} />
        <input type="submit" className={styles.inputSubmit} value="Convert" />
      </form>
    </div>  
  )
}
