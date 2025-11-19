import {
  itemCard,
  itemHeader,
  itemLeft,
  itemTitle,
  itemDescription,
  itemMeta,
  itemPriceWrapper,
  itemPriceTag,
  itemPrice,
} from "./styles"
import type { MenuItem } from "@/app/menu/actions"

type Props = {
  item: MenuItem
}

export const MenuItemCard = ({ item }: Props) => {
  return (
    <article className={itemCard}>
      <div className={itemHeader}>
        <div className={itemLeft}>
          <h2 className={itemTitle}>{item.name}</h2>

          {item.description && <p className={itemDescription}>{item.description}</p>}

          {item.meta && <p className={itemMeta}>{item.meta}</p>}
        </div>

        <div className={itemPriceWrapper}>
          <span className={itemPriceTag}>cena</span>
          <span className={itemPrice}>{item.price}</span>
        </div>
      </div>
    </article>
  )
}
