import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../../utils/validate";
import instance from "../../apis/apisconfig";
import toast from "react-hot-toast";
import bg from "../../assets/bgDa5.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      const formDataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const response = await instance.post("register", formDataToSend);
      if (response) {
        toast.success("Đăng ký tài khoản thành công");
        console.log("->", response);
        navigate("/login");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        console.error("Đã có lỗi xảy ra:", error.message);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="rounded bg-[#F6FBF9] bg-opacity-50 p-10 shadow-md w-[410px] h-[540px]">
        <div className="flex items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Tên
            </label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="min-h-[20px]">
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Email@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="min-h-[20px]">
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="abcxyz"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="min-h-[20px]">
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="confirm_password"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="abcxyz"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <div className="min-h-[20px]">
              {errors.confirm_password && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirm_password}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              Đăng ký
            </button>
            <Link
              to="/login"
              className="pl-16 pt-4 text-sm text-gray-500 hover:text-blue-400"
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
