import React, { useRef, useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const CropDetalis = () => {
  const [buyQuantity, setBuyQuantity] = useState(0);

  const interestModalRef = useRef(null);
  const handleModal = () => {
    interestModalRef.current.showModal();
  };

  const { user } = useContext(AuthContext);

  const product = useLoaderData();
  const {
    image,
    name,
    pricePerUnit,
    type,
    description,
    quantity,
    location,
    _id,
  } = product;

  const totalPrice = buyQuantity * pricePerUnit;

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const quantity = Number(e.target.quantity.value);
    const message = e.target.message.value;
    // const totalPrice = e.target.totalPrice.value;
    console.log(name, email, quantity, message, totalPrice, _id);


    if (!quantity || quantity <= 1) {
      alert("Please select your Quantity more than 1")
         return
    }
  };


 

  return (
    <div className="hero bg-base-200 min-h-screen bg-gradient-to-r from-green-800 to-green-500">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={image}
          className="w-[450px] h-[450px] md:ml-[-200px] rounded-lg shadow-2xl"
        />
        <div className="md:ml-[70px]">
          <h1 className="text-5xl text-white font-bold">Name : {name}</h1>
          <h1 className="mt-3 text-white font-bold text-3xl"> Type : {type}</h1>
          <h1 className="mt-3 font-bold text-white">
            Price-PerUnit : {pricePerUnit} Taka
          </h1>
          <h1 className="mt-3 font-bold text-white">
            Quantity : {quantity} kg
          </h1>
          <h1 className="mt-3 font-bold text-white">Location : {location}</h1>
          <p className="py-6 text-white font-semibold">
            Description : {description}
          </p>
          <button
            onClick={handleModal}
            className="btn text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 font-bold"
          >
            My Interest
          </button>

          <dialog
            ref={interestModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Your Interest</h3>
              <form onSubmit={handleInterestSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    readOnly
                    defaultValue={user.displayName}
                  />
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    readOnly
                    defaultValue={user.email}
                  />
                  <label className="label">Quantity (number input)</label>
                  <input
                    name="quantity"
                    type="number"
                    className="input"
                    placeholder="Enter the number of units/kg"
                    value={buyQuantity}
                    onChange={(e) =>
                      setBuyQuantity(
                        e.target.value === "0" || e.target.value === ""
                          ? ""
                          : Number(e.target.value)
                      )
                    }
                  />
                  <label className="label">Message (text input)</label>
                  <input
                    name="message"
                    type="text"
                    className="input"
                    placeholder="Send any Message"
                  />
                  <p name="totalPrice" className="font-bold mt-2">
                    Total Price:{" "}
                    <span className="text-green-600">{totalPrice} Taka</span>
                  </p>

                  <button className="btn btn-neutral mt-4">
                    Submit your interest
                  </button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default CropDetalis;
