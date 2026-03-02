"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-serif font-semibold mb-4">Error inesperado</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Ocurrió un problema al cargar esta sección. Puedes intentar nuevamente o volver al inicio.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-[#6e20d3] text-white rounded-full text-sm font-medium hover:bg-[#5a1ab0] transition-colors"
        >
          Reintentar
        </button>
        <a
          href="/"
          className="px-5 py-2.5 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  )
}
