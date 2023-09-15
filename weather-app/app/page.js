'use client'
import Head from 'next/head';
import Image from 'next/image'
import { useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Link from 'next/link'

export default function Home() {

  const [location,setLocation] = useState("")
  const [resultados,setResultados] = useState([])
  const [showSearch, setShowSearch] =useState(true)
  
  const handleSubmit = (evt) =>{
    evt.preventDefault()
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location},&limit=7&lang=sp&appid=1d1949da09e9b7a31fb512e62e1779b6`)
    .then(response => response.json())
    .then(result => {
      setResultados(result)
      setShowSearch(true)
    })
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Noto+Sans+Pau+Cin+Hau&display=swap" rel="stylesheet"/>
      </Head>
      <main className='h-full w-full flex justify-center  items-center'>
        <div className="w-96 h-3/5 bg-slate-100 md:bg-opacity-10 bg-opacity-0 backdrop-blur-3xl rounded-xl flex flex-col items-center gap-10 p-16" >
          <header>
            <Image src="/mainPhoto.png" alt="me" width="200" height="200"></Image>
          </header>
          <main>
            <div className='relative z-10'>
              <form className='flex gap-3' onSubmit={handleSubmit} >
                <input onFocus={()=>setShowSearch(true)} onChange={evt=> setLocation(evt.target.value)} type='text' className='rounded-2xl w-64 h-12 p-5 font-semibold bg-yellow-500 focus:outline-0 placeholder:text-black placeholder:font-bold' placeholder='Montilla...'/>
                <button className='flex bg-yellow-500 rounded-2xl w-10 item justify-center items-center font-bold text-black'>
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </button>
              </form>
              {showSearch & resultados.length > 0 ? 
              <div className='absolute -z-10 rounded-lg -bottom-32 bg-slate-100 w-64 h-40 max-h-40 font-semibold pt-9 text-lg overflow-y-scroll resultados'>
                {resultados.length > 0 && resultados.filter(e=> e.state).map((r,i) =>{
                    return(
                      <Link href={`/weather/`+r.lat+" "+r.lon} key={i} className='flex p-2 gap-3'>
                        <span aria-label='españa' className={`fi fi-${r.country.toLowerCase()}`}></span>
                        <span className='text-base'>{r.name}, {r.state}</span>  
                      </Link>
                    )
                })}
                
              </div>
              :null}
            </div>
          </main>
          <footer className='flex flex-col text-center gap-2 prueba  shadow-red-900 drop-shadow-2xl '>
            <p className='text-5xl font-bold text-gray-300  '>
              WEATHER
            </p>

            <p className='text-5xl font-bold text-yellow-500'>
              APP 
            </p>
          </footer>
        </div>
      </main>
    </>
    
  )
}
