import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const router = useRouter();

  const onValid = async (data: IForm) => {
    try {
      const req = await fetch("/api/users/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (req.status === 200) {
        router.push("/");
      } else {
        setError("email", {
          type: "custom",
          message: `${req.status}: Login failed.`,
        });
      }
    } catch (e) {
      setError("email", { type: "custom", message: "Something Wrong!" });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            {...register("email", {
              required: "Email is required.",
            })}
            type="email"
            required
          />
          <span>{errors.email?.message}</span>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
