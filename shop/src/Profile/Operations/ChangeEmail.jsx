import "../Settings.scss";
import { useContext, useState } from "react";
import { pageContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function ChangeEmail() {
  const { supabase, setCartList, setCartListTotal, setIsLogged } =
    useContext(pageContext);
  const [newEmail, setNewEmail] = useState("");
  const [confimrNewEmail, setconfimrNewEmail] = useState("");
  const [wrongRepeting, setWrongRepeting] = useState(false);
  const [wrongInfo, setWrongInfo] = useState("");

  const navigate = useNavigate();

  const changePassword = async () => {
    try {
      if (newEmail === confimrNewEmail) {
        // await supabase.auth.updateUser({ password: newPassword });



        setWrongRepeting(false);

        setIsLogged(false);
        localStorage.removeItem("userToken");
        await supabase.auth.signOut();
        setCartList([]);
        setCartListTotal(0);
        navigate("/")
        window.location.reload()
      } else {
        setWrongRepeting(true);
        setWrongInfo("The emails are not the same");
      }
    } catch (error) {
      console.log(error);
      setWrongRepeting(true);
      if (newPassword !== confirmNewPassword) {
        setWrongInfo("The emails are not the same");
      } else {
        setWrongInfo("Password must have min 6 signs");// !!!!!!!!!!!!!!!!!!!!!
      }
    }
  };

  return (
    <>
      <div className="logic-functions" id="logic-pass">
        <p>Coming soon...</p>
        {/* <p>Set new email</p>
        <input
          type="text"
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        />
        <p>Confirm new email</p>
        <input
          type="text"
          onChange={(e) => {
            setconfimrNewEmail(e.target.value);
          }}
        />
        {wrongRepeting ? <p style={{ color: "red" }}>{wrongInfo}</p> : <p></p>}
        <button onClick={changePassword}>Change</button> */}
      </div>
    </>
  );
}

export default ChangeEmail;
