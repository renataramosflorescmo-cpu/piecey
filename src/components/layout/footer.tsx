import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              PIECEY
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Soluções profissionais para o seu negócio.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Navegação
            </p>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Contato
            </p>
            <div className="mt-3 space-y-2 text-sm text-zinc-500">
              <p>contato@piecey.com</p>
              <p>(11) 99999-9999</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-400 dark:border-zinc-800">
          &copy; {year} PIECEY. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
