import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const CropCard = ({ crop }) => {

    const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleDetails = ()=>{
    if(user){
      navigate(`/cropDetails/${_id}`);
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login",
      })
      navigate('/login', { state: { from: `/cropDetails/${_id}` } });
      
    }
  }
  


    const {image,name,pricePerUnit,type,description,_id}=crop;
  return (
    <div className="card bg-base-100 w-96 shadow-sm ">
        <figure>
          <div className="h-[400px] w-fll">
          <img
          className="w-full h-full object-cover rounded-t-xl"
            src={image}
            alt="Crop" />
          </div>
        </figure>
        <div className="card-body bg-gradient-to-r from-[#ffe600] to-[#00c853]">
          <h2 className="card-title text-white font-bold text-3xl">Name : {name}</h2>
          <h2 className='text-white font-bold text-2xl'>Type : {type}</h2>
          <h1 className='text-white font-bold'>Price-PerUnit : {pricePerUnit} Taka</h1>
          <p className='text-white font-semibold'>{description}</p>
          <div className="card-actions justify-end">
            <button onClick={handleDetails} className="btn font-bold bg-gradient-to-r from-[#ffe600] to-[#00c853] hover:from-red-600 hover:to-[#00c853] text-white">Crop Detalis</button>
          </div>
        </div>
      </div>
  );
};

export default CropCard;
