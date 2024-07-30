'use client'
import axios from 'axios'
import React, { useState } from 'react'

function page() {
  const [value, setValue] = useState()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post('/api/categoryRoute', { value })
      response(res.data)
    } catch (error) {
      return error
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input onChange={(e) => setValue(e.target.value)} value={value}></input>
        <button>BAS</button>

      </form>
    </div>
  )
}

export default page