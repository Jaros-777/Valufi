import "./../Order.scss";
import { useContext, useEffect, useState } from "react";
import { pageContext } from "../../App";
import { useNavigate } from "react-router-dom";

function ChangeInformations() {
  const { supabase, user } = useContext(pageContext);
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [telephone, setTelephone] = useState("");

  const navigate = useNavigate()
  //town, street, houseNumber, telephone

  

  useEffect(()=>{
    if(user){
      setTown(user.details.address.town || "");
      setStreet(user.details.address.street || "");
      setHouseNumber(user.details.address.houseNumber || "");
      setTelephone(user.details.telephone || "");
    }
  },[user])

  

  const changeUserDetails = async () => {
    const newDetail = {
      address: {
        town: town,
        street: street,
        houseNumber: houseNumber,
        flatNumber: flatNumber,
      },
      telephone: telephone,
    };

    try {
      const { data, error } = await supabase
        .from("ValufiUsersAccount")
        .update([{ details: newDetail }])
        .eq("userId", user.userId);

        navigate("/")
        window.location.reload()
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

 

  if (!user) {
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className="logic-functions" id="logic-pass">
        <p>Town</p>
        <input
          type="text"
          value={town}
          onChange={(e) => {
            setTown(e.target.value);
          }}
        />
        <p>Street</p>
        <input
          type="text"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          
        />
        <p>House number</p>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => {
            setHouseNumber(e.target.value);
          }}
          
        />
        <p>Telehpone</p>
        <input
          type="text"
          value={telephone}
          onChange={(e) => {
            setTelephone(e.target.value);
          }}
        />
        <button onClick={changeUserDetails}>Change</button>
      </div>
    </>
  );
}

export default ChangeInformations;
