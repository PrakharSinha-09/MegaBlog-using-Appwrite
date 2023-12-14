import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';

function App() {

  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1>Hey There!</h1>
    </>
  )
}

export default App
