import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loginschema } from "../../utils/validate";
import instance from "../../apis/apisconfig";
import toast from "react-hot-toast";
import bgDa5 from "../../assets/bgDa5.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Loginschema.validate(formData, { abortEarly: false });

      const response = await instance.post("login", formData);
      if (response) {
        if (response.data.status_code === 200) {
          let token = response.data.token;
          localStorage.setItem("isLogin", token.substring(3));
          localStorage.setItem("userId", response.data.data.user_id);
          toast.success("Chào bạn đến với Todo App!");
          console.log("->", response.data);
          navigate("/");
        } else {
          toast.error(response.data.message);
          console.log(response);
        }
      }
    } catch (error) {
      console.log(error);
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
      style={{
        backgroundImage: `url(${bgDa5})`,
      }}
    >
      <div className="rounded bg-[#F6FBF9] bg-opacity-50 p-10 shadow-md">
        <div className="flex items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
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
          <div className="flex items-center">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              Đăng nhập
            </button>
            <Link
              to="/register"
              className="pl-16 pt-4 text-sm text-gray-500 hover:text-blue-400"
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
