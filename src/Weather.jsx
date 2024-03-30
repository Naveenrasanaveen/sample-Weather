import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Weather.css'

const WeatherDetails = ({ icon, deg, city, country, lat, log, humidity, wind, windvalue, humvalue }) => {
    return (
        <>
            <div className='image'>
                <img src={icon} alt="sun" width="200px" />
            </div>
            <div className="temp">
                {deg} C
            </div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className='cord'>
                <div>
                    <span className='lat'>Latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className='lat'>Longtitude</span>
                    <span>{log}</span>
                </div>
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity} alt="humidity" width="50px" height="50px" className='icon' />

                    <div>
                        <div className="humidity-percent">{humvalue}%</div>
                        <div className="text">Humidity</div>
                    </div>

                </div>
                <div className='element'>
                    <img src={wind} alt="wind" width="50px" height="50px" className='icon' />

                    <div>
                        <div className="wind-percent">{windvalue} Km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>

                </div>
            </div>

        </>
    )
}

const Weather = () => {
 
    let api_key = "272a9cafd818a6da065673b1a18d0b41"

    const [text, settext] = useState("Tirupur")

    const [icon, seticon] = useState("images/rain.png")
    const [deg, setdeg] = useState(0)
    const [city, setcity] = useState("TIRUPPUR")
    const [country, setcountry] = useState("IN")
    const [lat, setlat] = useState(0)
    const [log, setlog] = useState(0)
    const [humidity, sethumidity] = useState("images/humidity.webp")
    const [wind, setwind] = useState("images/wind.png")
    const [humvalue, sethumvalue] = useState(0)
    const [windvalue, setwindvalue] = useState(0)

    const [cityNotFound, setcityNotFound] = useState(false)
    const [loading, setLoding] = useState(false)
    const [error, seterror] = useState(null)

    const weatherIconMap = {
        "01d": "images/sun.png",
        "01n": "images/sun.png",
        "02d": "images/cloud.png",
        "02n": "images/cloud.png",
        "03d": "images/dirzzel.png",
        "03n": "images/dirzzel.png",
        "04d": "images/dirzzel.png",
        "04n": "images/dirzzel.png",
        "09d": "images/rain.png",
        "09n": "images/rain.png",
        "10d": "images/rain.png",
        "10n": "images/rain.png",
        "13d": "images/snow.png",
        "13n": "images/snow.png",

    }



    async function search() {
        setLoding(true)

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`

        try {
            let res = await fetch(url)
            let data = await res.json()

            if (data.cod === "404") {
                console.log("city not found")
                
                setcityNotFound(true)
                setLoding(false)
                return
            }

            sethumvalue(data.main.humidity)
            setwindvalue(data.wind.speed)
            setdeg(Math.floor(data.main.temp))
            setcity(data.name)
            setcountry(data.sys.country)
            setlat(data.coord.lat)
            setlog(data.coord.lon)
            const weathericoncode = data.weather[0].icon
            seticon(weatherIconMap[weathericoncode] || "images/sun.png")
            setcityNotFound(false)

        } catch (error) {
            console.log("An error occured:", error.message)
            seterror("an error found while feach the data")
        }
        finally {
            setLoding(false)


        }


    }
    const handelCity = (e) => {
        settext(e.target.value)
    }

    const handelKeyDown = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    useEffect(function (params) {
        search()
    }, [])


    return (
        <>
            <div className='container'>
                <div className='input-container'>
                    <input type="text"
                        className='cityinput'
                        placeholder='Search city'
                        value={text}
                        onChange={handelCity}
                        onKeyDown={handelKeyDown}
                    />
                    <div className='search-icon' onClick={() => search()}>
                        <img
                            src="images/search.png"
                            alt="search-icon"
                            width="20px"

                        />
                    </div>
                </div>

               { !loading&& !cityNotFound && <WeatherDetails
                    icon={icon}
                    deg={deg}
                    city={city}
                    country={country}
                    lat={lat}
                    log={log}
                    humidity={humidity}
                    wind={wind}
                    humvalue={humvalue}
                    windvalue={windvalue}
                />}
                {loading && <div className="loading-message">
                    loading...
                </div>}
               { error &&<div className="error-message">
                    {error}
                </div>}
                {cityNotFound && <div className="city-not-found">
                    City Not Found
                </div>}
                <p className='copyright'>
                    Designed by <span>Naveen</span>
                </p>

            </div>
        </>
    )
}



export default Weather