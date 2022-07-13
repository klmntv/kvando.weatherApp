import React,{ useState } from 'react'
import axios from 'axios'
import s from './SearchCity.module.scss'

 const SearchCity =  () => {
    
    const [data,setData] = useState({})
    const [location,setLocation] = useState(' ')
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5dbc1dc5eb96460925f3794ad1764fe8` //урл для запроса с городом
    
    const searchLocation = (event) => { //функция для отправки запроса к погодной апи (с городом из инпута)
        if (event.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                localStorage.setItem('city',JSON.stringify(response.data.name))
            })
            setLocation('')
        }
    }
 
    const handleToggle = () => { //дописать
        console.log('clicked!')
        localStorage.setItem('city',JSON.stringify(location));
    };

  return (
      <form>
          <input
              value={ location }
              onChange={ e  => setLocation(e.target.value)
              }
              onKeyPress={ searchLocation }
              placeholder='Enter Location'
          />

          <button disabled={ true } //кнопка для сохранения городов
              onClick={ handleToggle }
          >Save</button>
      </form>
  )
}
// export { data,setData }
export default SearchCity