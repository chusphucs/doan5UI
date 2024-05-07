import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center ">
      <div className="rounded bg-[#F6FBF9] bg-opacity-50 p-10 shadow-md">
        <div className="flex items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">Đăng ký</h2>
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
            />
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
            />
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="abcxyz"
              name="confirm_pasword"
            />
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
