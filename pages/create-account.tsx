import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  name: string;
}

const CreateAccount: NextPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const router = useRouter();

  const onValid = async (data: IForm) => {
    try {
      const req = await fetch("/api/users/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (req.status === 403) {
        alert("Account already exists! Please create diffrent email.");
      }

      if (req.status === 201) {
        alert("Account created! Plaese log in!");
        router.push("/login");
      } else {
        setError("email", {
          type: "custom",
          message: `${req.status}: Account creation failed.`,
        });
      }
    } catch (e) {
      setError("email", { type: "custom", message: "Something Wrong!" });
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            {...register("name", {
              required: "Name is required.",
            })}
            type="name"
            required
          />
          <span>{errors.name?.message}</span>
        </div>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
