import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-5xl font-serif font-bold mb-4">404</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#6e20d3] text-white rounded-full text-sm font-medium hover:bg-[#5a1ab0] transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
