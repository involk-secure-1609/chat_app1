import { useState,useEffect } from "react";
import Input from "../../common_components/Input/input";
import Button1 from "../../common_components/Buttons/buttons";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Button as BootstrapButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";



const Form = ({ isSignInPage = true }) => {

  const [open, setOpen] = useState(false);
  const [dialogMsg,setDialogMsg]=useState("");
  // const handleOpen = () => setOpen(!open);

  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
      email: "",
      password: "",
    }),
  });
  const navigate = useNavigate();

  //    useEffect(() => {
  //   setSocket(io("http://localhost:8080"));
  // }, []);

  const handleModalClose = () => {
    setOpen(false);
    navigate("/");
  };
  const handleSubmit = async (e) => {
    console.log("data :>> ", data);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resData = await res.json();
    if (res.status === 400) 
    {
      setDialogMsg(`${resData.msg}`);
      setOpen(true);
      // alert(`${resData.msg}`);
    } else if (res.status === 200 && resData.loggedIn === false) 
    {
      alert(`${resData.msg}`);
    } else if (resData.token) 
    {
      // setDialogMsg("Login Successful, Please click Continue to start chatting.");
setDialogMsg(`Login Successful.\nPlease click Continue to start chatting.`);
      // setModalMessage("Login Successful, Please click Continue to start chatting.");
      // alert("Login successful")
      localStorage.setItem("user:token", resData.token);
      localStorage.setItem("user:detail", JSON.stringify(resData.user));
      // socket?.emit("addUser", resData.user?.id);
      // navigate("/");
      // setShowModal(true);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="bg-light h-screen flex items-center justify-center">
        <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
          <div className="text-4xl font-extrabold">
            Welcome {isSignInPage && 'Back'}
          </div>
          <div className="text-xl font-light mb-14">
            {isSignInPage ? 'Sign in to start chatting' : 'Sign up to get started'}
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
            <Button1
              label={isSignInPage ? 'Sign in' : 'Sign up'}
              type="submit"
              className="w-[75%] mb-2"
            />
          </form>
          <div>
            {isSignInPage ? "Didn't have an account?" : 'Already have an account?'}{' '}
            <span
              className="text-primary cursor-pointer underline"
              onClick={() =>
                navigate(`/users/${isSignInPage ? 'sign_up' : 'sign_in'}`)
              }
            >
              {isSignInPage ? 'Sign up' : 'Sign in'}
            </span>
          </div>

          
          <Dialog
  open={open}
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
>
            <div className="bg-green-700 p-8 rounded-lg" style={{ width: '60%' }}>
            <DialogBody className="text-xl flex justify-center">
                 {dialogMsg}
              </DialogBody>
              <DialogFooter className="flex justify-center">
                <BootstrapButton
                  variant="text"
                  onClick={handleModalClose}
                  className="mr-1"
                >
                  <span>CONTINUE</span>
                </BootstrapButton>
              </DialogFooter>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Form;