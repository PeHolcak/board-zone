import Link from "next/link"
import { socialWrapper, socialTitle, socialList, socialItem } from "./styles"

import { Lineicons } from "@lineiconshq/react-lineicons"
import { FacebookOutlined, InstagramOutlined, DiscordOutlined } from "@lineiconshq/free-icons"

const SOCIALS = [
  { name: "Instagram", icon: InstagramOutlined, href: "#" },
  { name: "Facebook", icon: FacebookOutlined, href: "#" },
  { name: "Discord", icon: DiscordOutlined, href: "#" },
]

export const SocialSection = () => {
  return (
    <div className={socialWrapper}>
      <h3 className={socialTitle}>Sledujte nás</h3>
      <ul className={socialList}>
        {SOCIALS.map(({ name, icon, href }) => (
          <li key={name} className={socialItem}>
            <Link href={href} aria-label={name}>
              <Lineicons
                icon={icon}
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
