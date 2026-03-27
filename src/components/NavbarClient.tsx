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
  baseUrl: string
}

const createNavLinks = (baseUrl: string) => [
  { href: `${baseUrl}`, label: "Home" },
  { href: `${baseUrl}projects`, label: "Projects" },
  { href: `${baseUrl}sponsors`, label: "Sponsors" },
  { href: `${baseUrl}docs`, label: "Docs" },
]

const createJoinLink = (baseUrl: string) => ({ href: `${baseUrl}join`, label: "Join" })
const createAboutLink = (baseUrl: string) => ({ href: `${baseUrl}contact`, label: "Contact" })

function normalizeUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function isActive(pathname: string, href: string, homeHref: string): boolean {
  const normPath = normalizeUrl(pathname)
  const normHref = normalizeUrl(href)
  const normHome = normalizeUrl(homeHref)

  // override home link to only be active on exact match
  if (normHref === normHome) {
    return normPath === normHome
  }

  return normPath === normHref || normPath.startsWith(`${normHref}/`)
}

export default function NavbarClient({ currentPath, baseUrl }: NavbarClientProps) {
  const mainLinks = createNavLinks(baseUrl)
  const homeLink = mainLinks[0]
  const joinLink = createJoinLink(baseUrl)
  const aboutLink = createAboutLink(baseUrl)
  const aboutActive = isActive(currentPath, aboutLink.href, homeLink.href)
  const joinActive = isActive(currentPath, joinLink.href, homeLink.href)
  const isHomePage = normalizeUrl(currentPath) === normalizeUrl(baseUrl)
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
          href={baseUrl}
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
              const active = isActive(currentPath, link.href, homeLink.href)

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
