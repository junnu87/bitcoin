import React from 'react'
import moment from 'moment'

const BestDays = ({ data, isLoading }) => {
  let highestPrice = 0;
  let lowestPrice;
  let indexOfSmallest;
  let indexOfLargest;
  let priceArray;
  let dateArray;
  let count = 0;

  if (isLoading === false) {
    priceArray = data.prices.map(price => {
      return price[1]
    })

    dateArray = data.prices.map(date => {
      return date[0]
    })

    lowestPrice = Math.min(...priceArray);
    indexOfSmallest = priceArray.indexOf(lowestPrice);

    for (let i = indexOfSmallest; i < priceArray.length; i++) {
      if (priceArray[i] > highestPrice) {
        highestPrice = priceArray[i];
      }
    }
    

    indexOfLargest = priceArray.indexOf(highestPrice)

    for (let i = 0; i < priceArray.length; i++) {
      if (priceArray[i] > priceArray[i - 1]) {
        count += 1;
      }
    }
    
  }

  return (
    <div className="bestDays_div">
       <h3 className="section_title">Best day to buy and sell</h3>
       {count === 0 ? <p className="p_tag">You should not buy or sell during this time period</p> : <p className="p_tag">The best day to buy is <b>{moment(dateArray[indexOfSmallest]).format('DD/MM/YYYY').toString()}</b> and the best day to sell is <b>{moment(dateArray[indexOfLargest]).format('DD/MM/YYYY').toString()}</b> </p>}
    </div>
  )
}

export default BestDays
