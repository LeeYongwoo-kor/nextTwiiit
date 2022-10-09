import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div>
      <h2>Please Login!</h2>
      <form>
        <input type="text" placeholder="Email" />
        <button>Login</button>
      </form>
      <button>Create Account</button>
    </div>
  );
};

export default Login;
