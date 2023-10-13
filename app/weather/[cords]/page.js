'use client'
import Head from 'next/head';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Link from 'next/link';

export default function Page({ params }){
    const cords = params.cords.split("%20")
    const [resultados,setResultados] = useState()
    const [tiempoActual,setTiempoActual] = useState()
    const date = new Date();

    useEffect(()=>{
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+cords[0]+"&lon="+cords[1] +"&lang=sp&cnt=5&appid=1d1949da09e9b7a31fb512e62e1779b6")
        .then(response => response.json())
        .then(result => {console.log(result),setResultados(result)})
    },[])

    useEffect(()=>{
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+cords[0]+"&lon="+cords[1] +"&lang=sp&appid=1d1949da09e9b7a31fb512e62e1779b6")
        .then(response => response.json())
        .then(result => setTiempoActual(result))
    },[])


    return(
        <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Noto+Sans+Pau+Cin+Hau&display=swap" rel="stylesheet"/>
      </Head>
      <main className='h-full w-full flex justify-center  items-center'>
        <div className="w-96 h-3/5 bg-slate-100 bg-opacity-0  md:bg-opacity-10 backdrop-blur-3xl rounded-xl flex flex-col items-center p-5 gap-y-6" >
            <header className='w-full'>
                <div className='flex w-full justify-between'>
                    <Link href={"/"} className='text-slate-300'>VOLVER</Link>
                    <div className='flex gap-1'>
                        <p className='text-gray-300'>WEATHER </p>
                        <p className='text-yellow-500'> APP</p>
                    </div>
                </div>
            </header>
            {tiempoActual ? 
                <section className='flex-col justify-center '>
                    <div className='grid gap-2 text-center'>
                        <h1 className='text-5xl font-bold text-yellow-500 break-all'>{tiempoActual.name}</h1>
                        <h1 className='text-5xl font-bold text-gray-100'>{Math.trunc(tiempoActual.main.temp/10)}°C</h1>
                        <div className='flex w-full gap-5 justify-center'>
                            <h1 className='text-lg text-yellow-500'>{date.toJSON().slice(0, 10)}</h1>
                            <h2 className='text-lg text-gray-100'>{tiempoActual.weather[0].description.toUpperCase()}</h2>
                        </div>
                            
                    </div>
                    <div className='flex justify-center'>
                        <Image className='' src={"/"+tiempoActual.weather[0].icon+".png"} alt="me" width="170" height="170"></Image>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='flex justify-center items-center gap-3'>
                            <Image src={"/wind.png"} alt="me" width="30" height="30"></Image>
                            <p className='text-md text-gray-100'>{tiempoActual.wind.speed}%</p>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <Image src={"/humidity.png"} alt="me" width="30" height="30"></Image>
                            <p className='text-md text-gray-100'>{tiempoActual.main.humidity}%</p>
                        </div>
                    </div>
                </section>
            :null}
            {resultados ? 
                <section className='flex justify-center px-10 divide-x '>
                    {resultados.list.length>0 && resultados.list.map((r,i)=> {
                        return (
                            <div key={i} className='flex-col justify-center px-5' >
                                <p className='text-gray-100 text-center'>{new Date(r.dt_txt).getHours()}:00</p>
                                <div className='flex justify-center' >
                                    <Image src={"/"+r.weather[0].icon+".png"} alt="me" width="60" height="60"></Image>
                                </div>
                                <div className='flex-col divide-y'>
                                    <p className='flex-col text-gray-100'>{Math.trunc(r.main.temp_max/10)}°C</p>
                                    <p className='flex-col text-gray-100'>{Math.trunc(r.main.temp_min/10)}°C</p>
                                </div>
                            </div>
                        )
                    })}
                </section>
            :null}
        </div>
      </main>
    </>
    )
}