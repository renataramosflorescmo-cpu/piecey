import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="text-center">
          <p className="text-7xl font-bold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Página não encontrada
          </h1>
          <p className="mt-3 text-zinc-500">
            A página que você procura não existe ou foi movida.
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button>
              <ArrowLeft className="h-4 w-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
