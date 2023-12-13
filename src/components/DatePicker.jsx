import React from 'react'
import { useState } from 'react';

export default function DatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
  return (
    <div>
    
      <DatePicker
        value={startDate}
        onChange={date => setStartDate(date)}
      />
      <DatePicker
        value={endDate}
        onChange={date => setEndDate(date)}
      />
    
    </div>
  )
}
