
import { itemsList } from "./styles";
import type { MenuItem } from "../../../actions";
import { MenuItemCard } from "./MenuItemCard";

type Props = {
    items: MenuItem[];
};

export const MenuItemsList = ({ items }: Props) => {
    return (
        <div className={itemsList}>
            {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};
