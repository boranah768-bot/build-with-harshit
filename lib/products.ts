export type Product = {
  id: string;
  title: string;
  category: string;
  priceINR: number;
  priceUSD: number;
  instagramUrl: string;
  tutorialUrl: string | null;
  description: string;
  disclaimer: string;
};

export const products: Product[] = [
  {
    id: "arduino-unlock-pin",
    title: "Arduino Pro Micro — Unlock PIN",
    category: "Arduino",
    priceINR: 149,
    priceUSD: 3,
    instagramUrl: "https://www.instagram.com/reel/DarxMSguR0o/",
    tutorialUrl: "https://youtu.be/pbUMA9Z1l2k",
    description:
      "Arduino Pro Micro project source code with the related tutorial.",
    disclaimer:
      "For educational, authorized project and laboratory use only.",
  },

  {
    id: "esp32-unlock-pin",
    title: "ESP32 — Unlock PIN",
    category: "ESP32",
    priceINR: 149,
    priceUSD: 3,
    instagramUrl: "https://www.instagram.com/reel/Db0RPqBuKTK/",
    tutorialUrl: "https://youtu.be/pbUMA9Z1l2k",
    description:
      "ESP32 project source code with the related tutorial.",
    disclaimer:
      "For educational, authorized project and laboratory use only.",
  },

  {
    id: "esp32-unlimited-wifi",
    title: "ESP32 — Unlimited Wi-Fi",
    category: "ESP32",
    priceINR: 129,
    priceUSD: 3,
    instagramUrl: "https://www.instagram.com/reel/DcgTkAouMFa/",
    tutorialUrl: null,
    description:
      "ESP32 Wi-Fi project source code.",
    disclaimer:
      "For educational, authorized project and controlled laboratory use only.",
  },

  {
    id: "esp32-evil-twin",
    title: "ESP32 — Evil Twin",
    category: "Security Lab",
    priceINR: 99,
    priceUSD: 3,
    instagramUrl: "https://www.instagram.com/reel/DcqoaeNouQa/",
    tutorialUrl: null,
    description:
      "ESP32 security-lab project source code.",
    disclaimer:
      "For authorized security research and controlled laboratory environments only.",
  },

  {
    id: "esp32-wifi-scanner",
    title: "ESP32 — Wi-Fi Scanning",
    category: "Security Lab",
    priceINR: 49,
    priceUSD: 3,
    instagramUrl: "https://www.instagram.com/reel/DcyOiCwOfqQ/",
    tutorialUrl: "https://youtu.be/qgaK_53YjWU",
    description:
      "ESP32 Wi-Fi scanning project source code with tutorial.",
    disclaimer:
      "For educational and authorized security-research use only.",
  },
];

export function getProduct(
  id: string
): Product | undefined {
  return products.find((product) => product.id === id);
}