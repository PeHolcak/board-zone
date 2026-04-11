"use client";

import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { Toaster } from "sonner";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
            <SessionProvider>
                <Toaster closeButton position="top-center" />
                {children}
            </SessionProvider>
        </>
    );
};
