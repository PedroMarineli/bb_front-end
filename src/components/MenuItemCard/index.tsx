import { memo } from "react";
import { IMenuItem } from "../../interface/IMenu";

const MenuItemCard = memo(({ item, quantidade, decrementQuantity, incrementQuantity }: {
    item: IMenuItem;
    quantidade: number;
    decrementQuantity: (id: number | undefined) => void;
    incrementQuantity: (id: number | undefined) => void;
  }) => {
    return (
        <li className='flex items-center gap-8' key={item.id}>
            <div className="flex gap-1 items-center">
                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => decrementQuantity(item.id)}>-</button>
                <span>{quantidade || 0}</span>
                <button className="p-1 w-9 h-9 border-solid border-2 rounded-full border-black" onClick={() => incrementQuantity(item.id)}>+</button>
            </div>
            <p>{item.name}: {item.description}</p>
        </li>
    )
})

export default MenuItemCard
