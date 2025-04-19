import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-indigo-700">
          ورود به زونکن
        </h2>
        <form className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-gray-600">ایمیل</label>
            <input
              type="email"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">رمز عبور</label>
            <input
              type="password"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <Link
            className="w-full rounded-lg bg-indigo-700 py-2 text-white transition hover:bg-indigo-800"
            href="/dashboard"
          >
            ورود
          </Link>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          حساب کاربری ندارید؟{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            ثبت‌نام کنید
          </a>
        </p>
      </div>
    </div>
  );
}
