import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CollapsibleItem from '../products/common/CollapsibleItem';
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const CategoryMenu = ({ categories, id }) => {
  if (!categories || !Array.isArray(categories)) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories
          .filter(cat => cat.parent === null) // Ana kategoriler
          .map(category => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>

              {category.children?.length > 0 && (
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    {category.children.map(child => (
                      <li key={child.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/products?category=${child.id}`}
                            className="block rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="font-medium">{child.name}</div>

                            {/* Eğer child'in de çocukları varsa */}
                            {child.children?.length > 0 && (
                              <ul className="ml-5 mt-1 space-y-1">
                                {child.children.map(grandchild => (
                                  <li key={grandchild.id}>
                                    <Link
                                      to={`/products?category=${grandchild.id}`}
                                      className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                      {grandchild.name}

                                      {/* Eğer grandchild'in da çocukları varsa */}
                                      {grandchild.children?.length > 0 && (
                                        <ul className="ml-5 mt-1 space-y-1">
                                          {grandchild.children.map(grandchild2 => (
                                            <li key={grandchild2.id}>
                                              <Link
                                                to={`/products?category=${grandchild2.id}`}
                                                className="text-sm text-muted-foreground hover:text-primary"
                                              >
                                                {grandchild2.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CategoryMenu;