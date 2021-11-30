import React from 'react'
import moment from 'moment'

const HighestTradingVolume = ({data, isLoading}) => {
  let highestTradingVolume;

  if (isLoading === false) {
    // eslint-disable-next-line no-undef
    highestTradingVolume = data.total_volumes.reduce((prevObj, currObj) => currObj[1] > prevObj[1] ? currObj : prevObj)
  }

  return (
    <div className="highestTradingVolume_div">
      <h3 className="section_title">Highest Trading volume</h3>
      <p className="p_tag">The date with the highest trading wolume was on <b>{moment(highestTradingVolume[0]).format('DD/MM/YYYY').toString()}</b> and the volume was <b>{highestTradingVolume[1]}</b> euros</p>
    </div>
  )
}

export default HighestTradingVolume
