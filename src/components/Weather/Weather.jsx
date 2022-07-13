import React,{ useState, useEffect } from 'react'
import s from './Weather.module.scss'
import axios from 'axios'
// import logo from '../../img/logo.svg'
// import logo2 from '../../img/logo2.svg'
// import logo3 from '../../img/logo3.svg'
// import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

const TodayWeather = () => {

    const [data,setData] = useState({})
    const [location,setLocation] = useState('')
    const [lat,setLat] = useState(null);
    const [lon,setLon] = useState(null);
    const [status,setStatus] = useState(null)
  
    const getGeolocation = () => { //получаем координаты (deprecated)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                // console.log(position.coords)
                setLon(position.coords.longitude);
                localStorage.setItem('lat',JSON.stringify(position.coords.latitude))// записываем их в хранилище
                localStorage.setItem('lon', JSON.stringify(position.coords.longitude))
            },
                () => {
                    setStatus('Unable to retrieve your location');
                });
        } else {
            setStatus('Geolocation is not supproted by your broswer')
        }
    }

    useEffect(() => { //хук для отправки запроса к погодной апи после получения координат пользователя
        const fetchCurrentWeather = () => {
            fetch(urlForCoord)
                .then((response) => response.json())
                .then((data) => {
                    setData(data)
                    // console.log(typeof(data.name))
                })
        }
        if (lat && lon) {
            fetchCurrentWeather();
        }
    }, [lat,lon]);

    getGeolocation() //что-то не так

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5dbc1dc5eb96460925f3794ad1764fe8` //урл для запроса с городом
    const urlForCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5dbc1dc5eb96460925f3794ad1764fe8` //урл для запроса с координатами

    const searchLocation = (event) => { //функция для отправки запроса к погодной апи (с городом из инпута)
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                localStorage.setItem('city', JSON.stringify(response.data.name))
            })
            setLocation('')
        }
    }
    
   

    const handleToggle = () => { //дописать
        console.log('clicked!')
        // localStorage.setItem('city', JSON.stringify(location));
    };
//
    
    const svgLoc = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                        <path fill="#fff" d="M14 2.25c5.3847763 0 9.75 4.36522369 9.75 9.75 0 4.1196455-2.894567 8.6092677-8.6098042 13.5178507-.6558026.563242-1.6246152.5632418-2.2830264-.0022514l-.3777513-.3274735C7.01712282 20.4088515 4.25 16.0278108 4.25 12c0-5.38477631 4.36522369-9.75 9.75-9.75Zm0 1.5c-4.55634919 0-8.25 3.69365081-8.25 8.25 0 3.5020564 2.54839906 7.5368033 7.714548 12.0569728l.3725429.3229584c.0936914.0804678.2321011.0804678.3257926 1e-7C19.5789268 19.7283136 22.25 15.5853418 22.25 12c0-4.55634919-3.6936508-8.25-8.25-8.25Zm0 4.5c2.0710678 0 3.75 1.67893219 3.75 3.75 0 2.0710678-1.6789322 3.75-3.75 3.75s-3.75-1.6789322-3.75-3.75c0-2.07106781 1.6789322-3.75 3.75-3.75Zm0 1.5c-1.2426407 0-2.25 1.0073593-2.25 2.25s1.0073593 2.25 2.25 2.25 2.25-1.0073593 2.25-2.25S15.2426407 9.75 14 9.75Z" />
    </svg>
    const svgTemp = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244 512">
        <path fill="#ffffff" d="M147 59a39 39 0 0 0-39-39 39 39 0 0 0-38 39v271a83 83 0 1 0 77 1V59zm41 36V77h47a9 9 0 0 1 0 18h-47zm0 49v-18h47a9 9 0 0 1 0 18h-47zm0 49v-18h47a9 9 0 0 1 0 18h-47zm0 49v-18h47a9 9 0 0 1 0 18h-47zm0 49v-18h47a9 9 0 0 1 0 18h-47zm-21 23a107 107 0 1 1-117-1V59a58 58 0 0 1 100-42c11 11 17 26 17 42v255z" />
        <path fill="#fff" d="M125 345V186H91v159a61 61 0 1 0 34 0z" />
    </svg>
    const svgWind = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#fff" d="M31.4 193.2h306.8c53.6 0 97.1-40.9 97.1-91.1S391.8 11 338.2 11c-53.6 0-97.1 40.9-97.1 91.1 0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4 0-27.7 25.3-50.3 56.3-50.3 31 0 56.3 22.5 56.3 50.3 0 27.7-25.3 50.3-56.3 50.3H31.4c-11.3 0-20.4 9.1-20.4 20.4s9.1 20.4 20.4 20.4zm306.8 125.6H31.4c-11.3 0-20.4 9.1-20.4 20.4s9.1 20.4 20.4 20.4h306.8c31 0 56.3 22.6 56.3 50.3 0 27.7-25.3 50.3-56.3 50.3-11.3 0-20.4 9.1-20.4 20.4 0 11.3 9.1 20.4 20.4 20.4 53.6 0 97.1-40.9 97.1-91.1.1-50.2-43.5-91.1-97.1-91.1z" />
        <path fill="#fff" d="M480.6 177.3c-11.3 0-20.4 9.1-20.4 20.4 0 22.8-23.6 41.3-52.6 41.3H31.4c-11.3 0-20.4 9.1-20.4 20.4 0 11.3 9.1 20.4 20.4 20.4h376.2c51.5 0 93.4-36.8 93.4-82.1 0-11.3-9.1-20.4-20.4-20.4z" />
    </svg>
    const svgPress = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#fff" d="M256 0C114.51 0 0 114.497 0 256c0 141.491 114.497 256 256 256 141.49 0 256-114.497 256-256C512 114.509 397.503 0 256 0zm0 478.609c-122.746 0-222.609-99.862-222.609-222.609S133.254 33.391 256 33.391 478.609 133.254 478.609 256 378.746 478.609 256 478.609z" />
        <path fill="#fff" d="M256 66.783C151.29 66.783 66.783 151.738 66.783 256c0 48.619 18.872 97.248 55.421 133.797 6.52 6.52 17.091 6.52 23.611 0l23.611-23.611c6.52-6.519 6.52-17.09 0-23.611-6.519-6.52-17.09-6.52-23.611 0l-11.177 11.177c-19.241-23.851-30.408-52.1-33.501-81.056h15.734c9.22 0 16.696-7.475 16.696-16.696 0-9.22-7.475-16.696-16.696-16.696h-15.725c3.094-28.955 14.261-57.198 33.5-81.05l11.17 11.169c6.52 6.52 17.091 6.52 23.611 0 6.519-6.519 6.519-17.091 0-23.611l-11.175-11.175c23.276-18.804 51.227-30.356 81.054-33.5v15.732c0 9.22 7.475 16.696 16.696 16.696 9.22 0 16.696-7.475 16.696-16.696v-15.731c29.827 3.144 57.777 14.698 81.054 33.5L281.72 206.67c-7.699-4.03-16.444-6.323-25.719-6.323-30.687 0-55.652 24.966-55.652 55.652 0 30.687 24.966 55.652 55.652 55.652 30.687 0 55.652-24.966 55.652-55.652 0-9.275-2.293-18.02-6.323-25.718l72.026-72.026c19.239 23.85 30.406 52.094 33.5 81.05H395.13c-9.22 0-16.696 7.475-16.696 16.696 0 9.22 7.475 16.696 16.696 16.696h15.734c-3.093 28.956-14.26 57.206-33.501 81.056l-11.177-11.177c-6.519-6.519-17.091-6.519-23.611 0-6.52 6.52-6.52 17.091 0 23.611l23.611 23.611c6.52 6.52 17.091 6.52 23.611 0 36.482-36.483 55.421-85.084 55.421-133.798C445.217 151.681 360.676 66.783 256 66.783zm0 211.478c-12.275 0-22.261-9.986-22.261-22.261 0-12.275 9.986-22.261 22.261-22.261 12.275 0 22.261 9.986 22.261 22.261 0 12.275-9.986 22.261-22.261 22.261z" />

    </svg>
    const svgHum = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.36 122.88">
        <path fill="#fff" d="M64.66 7.48c7.83 33.51 38.7 57.89 38.7 77.66 0 47.88-70 50.2-76.82 6.94a31.53 31.53 0 0 1-15-4.93 24.91 24.91 0 0 1-8.26-9.08A28.3 28.3 0 0 1 .05 66.14c-.44-8.2 2.19-17.44 8-26.24l3.29-4.85c6.51-9.53 13.93-20.38 16.8-32.82a2.87 2.87 0 0 1 5.6 0C36.67 14.6 44.08 25.45 50.59 35l1.33 2c5.43-9 10.26-18.72 12.74-29.46ZM26 86.26v-1.12C26 72.88 37.75 59 48.59 42.27l-2.75-4.05c-5.23-7.67-11-16.16-14.85-25.8-3.81 9.7-9.62 18.19-14.86 25.87l-3.25 4.79c-5.15 7.74-7.47 15.75-7.1 22.77a22.57 22.57 0 0 0 2.55 9.52 19.25 19.25 0 0 0 6.37 7A25.53 25.53 0 0 0 26 86.26Zm15.08-6.77a3.92 3.92 0 0 1 7.81-.71 37.8 37.8 0 0 0 3.81 14.16A25 25 0 0 0 62.5 103a3.92 3.92 0 1 1-4 6.76A32.68 32.68 0 0 1 45.78 96.6a45.8 45.8 0 0 1-4.67-17.11Z" />
    </svg>
    return (

        <div className={ s.weather }>

            <fieldset>
                <input
                    type="text"
                    onChange={ event => setLocation(event.target.value) }
                    onKeyPress={ searchLocation }
                    placeholder='Enter Location'
                />

                {/* <button disabled={true} //кнопка для сохранения городов
                onClick={handleToggle}
                >Save</button> */}
                
                {/* <Router>
                    <div>
                        <Link to="/"><button className={ s.slider }></button></Link>
                        <Link to="/2"><button className={ s.slider }></button></Link>
                        <Link to="/3"><button className={ s.slider }></button></Link>
                       
                    </div>
                
                    <Routes>

                        <Route path="/2" element={ <Two /> } />

                        <Route path="/3" element={ <Three /> } />

                        <Route path="/" element={ <One /> } />

                    </Routes>

                </Router> */}
                
            </fieldset>
{/* реализовать svg селектор, или перенести свгшки в отдельные компоненты */}
            <div className={ s.wrapper }>

                <div className={ s.loc }>
                    { svgLoc }
                    { data.main ? <p>{ data.name }</p> : ' ' } 
                    {/* 👆👆👆 
                            проверяем пришел ли ответ от сервера*/}
                </div>
                
                <div className={ s.temp }>
                    {svgTemp}
                    { data.main ? <p>{ Math.floor(data.main.temp - 273) }°C</p> : ' ' }
                    {/* 👆👆👆 
                            проверяем пришел ли ответ от сервера(температура приходит в кельвинах, переводим в цельсии + округляем до целого (можно попробовать отредактировать запрос для получения температуры в нужных единицах) )*/}
                </div>

            </div>

            <div className={ s.wrapper }>

                <div className={ s.wind }>
                    {svgWind}
                    { data.wind ? <p>{ data.wind.speed } m/s</p> : '' }
                </div>
                
                <div className={ s.press }>
                    {svgPress}
                    { data.main ? <p>{ data.main.pressure } hPa</p> : ' ' }
                </div>
                
                <div className={ s.hum }>
                    {svgHum}
                    { data.main ? <p>{ data.main.humidity } %</p> : ' ' }
                </div>
                
            </div>

        </div>

    )
}
// function One() { //для роутинга
//     return <img src={ logo2 } className="App-logo" alt="logo" ></img>
// }

// function Three() {
//     return <img src={ logo3 } className="App-logo" alt="logo" ></img >
// }

// function Two() {
//     return <img src={ logo } className="App-logo" alt="logo" ></img >
// }
export default TodayWeather