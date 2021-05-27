import React,{useState, useEffect, useRef} from 'react'
import './Dropdown.css'
export default function Dropdown({
    options, 
    field,
    prompt,
    value,
    onChange,
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const [q, setQ] =useState("")
    
    useEffect(() => {
        document.addEventListener('click', toggle)
        return ()=> {
            document.removeEventListener('click', toggle)
        }
    })
    const filter = ()=>{
        return options.filter((option) => {
            return(
                option[field].toLowerCase().indexOf(q.toLowerCase()) > -1
            )
        })
    }
    function toggle(e){
        
        setOpen(e && e.target === ref.current)
    }
    function displayValue(){
        if (value) return value
        if(q.length > 0  ) return q
        
        return "";
    }
    return (
        <div className='dropdown'>
            <div className="control" onClick={() => setOpen(prev => !prev)}>
                <div className="selected-value">
                    <input type='text'
                    required
                    ref={ref}
                    placeholder={value ? value[field] :prompt}
                    value={displayValue()}
                    onChange ={e => {
                        setQ(e.target.value)
                        onChange(null)
                        
                    }}
                    onClick={()=>setOpen(prev =>!prev)}
                    
                    ></input>
                </div>
                <div className={`arrow ${open ? 'open' :null}`}></div>
            </div>
            <div className={`options ${open ? 'open' :null}`}>
                {
                    filter(options).map((option,idx) => {
                        return(
                            <div key={idx} className={`option ${value === option[field] ? 'selected' :null}`}
                                onClick = {() => {
                                    onChange(option)
                                    setOpen(false)
                                    setQ("")
                                }}
                            >
                                {option[field]}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
