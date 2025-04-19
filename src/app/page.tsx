import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800" dir="rtl">
      {/* Navbar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-indigo-700">زونکن</h1>
        <nav className="space-x-6 space-x-reverse text-sm font-medium">
          <a href="#features" className="hover:text-indigo-700">
            ویژگی‌ها
          </a>
          <a href="#pricing" className="hover:text-indigo-700">
            قیمت‌گذاری
          </a>
          <a href="#contact" className="hover:text-indigo-700">
            تماس با ما
          </a>
          <Link
            href="auth/sign-up"
            className="mr-6 rounded-xl bg-indigo-700 px-4 py-2 text-white transition hover:bg-indigo-800"
          >
            ثبت‌نام
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-800">
          مدیریت فایل و برنامه‌ریزی برای مشاوران املاک
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          زونکن به شما کمک می‌کند تا فایل‌های خود را مرتب کنید، وظایف خود را
          برنامه‌ریزی کنید و بهره‌وری خود را افزایش دهید — همه در یک فضای امن و
          ساده.
        </p>
        <button className="rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700">
          همین حالا شروع کنید
        </button>
      </section>

      {/* Features */}
      <section id="features" className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 text-center md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-700">
              مدیریت فایل
            </h3>
            <p className="text-gray-600">
              آپلود، دسته‌بندی و دسترسی آسان به فایل‌های املاک شما در هر زمان.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-700">
              برنامه‌ریزی کاری
            </h3>
            <p className="text-gray-600">
              ایجاد وظایف روزانه، یادآورها و تقویم برای سازمان‌دهی دقیق‌تر.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-indigo-700">
              دسترسی امن
            </h3>
            <p className="text-gray-600">
              اطمینان از امنیت اطلاعات و فایل‌های شما با فناوری رمزنگاری‌شده.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-10 text-2xl font-bold text-indigo-700">
            نظرات کاربران
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="mb-4 text-gray-600">
                «زونکن زندگی کاری من رو کاملاً منظم کرده. دیگه نگران گم شدن
                فایل‌ها نیستم!»
              </p>
              <p className="font-semibold text-indigo-700">– سارا مهدوی</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <p className="mb-4 text-gray-600">
                «با استفاده از تقویم زونکن، قرارها و بازدیدها رو خیلی بهتر
                مدیریت می‌کنم.»
              </p>
              <p className="font-semibold text-indigo-700">– حمید فراهانی</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 px-6 py-16 text-center text-white">
        <h3 className="mb-4 text-3xl font-bold">آماده‌ای پیشرفت کنی؟</h3>
        <p className="mb-6 text-lg">
          همین امروز به زونکن بپیوند و کار خودتو با نظم و برنامه شروع کن.
        </p>
        <button className="rounded-xl bg-white px-6 py-3 font-medium text-indigo-700 transition hover:bg-gray-100">
          ساخت حساب رایگان
        </button>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h3 className="mb-8 text-center text-2xl font-bold text-indigo-700">
            در تماس باش
          </h3>
          <form className="space-y-6">
            <div>
              <label className="mb-1 block text-sm">نام</label>
              <input
                type="text"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">ایمیل</label>
              <input
                type="email"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">پیام</label>
              <textarea
                className="w-full rounded-lg border px-4 py-2"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-indigo-700 px-6 py-2 text-white transition hover:bg-indigo-800"
            >
              ارسال
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 py-6 text-center text-white">
        <p>&copy; ۲۰۲۵ زونکن. تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}
