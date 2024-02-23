import { useDispatch, useSelector } from "react-redux";
import "../camera/index.css";
function Gallery() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customers.customers);
  const styleButton = {
    backgroundColor: "transparent",
    border: "2px solid white",
    padding: "10px 15px",
    marginRight: "auto",
    color: "white",
    cursor: "pointer",
  };
  return (
    <div className="container">
      <div className="wrapper">
        {data.map((el, index) => {
          return (
            <img src={el} key={index} width={250} height={250} alt="Picture" />
          );
        })}
      </div>
      {data.length > 0 && <button onClick={() => {
        dispatch({type:"Remove_customer",payload:[]})
      }} style={styleButton}>All clear</button>}
    </div>
  );
}

export default Gallery;
