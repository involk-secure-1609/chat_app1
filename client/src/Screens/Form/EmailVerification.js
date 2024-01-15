import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Avatar from '../../assets/avatar.svg';

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState();
  const param = useParams();

  useEffect(() => {

    const verifyEmailUrl = async () => {
       const res = await fetch(`http://localhost:8080/api/users/${param.id}/verify/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
      
    );
    if(res.status===200)
    {
        setValidUrl(true);
    }
    else if(res.status===500)
    {
        setValidUrl(false);
    }
    };

    verifyEmailUrl();
    
   }, [param]);

  return (
    <>
      {validUrl ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={Avatar} alt="success_img" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Email verified successfully</h1>
          <Link to="/users/sign_in" className="text-green-500">
            <button className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-green hover:bg-green-600">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1 className="text-2xl font-bold">404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
