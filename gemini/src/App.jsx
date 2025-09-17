import React, {  useEffect, useState } from "react";
import { Url } from "./Constants";
import Answer from "./Component/Answer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [question, setquestion] = useState("");
  const [showLanding, setShowLanding] = useState(true);

  const [result, setResult] = useState([]);
  const [display,setDisplay]=useState([])
  useEffect(()=>{
   const store=JSON.parse(localStorage.getItem("chatHistory"))||[]
   setResult(store)
   setDisplay(store)
  
  },[])
  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };
  function handleHistory(idx)
  {
    const ques=result[idx];
    const anss=result[idx+1]
    setDisplay([ques,anss])
  }

  function deleteHistory(idx)
  {
   const newhistory=result.filter((item,i)=>i!=idx&&i!=idx+1)
  setResult(newhistory)
  setDisplay([])

  
   localStorage.setItem('chatHistory',JSON.stringify(newhistory))
      
  }
  const askQuestion = async () => {
    if (!question.trim()) return;
    let response = await fetch(Url, {
      method: "Post",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let datastring = response.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ");

    datastring = datastring.map((item) => item.trim());
    console.log(datastring);
    const newresult=[
      ...result,
      { type: "q", text: question },
      { type: "a", text: datastring },
    ]
    setResult(newresult);
    //display ek dost ki trah h jo same kam krga set result ki bs jv tk same ho jv history choya hogi to y kud ko 2 ma divid karga
    setDisplay(newresult)
    localStorage.setItem("chatHistory",JSON.stringify(newresult))
    setquestion('')
  };
  console.log(result);



  function clearhistory()
  {
    setDisplay([])
    setResult([])
    // localStorage.setItem("chatHistory",JSON.stringify([]))
    localStorage.removeItem("chatHistory")
  }
  return (
  
 

    
    <div className="grid grid-cols-5 h-screen text-center">
      {/* history */}
      <div className="col-span-1 bg-zinc-800">
        <div>
          <h1 className= "text-white text-2xl">History</h1>
         <div className="p-4"><button  onClick={clearhistory} className="w-full px-4 py-2  bg-blue-600 border border-transparent hover:border-blue-200 text-white cursor-pointer rounded-2xl">Clear all</button></div> 
        </div>
      <ul>
        
        {
          result.map((item,index)=>(
            item.type=='q'?<li  onClick={()=>handleHistory(index)}className="text-white flex items-center bg-gray-400  justify-between text-left border-1 rounded-xl p-2 m-2">{item.text} <FontAwesomeIcon onClick={(e)=>{
              e.stopPropagation()
              deleteHistory(index)}} icon={faXmark} className="cursor-pointer" />
</li> :null
          ))
        }
      </ul>
      </div>
      <div className="col-span-4">
        <div className="container h-180 overflow-auto">
          <div className="text-white ">
            <ul>
    {/* result replace kiya mne by display  */} 
           {display.map((item, index) => ( 
                <div
                  key={index + Math.random()}
                  className={item.type == "q" ? "flex justify-end" : ""}
                >
                  {item.type == "q" ? (
                    <li
                      key={index + Math.random()}
                      className="text-right border-10 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit  m-4 p-1  "
                    >
                      <Answer
                        type={item.type}
                        totallength={1}
                        ans={item.text}
                        id={index}
                      />
                    </li>
                  ) : (
                    item.text.map((ansitem, ansindex) => (
                      <li
                        key={ansindex + Math.random()}
                        className="text-left m-4 p-1  "
                      >
                        <Answer
                          type={item.type}
                          totallength={item.text.length}
                          ans={ansitem}
                          id={ansindex}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
            {/* <ul>
              {result &&
                result.map((item, index) => (
                  <li key={index+Math.random()} className="text-left m-4 p-1  ">
                    <Answer totallength={result.length} ans={item} id={index} />
                  </li>
                ))}
            </ul> */}
          </div>
        </div>
        <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16">
          <input
            type="text"
            value={question}
            onChange={(evt) => setquestion(evt.target.value)}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                askQuestion(); // 👈 Enter press pe button ke jaise chalega
              }
            }}
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
