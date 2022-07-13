import React,{ useState, useEffect } from 'react'
import s from './Weather.module.scss'
import { svgHum,svgLoc,svgPress,svgTemp,svgWind } from '../../img/SVG/SVG'
import SearchCity  from '../SearchCity/SearchCity'

const TodayWeather = () => {

    const [data,setData] = useState({})
    const [lat,setLat] = useState(null);
    const [lon,setLon] = useState(null);
    const [status,setStatus] = useState(null)
  
   
    const urlForCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5dbc1dc5eb96460925f3794ad1764fe8` //урл для запроса с координатами
    
    const getGeolocation = () => { //получаем координаты (deprecated)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
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
                })
        }
        if (lat && lon) {
            fetchCurrentWeather();
        }
    }, [lat,lon]);

    getGeolocation() //что-то не так
   
    return (

        <div className={ s.weather }>
            <SearchCity/>
            <div className={ s.wrapper }>

                <div className={ s.loc }>
                    { svgLoc }
                    { data.main ? <p>{ data.name }</p> : ' undefined' } 
                    {/* 👆👆👆 
                            проверяем пришел ли ответ от сервера*/}
                </div>
                
                <div className={ s.temp }>
                    {svgTemp}
                    { data.main ? <p>{ Math.floor(data.main.temp - 273) }°C</p> : ' undefined' }
                    {/* 👆👆👆 
                            проверяем пришел ли ответ от сервера(температура приходит в кельвинах, переводим в цельсии + округляем до целого (можно попробовать отредактировать запрос для получения температуры в нужных единицах) )*/}
                </div>

            </div>

            <div className={ s.wrapper }>

                <div className={ s.wind }>
                    {svgWind}
                    { data.wind ? <p>{ data.wind.speed } m/s</p> : 'undefined' }
                </div>
                
                <div className={ s.press }>
                    {svgPress}
                    { data.main ? <p>{ data.main.pressure } hPa</p> : ' undefined' }
                </div>
                
                <div className={ s.hum }>
                    {svgHum}
                    { data.main ? <p>{ data.main.humidity } %</p> : 'undefined ' }
                </div>
                
            </div>

        </div>

    )
}

export default TodayWeather