import { useState, useCallback, useRef, useEffect } from 'react'

import './App.css'

function App() {

  const [length, setlength] = useState(6)
  const [numbersAllowed, setnumbersAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numbersAllowed) str += "0123456789"
      if(charAllowed) str += "!@#$%^&*-_+=[]{}~`" 
      
      
      for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setpassword(pass)
          
    }, [length, numbersAllowed, charAllowed, setpassword])

  const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,20);
        window.navigator.clipboard.writeText(password);
  },[password])

    useEffect(() => {
       passwordGenerator()
    }, [length, numbersAllowed, charAllowed, passwordGenerator])
   

  return (

    <div className=' w-full max-w-md mx-auto rounded-lg shadow-md px-4 py-3 my-14 bg-gray-800 text-orange-600 '>
       <h1 className='text-center my-3 text-3xl  text-white'>Password Generator</h1>
       <div className='flex mb-3 rounded-md overflow-hidden'>
         <input 
            type="text"
            value={password}
            placeholder='Password'
            className='w-full py-1 px-3 selection:bg-blue-300'
            readOnly
            ref={passwordRef}
            
         />
         <button 
             className='bg-blue-700 text-white py-1 px-2 shrink-0 outline-none active:opacity-0.5 active:bg-blue-500'
             onClick={copyPasswordToClipboard}
         >copy</button>   
             
       </div>
       <div className='flex gap-5 my-5'>
         <div className='flex items-center gap-x-1'>
            <input
                type="range"
                value={length}
                min={6}
                max={20}
                className='cursor-pointer accent-blue-700  '
                onChange={(e) => {setlength(e.target.value)}}
            />
            <label htmlFor="length">length: {length}</label>
         </div>

         <div className='flex items-center gap-x-1'>
            <input 
                type="checkbox"
                defaultChecked={numbersAllowed}
                onChange={() => {setnumbersAllowed(prev => !prev)}}
                className='accent-blue-700'
                
             />
            <label htmlFor="Number input">Numbers</label>
         </div>

         <div className='flex items-center gap-x-1'>
            <input 
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {setcharAllowed(prev => !prev)}}
                className='accent-blue-700'
                
             />
            <label htmlFor="character input">characters</label>
         </div>

       </div>
    </div>
  )
  }

export default App
