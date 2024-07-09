import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
    const[length, setLength] = useState(8);
    const[numberAllowed, setNumberAllowed] = useState(false);
    const[charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(()=>{
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed)   str += "1234567890";
        if(charAllowed) str += "~`!@#$%^&*()-_+=<>?/:;{}[]|"

        for(let i=1; i<=length; i++){
            let char = Math.floor(Math.random()*str.length +1);
            pass += str[char-1];
        }
        
        setPassword(pass);
    }, [length, numberAllowed, charAllowed, setPassword]);

    const copyToClipboard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    },[password]);

    useEffect(()=>{
        passwordGenerator();
    },[length, numberAllowed, charAllowed, passwordGenerator])

    return (
        <>
            <div className="flex justify-center">
                <div className="w-5/6 md:w-3/5 flex flex-col items-center bg-slate-700 mt-16 p-4 rounded-lg">
                    <div className="font-bold text-blue-500 text-6xl p-4 mb-4 font-serif">Password Generator</div>
                    {/* input box and copy button container */}
                    <div className="flex justify-center items-center rounded-xl overflow-hidden">
                        <input className='text-5xl text-blue-600 font-semibold outline-none p-2 ' type="text" value={password} ref={passwordRef}/>
                        <button className='text-5xl bg-slate-950 text-blue-700 font-semibold outline-none px-2 py-4' onClick={copyToClipboard}>copy</button>
                    </div>

                    {/* // 2nd row contains slide number checkbox characters checkbox */}
                    <div className="w-4/5 flex justify-between items-center p-4">

                        {/* slider */}
                        <div className='flex items-center'>
                            <input className="accent-blue-500 w-44 cursor-pointer" min={1} max={100} value={length} type="range" onChange={(e)=>{setLength(e.target.value)}} />
                            <label className='text-blue-400 font-bold text-2xl text-center pl-2'  > Length : ({length})</label>
                        </div>

                        {/* numbers checkbox */}
                        <div className='flex items-center'>
                            <input className='h-5 w-5 ml-2 text-center outline-none text-slate-500 rounded-full focus:ring-0' type="checkbox" id='numberAllowed' defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
                            <label className='text-blue-400 font-bold text-2xl text-center pl-2 cursor-pointer' htmlFor="numberAllowed">Numbers</label>
                        </div>

                        {/* characters checkbox */}
                       <div className='flex items-center'>
                            <input className='h-5 w-5 ml-2 text-center outline-none text-slate-500 rounded-full focus:ring-0' type="checkbox" id='charAllowed' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
                            <label className='text-blue-400 font-bold text-2xl text-center pl-2 cursor-pointer' htmlFor="charAllowed">Characters</label>
                       </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default App