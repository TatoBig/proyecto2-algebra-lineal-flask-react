import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [currentTime, setCurrentTime] = useState('Cargando...')

  // useEffect(() => {
  //   fetch('http://localhost:5000/time')
  //     .then(res => res.body)
  //     .then(body => {
  //       const reader = body.getReader()
  //       return new ReadableStream({
  //         start(controller) {
  //           function push() {
  //             reader.read().then(({ done, value }) => {
  //               if (done) {
  //                 console.log('done', done)
  //                 controller.close()
  //                 return
  //               }
  //               controller.enqueue(value)
  //               push()
  //             })
  //           }
  //           push()
  //         }
  //       })
  //     })
  //     .then(stream => {
  //       return new Response(stream, { headers: { "Content-Type": "text/html" } }).json()
  //     })
  //     .then(result => {
  //       console.log(result)
  //       setCurrentTime(`${result.time} ${result.test}`)
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     })
  // }, [])

  useEffect(() => {
    fetch('http://localhost:5000/test')
      .then(res => res.json()
        .then(data => {
          console.log(data)
          // setCurrentTime(`${data.perro}`)
        }))
      .catch(e => console.log(e))
  }, [])

  // useEffect(() => {
  //   fetch('http://localhost:5000/time')
  //     .then(res => res.json()
  //       .then(data => {
  //         console.log(data)
  //       })
  //     )
  //     .catch(e => console.log(e))
  // }, [])

  return (
    <div className={styles.container}>
      <header className="App-header">
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  )
}
