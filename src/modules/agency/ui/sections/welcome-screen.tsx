"use client";;
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { organizationInsertSchema } from "@/server/db/schema";
import { useTRPC } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const WelcomeScreen = () => {
  const api = useTRPC();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: data
  } = useSuspenseQuery(api.agency.isFirstLogin.queryOptions());

  const create = useMutation(api.agency.create.mutationOptions({
    onSuccess: () => {
      router.push(searchParams.get("redirect-to") ?? "/dashboard");
    },
    onError: (error) => {
      toast.error(error.data?.code, { description: error.message });
    },
  }));

  const form = useForm({
    resolver: zodResolver(organizationInsertSchema),
    defaultValues: {
      phonenumber: "",
      logo: "",
      address: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof organizationInsertSchema>) {
    create.mutate(values);
  }

  if (data?.orgId) router.push(searchParams.get("redirect-to") ?? "/dashboard");

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-slate-50"
      dir="rtl"
    >
      <div className="flex h-[90vh] w-full max-w-6xl flex-row-reverse overflow-hidden rounded-3xl border bg-white shadow-2xl">
        {/* 🖼 Image Section */}
        <div className="animate-fade-in flex w-1/2 items-center justify-center bg-indigo-100 p-6">
          <img
            src="/tour1.png" // Make sure this image is in your public folder if using Next.js/Vite
            alt="Real Estate Process"
            className="max-h-full w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* 📝 Form Section */}
        <div className="flex w-1/2 flex-col justify-center p-10">
          <h2 className="mb-8 text-center text-3xl font-bold text-indigo-700">
            ایجاد بنگاه جدید
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                {...form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام بنگاه</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                {...form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                {...form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره تلفن</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full rounded-lg bg-indigo-700 py-3 text-white transition hover:bg-indigo-800"
                disabled={create.isPending}
              >
                ثبت بنگاه
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
