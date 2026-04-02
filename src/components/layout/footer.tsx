import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="PIECEY"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-2 text-sm text-white/60">
              Plataforma de Tecnologia e Marketing para profissionais da saúde.
            </p>
            <p className="mt-1 text-sm font-medium text-mint">
              Cada Peça no Lugar Certo.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-white">
              Navegação
            </p>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 transition-colors hover:text-mint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white">
              Contato
            </p>
            <div className="mt-3 space-y-2 text-sm text-white/50">
              <p>contato@piecey.com.br</p>
              <p>www.piecey.com.br</p>
            </div>
            <a
              href="https://instagram.com/pieceyoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-mint"
            >
              <InstagramIcon className="h-4 w-4" />
              @pieceyoficial
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/30">
          &copy; {year} PIECEY. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
