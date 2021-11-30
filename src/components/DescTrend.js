import React from 'react'
import moment from 'moment'

const DescTrend = ({ data, isLoading, difference }) => {
  let prices;
  let currentArray = 0;
  let longestArray = 0;
  let hourlyArray = [];

  if (difference <= 90) {
    if (isLoading === false) {
      for (let i = 0; i <= data.prices.length; i = i + 24) {
        hourlyArray.push(data.prices[i][1])
      }
      prices = hourlyArray;
      for (let i = 0; i <= prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
          currentArray = currentArray + 1;;
        } else if (currentArray >= longestArray) {
            longestArray = currentArray;
            currentArray = 0;
        } else {
          currentArray = 0;
        }
      }

    }
  } else {
    if (isLoading === false) {
      prices = data.prices.map(priceObj => {
        return priceObj[1]
      })
  
      for (let i = 0; i <= prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
          currentArray +=1;
        } else if (currentArray > longestArray){
            longestArray = currentArray;
            currentArray = 0;
        } else {
          currentArray = 0;
        }
      }
    }
  }

  return (
    <div className="descTrend_div">
      <h3 className="section_title">Descending trend</h3>
      {isLoading ?  "Loading..." : <p className="p_tag">between dates <b>{moment(data && data.prices[0][0]).format('DD/MM/YYYY').toString()}</b> and <b>{moment(data.prices[data.prices.length -1][0]).format('DD/MM/YYYY').toString()}</b></p>}
      <p className="p_tag">The longest descending trend was <b>{longestArray} days</b> in a row</p>
    </div>
  )
}

export default DescTrend





