
import Error from "./Error";
import useHttp from "./hooks/useHttp";
import MealItem from "./mealItem";
const requestConfig={};
export default function Meals(){
const {data:load,error,isLoading}=useHttp("http://localhost:3000/meals",requestConfig,[]);
console.log(load);
if(isLoading===true){
    return <p className="center">fetching data....</p>
}
if(error){
    return <Error title="filed to ftch meals" message={error}/>
}
    return(
        <ul id="meals">
        {load.map((meal,index)=>(
            <MealItem key={index} meal={meal} />
            )
        )}
        </ul>
    )
}