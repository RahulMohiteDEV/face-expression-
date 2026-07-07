
import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext();


export const SongContextProvider = ({children}) => {

const [song, setSong] = useState({
    
"url":"https://ik.imagekit.io/qj2szuvqwc/cohort-2/moodify/songs/Tum_Jo_Mile_H…",
"postUrl":"https://ik.imagekit.io/qj2szuvqwc/cohort-2/moodify/posters/Tum_Jo_Mile…",
"title":"Tum Jo Mile Ho (From Vicky Vidya Ka Woh Wala Video) [DownloadMing.Co…",
"mood":"Happy"

});

const [loading, setLoading] = useState(false);

return ( 
  
    <SongContext.Provider value={{song, setSong, loading, setLoading}}>
    {children}
   </SongContext.Provider>

  )

}