export default function Card({ name, img, id, handleClick}) {
   return(
    <div className="pokemon" onClick={() => handleClick(id)}>
        <img src={img} alt={name} />
    </div>
   ) 
}