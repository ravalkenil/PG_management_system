import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useAppContext } from "../Contexts/AppContext";
import * as apiClient from "../Api-client"
import { useNavigate } from 'react-router-dom';

export type SignInFormData = {
    email : string;
    password: string;
}

const SignIn = () => {

    const {register,handleSubmit ,formState:{ errors, } }=useForm<SignInFormData>();
    const { showToast } = useAppContext();
    const nevigate = useNavigate();

    const mutation= useMutation(apiClient.signIn, {
        onSuccess : async()=> {
            showToast({ message: "Signin Success!", type: "SUCCESS" });
            nevigate("/");
        }, onError : (error : Error)=> {
            showToast({ message: error.message, type: "ERROR" });
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
      });
  return (
    <form className='flex flex-col gap-5 '  onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold' >
            Sign In
        </h2>
        <label className="text-grey-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at Least 6 characters ",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl  rounded-md "
        >
      
          Login
        </button>
      </span>
    </form>
  )
}

export default SignIn;