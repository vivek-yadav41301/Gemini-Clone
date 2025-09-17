import React, { useEffect, useState } from "react";
import { cheackHeading } from "../helper";
import { replaceheadingStarts } from "../helper";
function Answer({ ans, id ,totallength,type}) {
  const [heading, setHeading] = useState(false);
  const [answer,setAnswer]=useState(ans)
  useEffect(() => {
    console.log(ans);
    if (cheackHeading(ans)) {
      setHeading(true);
      setAnswer(replaceheadingStarts(ans))
      
    } else {
      setHeading(false);
    }
  }, []);
  

  return (
    <div>
        
      {
        id==0&&totallength>1?<span className="  text-3xl">{answer}</span>: heading?<span className="py-2 text-shadow-white text-2xl block">{answer}</span>:<span className={type=='q'?"text-gray-100 text-xl pl-1":"text-gray-100 text-xl pl-5"}>{answer}</span>
      }
      
    </div>
  );
}

export default Answer;
