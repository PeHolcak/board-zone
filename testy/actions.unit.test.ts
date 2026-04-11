import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitReservation, cancelReservation } from "../src/app/reservation/actions";
import { getServerSession } from "next-auth";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { db } from "@/db/client";

// Mockování externích modulů
vi.mock("next-auth", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/lib/recaptcha", () => ({
  verifyRecaptcha: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

// Částečné mockování databáze pro jednotkové testy
vi.mock("@/db/client", () => ({
  db: {
    query: {
      users: { findFirst: vi.fn() },
      reservations: { findFirst: vi.fn() },
    },
    insert: vi.fn(() => ({
      values: vi.fn(),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(),
      })),
    })),
  },
}));

describe("Reservation Actions - Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Unit Test 1: submitReservation - nepřihlášený uživatel", () => {
    it("měl by vyhodit chybu, pokud není uživatel přihlášen", async () => {
      // Simulace: uživatel není přihlášen (session je null)
      vi.mocked(getServerSession).mockResolvedValue(null);

      // Očekáváme, že akce selže se specifickou hláškou
      await expect(
        submitReservation({
          tableId: "table-1",
          type: "table",
          seats: 4,
          reservationDateTime: new Date(),
          reservationDuration: 60,
          recaptchaToken: "fake-token",
        })
      ).rejects.toThrow("Pro rezervaci musíte být přihlášeni.");

      // Ověříme, že recaptcha ověření proběhlo ještě před auth kontrolou
      expect(verifyRecaptcha).toHaveBeenCalledWith("fake-token");
    });
  });

  describe("Unit Test 2: cancelReservation - neexistující rezervace", () => {
    it("měl by vyhodit chybu, pokud rezervace v DB neexistuje", async () => {
      // Simulace: přihlášený běžný uživatel
      vi.mocked(getServerSession).mockResolvedValue({
        user: { email: "test@example.com", name: "Test User" },
        expires: "9999",
      });

      // Simulace: návrat uživatele z DB mocku
      vi.mocked(db.query.users.findFirst).mockResolvedValue({
        id: 1,
        email: "test@example.com",
        role: "user",
      } as any);

      // Simulace: rezervace v DB nebyla nalezena (undefined)
      vi.mocked(db.query.reservations.findFirst).mockResolvedValue(undefined);

      // Očekáváme, že akce selže kvůli chybějící rezervaci
      await expect(cancelReservation(999)).rejects.toThrow("Rezervace nebyla nalezena.");
    });
  });
});
