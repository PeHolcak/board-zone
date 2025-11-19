"use client";

import type { Category, CategoryDef } from "../../../actions";
import { pillNav, pillButton, pillButtonActive } from "./styles";

type Props = {
    categories: CategoryDef[];
    activeCategory: Category;
    onChange: (category: Category) => void;
};

export const CategoryPills = ({ categories, activeCategory, onChange }: Props) => {
    return (
        <nav className={pillNav} aria-label="Kategorie menu">
            {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        type="button"
                        className={isActive ? pillButtonActive : pillButton}
                        onClick={() => onChange(cat.id)}
                    >
                        {cat.label}
                    </button>
                );
            })}
        </nav>
    );
};
