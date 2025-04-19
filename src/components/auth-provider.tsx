"use client";

import { authClient } from "@/lib/auth-client";
import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      providers={["github", "google"]}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      Link={Link}
      localization={{
        account: "حساب",
        accounts: "حساب‌ها",
        accountsDescription: "حساب‌های وارد شده فعلی خود را مدیریت کنید.",
        accountsInstructions: "با یک حساب دیگر وارد شوید.",
        addAccount: "افزودن حساب",
        addPasskey: "افزودن کلید عبور",
        alreadyHaveAnAccount: "از قبل حساب دارید؟",
        avatar: "آواتار",
        avatarDescription:
          "برای آپلود یک آواتار سفارشی از فایل‌های خود کلیک کنید.",
        avatarInstructions: "داشتن آواتار اختیاری اما بسیار توصیه می‌شود.",
        backupCodes: "کدهای پشتیبان",
        backupCodesDescription:
          "این کدهای پشتیبان را در جای امنی ذخیره کنید. در صورت از دست دادن روش احراز هویت دو مرحله‌ای، می‌توانید با این کدها وارد حساب شوید.",
        backupCodePlaceholder:
          "یکی از کدهای پشتیبان خود را وارد کنید. هر کد فقط یک‌بار قابل استفاده است و پس از آن غیر فعال می‌شود.",
        backupCode: "کد پشتیبان",
        backupCodeAction: "بازیابی حساب",
        cancel: "لغو",
        changePassword: "تغییر رمز عبور",
        changePasswordDescription:
          "رمز عبور فعلی و رمز عبور جدید را وارد کنید.",
        changePasswordInstructions: "حداقل از ۸ کاراکتر استفاده کنید.",
        changePasswordSuccess: "رمز عبور شما با موفقیت تغییر کرد.",
        confirmPassword: "تایید رمز عبور",
        confirmPasswordPlaceholder: "تایید رمز عبور",
        copiedToClipboard: "در کلیپ‌بورد کپی شد",
        copyAllCodes: "کپی همه کدها",
        continue: "ادامه",
        currentPassword: "رمز عبور فعلی",
        currentPasswordPlaceholder: "رمز عبور فعلی",
        currentSession: "جلسه فعلی",
        delete: "حذف",
        deleteAccount: "حذف حساب",
        deleteAccountDescription:
          "حذف دائمی حساب شما و تمام اطلاعات آن. این عمل قابل برگشت نیست، با احتیاط ادامه دهید.",
        deleteAccountInstructions:
          "لطفاً حذف حساب خود را تایید کنید. این عمل غیرقابل برگشت است.",
        deleteAccountEmail:
          "لطفاً ایمیل خود را بررسی کنید تا حذف حساب تایید شود.",
        deleteAccountSuccess: "حساب شما با موفقیت حذف شد.",
        deleteAccountNotFresh: "برای حذف حساب، باید به‌تازگی وارد شده باشید.",
        disable: "غیرفعال کردن",
        disabledCredentialsDescription:
          "ارائه‌دهنده‌ای را برای ورود به حساب خود انتخاب کنید",
        dontHaveAnAccount: "حساب ندارید؟",
        email: "ایمیل",
        emailDescription:
          "آدرس ایمیلی را که می‌خواهید برای ورود استفاده کنید وارد کنید.",
        emailInstructions: "لطفاً از یک آدرس ایمیل معتبر استفاده کنید.",
        emailPlaceholder: "m@example.com",
        emailVerifyChange: "لطفاً ایمیل خود را برای تایید تغییر بررسی کنید.",
        emailVerification: "لطفاً ایمیل خود را برای لینک تایید بررسی کنید.",
        enable: "فعال‌سازی",
        failedToValidate: "تأیید ناموفق بود",
        forgotPassword: "رمز عبور را فراموش کرده‌اید؟",
        forgotPasswordAction: "ارسال لینک بازیابی",
        forgotPasswordDescription:
          "برای بازنشانی رمز عبور، ایمیل خود را وارد کنید",
        forgotPasswordEmail: "ایمیل خود را برای لینک بازنشانی بررسی کنید.",
        forgotPasswordLink: "رمز عبور خود را فراموش کرده‌اید؟",
        link: "لینک",
        magicLink: "لینک جادویی",
        magicLinkAction: "ارسال لینک جادویی",
        magicLinkDescription:
          "ایمیل خود را وارد کنید تا لینک جادویی دریافت کنید",
        magicLinkEmail: "ایمیل خود را برای لینک جادویی بررسی کنید",
        name: "نام",
        nameDescription: "نام کامل یا نام نمایشی خود را وارد کنید.",
        nameInstructions: "حداکثر از ۳۲ کاراکتر استفاده کنید.",
        namePlaceholder: "نام",
        newPassword: "رمز عبور جدید",
        newPasswordPlaceholder: "رمز عبور جدید",
        oneTimePassword: "رمز عبور یکبار مصرف",
        orContinueWith: "یا ادامه با",
        passkey: "کلید عبور",
        passkeys: "کلیدهای عبور",
        passkeysDescription: "کلیدهای عبور خود را برای دسترسی امن مدیریت کنید.",
        passkeysInstructions:
          "بدون رمز عبور به‌طور ایمن به حساب خود دسترسی پیدا کنید.",
        password: "رمز عبور",
        passwordDescription: "رمز عبور فعلی خود را وارد کنید.",
        passwordInstructions: "حداقل از ۸ کاراکتر استفاده کنید.",
        passwordPlaceholder: "رمز عبور",
        passwordsDoNotMatch: "رمزهای عبور مطابقت ندارند.",
        providers: "ارائه‌دهندگان",
        providersDescription: "حساب خود را به یک سرویس شخص ثالث متصل کنید.",
        recover: "بازیابی حساب",
        recoverAction: "بازیابی حساب",
        recoverDescription: "برای دسترسی به حساب خود، یک کد پشتیبان وارد کنید",
        rememberMe: "مرا به خاطر بسپار",
        resendVerificationEmail: "ارسال دوباره ایمیل تایید",
        resetPassword: "بازنشانی رمز عبور",
        resetPasswordAction: "ذخیره رمز عبور جدید",
        resetPasswordDescription: "رمز عبور جدید خود را در زیر وارد کنید",
        resetPasswordInvalidToken: "لینک بازنشانی رمز عبور نامعتبر است",
        resetPasswordSuccess: "رمز عبور با موفقیت بازنشانی شد",
        requestFailed: "درخواست ناموفق بود",
        revoke: "لغو دسترسی",
        signIn: "ورود",
        signInAction: "ورود",
        signInDescription: "ایمیل خود را برای ورود به حساب وارد کنید",
        signInUsernameDescription: "نام کاربری خود را برای ورود وارد کنید",
        signInWith: "ورود با",
        signOut: "خروج",
        signUp: "ثبت‌نام",
        signUpAction: "ایجاد حساب",
        signUpDescription: "برای ایجاد حساب، اطلاعات خود را وارد کنید",
        signUpEmail: "برای لینک تایید، ایمیل خود را بررسی کنید.",
        sessions: "جلسات",
        sessionsDescription:
          "جلسات فعال خود را مدیریت کرده و دسترسی را لغو کنید.",
        setPassword: "تنظیم رمز عبور",
        setPasswordDescription:
          "شما با یک سرویس شخص ثالث ثبت‌نام کرده‌اید. برای تنظیم رمز عبور، روی دکمه زیر کلیک کنید.",
        setPasswordEmailSent: "برای تنظیم رمز عبور، ایمیل خود را بررسی کنید.",
        settings: "تنظیمات",
        save: "ذخیره",
        security: "امنیت",
        switchAccount: "تغییر حساب",
        trustDevice: "اعتماد به این دستگاه",
        twoFactor: "احراز هویت دو مرحله‌ای",
        twoFactorAction: "تایید کد",
        twoFactorDescription:
          "لطفاً رمز یکبار مصرف خود را وارد کنید تا ادامه دهید",
        twoFactorCardDescription:
          "لایه‌ای اضافی از امنیت به حساب خود اضافه کنید.",
        twoFactorDisableInstructions:
          "برای غیرفعال کردن ۲FA رمز عبور خود را وارد کنید.",
        twoFactorEnableInstructions:
          "برای فعال‌سازی ۲FA رمز عبور خود را وارد کنید.",
        twoFactorEnabled: "احراز هویت دو مرحله‌ای فعال شد",
        twoFactorDisabled: "احراز هویت دو مرحله‌ای غیرفعال شد",
        twoFactorPrompt: "احراز هویت دو مرحله‌ای",
        twoFactorTotpLabel: "کد QR را با اپلیکیشن احراز هویت خود اسکن کنید",
        continueWithAuthenticator: "ادامه با اپلیکیشن احراز هویت",
        sendVerificationCode: "ارسال کد تایید",
        unlink: "لغو پیوند",
        forgotAuthenticator: "احراز هویت را فراموش کرده‌اید؟",
        username: "نام کاربری",
        usernameDescription: "نام کاربری مورد نظر برای ورود را وارد کنید.",
        usernameInstructions: "حداکثر از ۳۲ کاراکتر استفاده کنید.",
        usernamePlaceholder: "نام کاربری",
        usernameSignInPlaceholder: "نام کاربری یا ایمیل",
        verifyYourEmail: "ایمیل خود را تایید کنید",
        verifyYourEmailDescription:
          "لطفاً ایمیل خود را تایید کنید. ایمیل حاوی لینک تایید را بررسی کنید. اگر ایمیلی دریافت نکردید، روی دکمه زیر کلیک کنید.",
        resendCode: "ارسال دوباره کد",
        goBack: "برگرد",
      }}
    >
      {children}
    </AuthUIProvider>
  );
}
