/**
 * Client-side helper to execute reCAPTCHA v3 and get a token.
 * Uses the global `grecaptcha` object loaded via Script tag.
 */

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""

export function executeRecaptcha(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA skript není načten."))
      return
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(SITE_KEY, { action })
        resolve(token)
      } catch (err) {
        reject(err)
      }
    })
  })
}
