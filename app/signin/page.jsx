'use client';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/reducers/userReducer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SignUpPage() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(form));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center py-2 bg-primary w-[40rem] h-[45rem] rounded-2xl border-2 shadow-xl ">
        <h1 className="text-4xl font-bold mb-8">Kayıt Ol</h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Ad</label>
            <Input type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />

          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Soyad</label>
            <Input type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
            <Input type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

          </div>
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? "Kaydediliyor." : "Kayıt Ol"}
          </Button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {user && <p className="mt-4 text-green-600">Kayıt Başarılı!</p>}
      </div>
    </div>
  );
}

export default SignUpPage;
