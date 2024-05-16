"use client";

import React, { useContext, useState } from "react";
import { DropdownComponent, DarkModeSwitch } from "@/components";
import { useSession } from "next-auth/react";
import { AuthContext } from "@/context/auth";
import { UiContext } from "@/context/ui";
import { BagContext } from "@/context/order";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Badge,
  Image,
  Button,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { FaShoppingBag } from "react-icons/fa";

export const NavbarComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);
  const { numberOfProducts } = useContext(BagContext);
  const { toggleSideMenu } = useContext(UiContext);
  const { resolvedTheme } = useNextTheme();

  return (
    <>
      <Navbar
        onMenuOpenChange={setMobileMenuOpen}
        isBordered
        className="fixed"
        maxWidth="xl"
      >
        {user?.id_rol === 1 ? (
          <NavbarContent>
            <button onClick={toggleSideMenu} className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <NavbarMenuToggle
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />

            <NavbarBrand>
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/images/logo-white.png"
                    : "/images/logo.png"
                }
                alt="Harvest Reborn"
                width={50}
                height={50}
              />
            </NavbarBrand>
          </NavbarContent>
        ) : (
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Image
                src="/images/logo.png"
                alt="Harvest Reborn"
                width={50}
                height={50}
              />
            </NavbarBrand>
          </NavbarContent>
        )}

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {session && user?.id_rol !== 4 ? (
            <>
              <NavbarItem>
                <Link color="foreground" href={"/home"}>
                  Inicio
                </Link>
              </NavbarItem>
              {user?.id_rol === 2 ? (
                <>
                  <NavbarItem>
                    <Link color="foreground" href={"/inventory"}>
                      Inventario
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link color="foreground" href={"/orders"}>
                      Pedidos
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link color="foreground" href={"/chats"}>
                      Chats
                    </Link>
                  </NavbarItem>
                </>
              ) : (
                user?.id_rol === 3 && (
                  <>
                    <NavbarItem>
                      <Link color="foreground" href={"/stores"}>
                        Recauderías
                      </Link>
                    </NavbarItem>
                    <NavbarItem>
                      <Link color="foreground" href={"/market"}>
                        Publicaciones
                      </Link>
                    </NavbarItem>
                    <NavbarItem>
                      <Link color="foreground" href={"/chats"}>
                        Chats
                      </Link>
                    </NavbarItem>
                  </>
                )
              )}
            </>
          ) : (
            <>
              <NavbarItem>
                <Link color="foreground" href="/#">
                  Inicio
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/#servicios">
                  Cómo funciona
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/#aboutUs">
                  Nosotros
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href={"/stores"}>
                  Recauderías
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href={"/market"}>
                  Publicaciones
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {!session || user?.id_rol === 3 ? (
            <NavbarItem>
              <Link
                className="flex items-center"
                color="foreground"
                href={"/bag"}
              >
                <Button variant="light" isIconOnly>
                  <Badge
                    color="danger"
                    content={numberOfProducts}
                    isInvisible={!numberOfProducts}
                    shape="circle"
                  >
                    <FaShoppingBag size={20} />
                  </Badge>
                </Button>
              </Link>
            </NavbarItem>
          ) : null}
          <DarkModeSwitch />
          <NavbarItem>
            <DropdownComponent />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {session ? (
            <>
              <NavbarMenuItem>
                <Link color="foreground" href={"/home"}>
                  Inicio
                </Link>
              </NavbarMenuItem>
              {user?.id_rol === 2 ? (
                <>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/inventory"}>
                      Inventario
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/orders"}>
                      Pedidos
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/chats"}>
                      Chats
                    </Link>
                  </NavbarMenuItem>
                </>
              ) : user?.id_rol === 3 ? (
                <>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/stores"}>
                      Recauderías
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/market"}>
                      Publicaciones
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/chats"}>
                      Chats
                    </Link>
                  </NavbarMenuItem>
                </>
              ) : (
                <>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/admin/dashboard"}>
                      Dashboard
                    </Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link color="foreground" href={"/admin/tickets"}>
                      Tickets
                    </Link>
                  </NavbarMenuItem>
                </>
              )}
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/logout"}>
                  Cerrar sesión
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link color="foreground" href={"/#"}>
                  Inicio
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href="/#servicios">
                  Cómo funciona
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href="/#aboutUs">
                  Nosotros
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/stores"}>
                  Recauderías
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/market"}>
                  Publicaciones
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <hr />
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/login"}>
                  Iniciar sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href={"/auth/register"}>
                  Regístrate
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </>
  );
};
