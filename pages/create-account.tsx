import { useForm } from "react-hook-form";
import { NextPage } from "next";

const CreateAccount: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = () => {};
  return (
    <div>
      <h2>Please Create Account!</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input
            {...register("name", { required: "Write your name please." })}
            type="text"
            placeholder="Name"
            required
          />
          <span>{errors?.name?.message}</span>
        </div>
        <div>
          <input
            {...register("email", { required: "Write your email please." })}
            type="text"
            placeholder="Email"
            required
          />
          <span>{errors?.email?.message}</span>
        </div>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
