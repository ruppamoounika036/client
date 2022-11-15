import {useState,useEffect} from 'react'
import Router from 'next/router'
import styles from './Calling.module.css'
function Calling(){
    const [result,setResult] = useState([]);
    useEffect(() => {
        console.log(result);
         async function getAllUsers() {
            const result1 = await fetch('http://localhost:3070/').then((r)=>r.json());       
            setResult(result1);
        }
    if(result.length==0){
        getAllUsers();
    }        
    });
   
    return(
        <> 
          {result.map((resp,_id)=>{
             console.log(resp.name);
            return <div className={styles.container}> <div onClick={()=>{Router.push(resp.pagepath)}}  className={styles.cardList}><img src={resp.url} alt={resp.name}/><div>{resp.name}</div></div></div>
        })} 
        </>
    );
}
export default Calling;