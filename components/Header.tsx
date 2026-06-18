import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const stickyClass = siteMetadata.stickyNav ? ' sticky top-0 z-50' : ''

  return (
    <header className={`w-full bg-[#1A4D3A]${stickyClass}`}>
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 xl:px-0">
        {/* Left: Logo */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center gap-2">
            <Logo />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <span className="hidden text-xl font-semibold text-white sm:block">
                {siteMetadata.headerTitle}
              </span>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>

        {/* Center: Nav links (truly centered via absolute) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-x-6 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="font-medium whitespace-nowrap text-white hover:text-[#8B2635]"
              >
                {link.title}
              </Link>
            ))}
        </nav>

        {/* Right: Search + Theme + Mobile */}
        <div className="flex items-center gap-x-4">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
