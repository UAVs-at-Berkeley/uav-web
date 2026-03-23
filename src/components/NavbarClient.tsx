import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface NavbarClientProps {
  currentPath: string
}

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/sponsors", label: "Sponsors" },
]

const joinLink = { href: "/join", label: "Join" }
const aboutLink = { href: "/contact", label: "Contact" }

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`)
}

export default function NavbarClient({ currentPath }: NavbarClientProps) {
  const aboutActive = isActive(currentPath, aboutLink.href)
  const joinActive = isActive(currentPath, joinLink.href)
  const isHomePage = currentPath === "/"
  const [isScrolled, setIsScrolled] = useState(!isHomePage)

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true)
      return
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [isHomePage])

  const overlayMode = isHomePage && !isScrolled

  const navLinkClass = (active: boolean) =>
    cn(
      "px-3 py-2 text-sm transition-colors",
      overlayMode && "text-white hover:bg-white/15",
      !overlayMode && "hover:bg-muted",
      active && overlayMode && "bg-white/20 font-medium text-white",
      active && !overlayMode && "bg-muted font-medium"
    )

  return (
    <header
      id="site-navbar"
      className={cn(
        "top-0 z-20 w-full border-b transition-colors duration-300",
        isHomePage ? "fixed" : "sticky",
        overlayMode
          ? "border-transparent bg-transparent"
          : "border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a
          href="/"
          className={cn(
            "text-sm font-semibold tracking-tight transition-colors",
            overlayMode ? "text-white" : "text-foreground"
          )}
        >
          UAVs at Berkeley
        </a>

        <NavigationMenu align="end">
          <NavigationMenuList className="gap-1">
            {mainLinks.map((link) => {
              const active = isActive(currentPath, link.href)

              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={navLinkClass(active)}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}

            <NavigationMenuItem>
              <NavigationMenuLink
                href={aboutLink.href}
                aria-current={aboutActive ? "page" : undefined}
                className={navLinkClass(aboutActive)}
              >
                {aboutLink.label}
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href={joinLink.href}
                aria-current={joinActive ? "page" : undefined}
                className={navLinkClass(joinActive)}
              >
                {joinLink.label}
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}
