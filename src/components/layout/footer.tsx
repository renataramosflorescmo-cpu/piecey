import Link from "next/link";
import { Instagram } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-bold">
              PIECE<span className="text-purple">Y</span>
            </p>
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
              <Instagram className="h-4 w-4" />
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
