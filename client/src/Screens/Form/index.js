import { useState } from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Buttons/buttons";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignInPage = true }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
      email: "",
      password: "",
    }),
    // email: '',
    // password: ''
  });
  	// const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("data :>> ", data);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8080/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status === 400) 
    {
      alert("Invalid credentials");
    } 
    else if(res.status ===250)
    {
       alert("An email has been sent to your account,please verify your email");
                
    } 
    else {
      const resData = await res.json();
      if(res.status===230)
      {
          alert("An email has been sent to your account,please verify your email");
      }
      else if (resData.token) 
      {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail", JSON.stringify(resData.user));
        navigate("/");
      }
    }
  };

  return (
    <div className="bg-light h-screen flex items-center justify-center">
      <div className=" bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className=" text-4xl font-extrabold">
          Welcome {isSignInPage && "Back"}
        </div>
        <div className=" text-xl font-light mb-14">
          {isSignInPage
            ? "Sign in to start chatting"
            : "Sign up to get started"}
        </div>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={(e) => handleSubmit(e)}
        >
          {!isSignInPage && (
            <Input
              label="Full name"
              name="name"
              placeholder="Enter your full name"
              className="mb-6 w-[75%]"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mb-6 w-[75%]"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="mb-14 w-[75%]"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {/* {msg && <div className="mb-6 w-[75%]">{msg}</div>} */}
          <Button
            label={isSignInPage ? "Sign in" : "Sign up"}
            type="submit"
            className="w-[75%] mb-2"
          />
        </form>
        <div>
          {isSignInPage ? "Didn't have an account?" : "Alredy have an account?"}{" "}
          <span
            className=" text-primary cursor-pointer underline"
            onClick={() =>
              navigate(`/users/${isSignInPage ? "sign_up" : "sign_in"}`)
            }
          >
            {isSignInPage ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
