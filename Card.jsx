import './Card.css'
function Card(props)
{
   return(
    <div className="column">
    <img src= {props.avatar} alt ='Staff' width ={310} height ={300}/>
    <h3>{props.name} </h3>
    <p> {props. position}</p>

    </div>
   )

}

export default Card