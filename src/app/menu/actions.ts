"use server"

export type Category = "napoje" | "jidlo" | "snacky"

export type MenuItem = {
  id: number
  name: string
  description?: string
  meta?: string
  price: string
}

export type CategoryDef = { id: Category; label: string }

const CATEGORIES: CategoryDef[] = [
  { id: "napoje", label: "Nápoje" },
  { id: "jidlo", label: "Jídlo" },
  { id: "snacky", label: "Snacky" },
]

const MENU: Record<Category, MenuItem[]> = {
  napoje: [
    {
      id: 1,
      name: "IPA 12°",
      description: "Lokální řemeslné pivo s citrusovým aroma.",
      meta: "0,5 l",
      price: "69 Kč",
    },
    {
      id: 2,
      name: "Cola",
      description: "Klasická limonáda, led + citron.",
      meta: "0,33 l",
      price: "39 Kč",
    },
    {
      id: 3,
      name: "Tmavý stout",
      description: "Pražené tóny, jemná pěna a kakaový dozvuk.",
      meta: "0,5 l",
      price: "75 Kč",
    },
    {
      id: 4,
      name: "Zázvorová limonáda",
      description: "Domácí, jemně perlivá, ideální nealko volba.",
      meta: "0,4 l",
      price: "55 Kč",
    },
    {
      id: 11,
      name: "Nealko pivo",
      description: "Pro řidiče i taktikou partii.",
      meta: "0,5 l",
      price: "49 Kč",
    },
    {
      id: 12,
      name: "Espresso",
      description: "Doppio, aby se ti nezavíraly oči u kampaně.",
      meta: "0,08 l",
      price: "45 Kč",
    },
  ],
  jidlo: [
    {
      id: 5,
      name: "Nachos s cheddarem",
      description: "Křupavé nachos, rozpuštěný sýr, salsa.",
      price: "89 Kč",
    },
    {
      id: 6,
      name: "Quesadilla",
      description: "Pšeničná tortilla, kuřecí maso, cheddar, salsa.",
      price: "139 Kč",
    },
    {
      id: 7,
      name: "Burger BoardZone",
      description: "Hovězí patty, chedar, okurky, domácí omáčka.",
      price: "189 Kč",
    },
    {
      id: 13,
      name: "Grilovaný hermelín",
      description: "Bylinkový olej, pečivo.",
      price: "129 Kč",
    },
  ],
  snacky: [
    {
      id: 8,
      name: "Arašídy ve slupce",
      description: "Ideální k pivu i partii.",
      price: "39 Kč",
    },
    {
      id: 9,
      name: "Tyčinky / preclíky",
      description: "Sdílecí miska na stůl.",
      price: "35 Kč",
    },
    {
      id: 10,
      name: "Olivy a sýr",
      description: "Malý snack pro fajnšmekry.",
      price: "69 Kč",
    },
  ],
}

export async function getMenuData() {
  return {
    categories: CATEGORIES,
    menu: MENU,
  }
}
