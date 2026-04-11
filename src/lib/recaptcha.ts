/**
 * Server-side reCAPTCHA v3 token verification.
 *
 * Calls the Google reCAPTCHA siteverify API and checks the score.
 * Minimum accepted score is 0.5 (range 0.0 – 1.0, where 1.0 = very likely human).
 */

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? ""
const MIN_SCORE = 0.5

type RecaptchaResponse = {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  "error-codes"?: string[]
}

export async function verifyRecaptcha(token: string): Promise<void> {
  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error("Na serveru chybí RECAPTCHA_SECRET_KEY.")
  }

  if (!token) {
    console.error("reCAPTCHA: prázdný token z klienta")
    throw new Error("Ověření reCAPTCHA selhalo – token nebyl vygenerován.")
  }

  console.log("reCAPTCHA: verifying token (first 20 chars):", token.substring(0, 20) + "...")
  console.log("reCAPTCHA: secret key starts with:", RECAPTCHA_SECRET_KEY.substring(0, 10) + "...")

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  })

  const data: RecaptchaResponse = await response.json()

  console.log("reCAPTCHA: full response:", JSON.stringify(data, null, 2))

  if (!data.success) {
    console.error("reCAPTCHA verification failed:", data["error-codes"])
    throw new Error("Ověření reCAPTCHA selhalo. Zkuste to prosím znovu.")
  }

  if (data.score !== undefined && data.score < MIN_SCORE) {
    console.warn(`reCAPTCHA low score: ${data.score}`)
    throw new Error("Požadavek byl vyhodnocen jako podezřelý. Zkuste to prosím znovu.")
  }

  console.log(`reCAPTCHA: OK (score: ${data.score}, action: ${data.action})`)
}
