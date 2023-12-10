import { MenuI } from "@/types/global";

export const filterNestedMenuByTitle = (menu: MenuI[], search: string): MenuI[] => {
  const filteredMenu: MenuI[] = [];
  menu.forEach((item) => {
    const hasTitle = item.title.toLowerCase().includes(search.toLowerCase());
    if (hasTitle) filteredMenu.push(item);

    if (item.menu && item.menu.length > 0) {
      item.active = true;
      const filteredSubMenu = filterNestedMenuByTitle(item.menu, search);

      if (filteredSubMenu.length > 0) {
        const newItem = { ...item, menu: filteredSubMenu };
        filteredMenu.push(newItem);
      }
    }
  });

  return filteredMenu;
};