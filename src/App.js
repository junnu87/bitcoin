import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import DescTrend from './components/DescTrend';
import HighestTradingVolume from './components/HighestTradingVolume';
import BestDays from './components/BestDays';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changeStart, setChangeStart] = useState('');
  const [changeEnd, setChangeEnd] = useState('');
  const [startDate, setStartDate]  = useState('1577836800');
  const [endDate, setEndDate] = useState('1609376400');
  const [calcStart, setCalcStart] = useState('');
  const [calcEnd, setCalcEnd] = useState('');
  let difference;

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`).then(response => {
      setData(response.data);
      setIsLoading(false);
    })
  }, [startDate, endDate]);

  const handleSelectStart = (e) => {
    e.preventDefault();
    setChangeStart(e.target.value);
  };

  const handleSelectEnd = (e) => {
    e.preventDefault();
    setChangeEnd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStartDate(moment(`${changeStart} 2:00`).unix());
    setEndDate(moment(`${changeEnd} 2:00`).unix() + 3600);
    setCalcStart(changeStart)
    setCalcEnd(changeEnd)
    setChangeStart('');
    setChangeEnd('');
  };

  if (calcStart.length === 0) {
  } else {
    difference = moment(calcEnd).diff(moment(calcStart), 'days');
  };


  return (
    <div className="App">
      <h1 className="title">Bitcoin-app</h1>
      <div>
        <form onSubmit={handleSubmit}>
        <div className="input_field">
        <label>Select start date (MM/DD/YYYY) </label>
          <input value={changeStart} onChange={handleSelectStart} placeholder="MM/DD/YYYY"/>
        </div>
          <div className="input_field">
          <label>Select end date (MM/DD/YYYY) </label>
          <input value={changeEnd} onChange={handleSelectEnd} placeholder="MM/DD/YYYY"/>
          </div>

          <button className="submit_button" type="submit">Search</button>
        </form>
      </div>
      {isLoading ? 
      <div>Loading...</div> : <DescTrend data={data} isLoading={isLoading} difference={difference}/>}
      
      {isLoading ? 
      <div>Loading...</div> : <HighestTradingVolume data={data} isLoading={isLoading} difference={difference}/>}
      
      {isLoading ?
      <div>Loading...</div> : <BestDays data={data} isLoading={isLoading} difference={difference}/>}
    </div>
  );
}

export default App;
