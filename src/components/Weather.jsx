import React from 'react'
import s from './Weather.module.scss'

const TodayWeather = ( ) => {

    return (

        <div className={ s.weather }>

            <div className={ s.wrapper }>

                <div>
                    <div className={ s.temp }>20°</div>
                    <div className={ s.city }>
                        <p>Brjansk</p>
                    </div>
                    <div className={ s.time }>16:50</div>
                </div>

            </div>

        </div>

    )
}
export default TodayWeather