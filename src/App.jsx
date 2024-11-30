import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(true)
  const [password , setPassword] = useState("")
  //useref hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback ( () => {
    let pass = ""
    let str = "ASDFGHJKLMNBVCXZpoiuytrewq"

    if (numberAllowed) str+= "0987654321"
    if (charAllowed) str+= "@#!$%*&"

    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length , numberAllowed, charAllowed, setPassword]) 

  const copyPasswordClipboard = useCallback ( () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password] )

  

  useEffect( () => { passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
  
      <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-12 py-8 my-16 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3 text-4xl font-bold'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />

          <button
          onClick={copyPasswordClipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> Copy </button>

        </div>
        <div className='flex text-lg gap-x-7'>

          <div className='flex items-center gap-x-2'>
            <input
             type="range"
             min={0}
             max={20}
             value={length}
             className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length : {length} </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={numberAllowed}
             id="numberInput"
             onChange={() => {setNumberAllowed ((prev) => !prev )}}
              />
              <label htmlFor="numberInput">Numbers</label>
          </div>

          
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={charAllowed}
             id="charInput"
             onChange={() => {setCharAllowed ((prev) => !prev )}}
              />
              <label htmlFor="charInput">Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
