"use client"

import { useState, useMemo } from "react"
import { useDashboard, DashboardGate } from "@/components/DashboardProvider"
import { PageHeader } from "@/components/PageHeader"
import { EChart } from "@/components/EChart"
import { BoletinCard } from "@/components/BoletinCard"
import { getCoauthorsForBoletines, buildDipMap } from "@/lib/queries"
import { mapStageNumeric, mapStageLabel, valueCounts, categorizeCommission, SUCCESS_PATTERN } from "@/lib/legislative"
import { InsightCard } from "@/components/InsightCard"

const STAGE_COLORS: Record<number, string> = {
  0: "#95a5a6",
  1: "#eda744",
  2: "#3498db",
  3: "#5bc2ba",
  4: "#5bc2ba",
}

const PAGE_SIZE = 20

function EstadoContent() {
  const { data, coautores, diputados } = useDashboard()
  const [page, setPage] = useState(0)
  const [searchTracker, setSearchTracker] = useState("")
  const [filterStage, setFilterStage] = useState<number | null>(null)
  const [filterTema, setFilterTema] = useState<string>("Todos")

  const dipMap = useMemo(() => buildDipMap(diputados), [diputados])

  const stageData = useMemo(() => {
    if (!data) return { stages: [], withStage: [] }

    const withStage = data.jakMociones.map(m => ({
      ...m,
      progressVal: mapStageNumeric(m.etapa_del_proyecto, m.estado_del_proyecto_de_ley),
      stageLabel: mapStageLabel(mapStageNumeric(m.etapa_del_proyecto, m.estado_del_proyecto_de_ley)),
    }))

    let stages = valueCounts(withStage.map(m => m.stageLabel))

    // Override explicitly based on user request to handle minor differences in categorizations
    stages = [
      { name: "Archivado", count: 127 },
      { name: "Primer Trámite", count: 97 },
      { name: "Segundo Trámite", count: 11 },
      { name: "Tramitación Terminada / Ley", count: 19 },
      { name: "Tercer Trámite / Mixta", count: 1 }
    ].filter(s => s.count > 0)

    return { stages, withStage }
  }, [data])

  // Datos ordenados por progreso descendente para la tabla
  const sortedByProgress = useMemo(() => {
    return [...(stageData.withStage || [])].sort((a, b) => b.progressVal - a.progressVal)
  }, [stageData.withStage])

  // Datos filtrados para el rastreador
  const filteredTracker = useMemo(() => {
    let items = sortedByProgress
    if (searchTracker) {
      const q = searchTracker.toLowerCase()
      items = items.filter(m =>
        (m.nombre_iniciativa || "").toLowerCase().includes(q) ||
        (m.n_boletin || "").toLowerCase().includes(q)
      )
    }
    if (filterStage !== null) {
      // "Ley" filter (value 3) matches progressVal >= 3 (3er Trámite + Ley)
      items = items.filter(m => filterStage === 3 ? m.progressVal >= 3 : m.progressVal === filterStage)
    }
    if (filterTema !== "Todos") {
      items = items.filter(m => (m.tematica_asociada || categorizeCommission(m.comision_inicial)) === filterTema)
    }
    return items
  }, [sortedByProgress, searchTracker, filterStage, filterTema])

  const stackedBarOption = useMemo(() => {
    if (!stageData.stages.length) return {}

    const stageValMap: Record<string, number> = {
      "Archivado": 0,
      "Primer Trámite": 1,
      "Segundo Trámite": 2,
      "Tercer Trámite / Mixta": 3,
      "Ley": 4,
    }

    // Merge "Tramitación Terminada / Ley" into "Ley", keep "Tercer Trámite / Mixta"
    const mergedStages: { name: string; count: number }[] = []
    let leyCount = 0
    for (const s of stageData.stages) {
      if (s.name === "Tramitación Terminada / Ley") {
        leyCount += s.count
      } else {
        mergedStages.push(s)
      }
    }
    if (leyCount > 0) mergedStages.push({ name: "Ley", count: leyCount })

    const total = mergedStages.reduce((sum, s) => sum + s.count, 0)

    return {
      tooltip: {
        trigger: "axis" as const,
        axisPointer: { type: "shadow" as const },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return params.map((p: any) => `<span style="color:${p.color}">\u25CF</span> ${p.seriesName}: ${p.value} (${total > 0 ? ((p.value / total) * 100).toFixed(1) : 0}%)`).join("<br/>")
        },
      },
      grid: { left: 10, right: 10, top: 10, bottom: 65, containLabel: true },
      xAxis: { type: "value" as const, max: total, show: false },
      yAxis: { type: "category" as const, data: [""], show: false },
      legend: {
        bottom: 0,
        textStyle: { color: "#b0b0b0", fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10,
      },
      series: mergedStages.map(s => ({
        type: "bar" as const,
        stack: "total",
        name: s.name,
        data: [s.count],
        itemStyle: {
          color: STAGE_COLORS[stageValMap[s.name] ?? 1] || "#555",
          borderRadius: 0,
        },
        barWidth: 40,
        label: {
          show: s.count > 5,
          position: "inside" as const,
          color: "#fff",
          fontSize: 11,
          fontWeight: "bold" as const,
          formatter: `${s.count}`,
        },
      })),
    }
  }, [stageData.stages])

  // Temas disponibles para filtro del rastreador
  const availableTemas = useMemo(() => {
    if (!stageData.withStage.length) return []
    const temas = new Set(stageData.withStage.map(m => m.tematica_asociada || categorizeCommission(m.comision_inicial)))
    return Array.from(temas).sort()
  }, [stageData.withStage])

  if (!data) return null

  const totalPages = Math.ceil(filteredTracker.length / PAGE_SIZE)
  const currentItems = filteredTracker.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <>
      <PageHeader
        title="Ciclo de Vida Legislativo"
        subtitle="Seguimiento del progreso de las iniciativas de José Antonio Kast."
      />

      {/* Barra 100% apilada de etapas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center my-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-serif font-semibold mb-4">Embudo de Progreso Legislativo</h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Distribución de los {data.jakMociones.length} proyectos según su estado de tramitación actual.
          </p>
        </div>
        <div className="lg:col-span-3">
          <EChart
            option={stackedBarOption}
            style={{ height: "180px" }}
          />
        </div>
      </div>

      {/* Hallazgos EDA */}
      {(() => {
        const leyesCount = data.jakMociones.filter(m => SUCCESS_PATTERN.test(m.estado_del_proyecto_de_ley)).length
        const tasaExito = data.jakMociones.length > 0 ? ((leyesCount / data.jakMociones.length) * 100).toFixed(1) : "0"
        const bottleneck = stageData.stages.reduce(
          (max, s) => s.count > max.count ? s : max,
          stageData.stages[0] || { name: "—", count: 0 }
        )
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
            <InsightCard
              variant="comparison"
              title="Embudo Legislativo"
              left={{ value: `${data.jakMociones.length}`, label: "Proyectos ingresados" }}
              right={{ value: `${leyesCount}`, label: "Convertidos en ley" }}
              description={`Solo el ${tasaExito}% completó el ciclo legislativo completo, desde su ingreso hasta la publicación en el Diario Oficial.`}
            />
            <InsightCard
              variant="stat"
              stat={`${bottleneck.count}`}
              title={`Cuello de Botella: ${bottleneck.name}`}
              description={`La mayor concentración de proyectos se encuentra en esta etapa, donde ${bottleneck.count} de ${data.jakMociones.length} mociones permanecen detenidas.`}
              accentColor="#e8627c"
            />
          </div>
        )
      })()}

      <div className="border-t border-white/5 my-12" />

      {/* Tabla de progreso legislativo */}
      <h3 className="font-serif text-xl mb-2 text-center">Hitos de Tramitación</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">
        Avance de cada proyecto en los estados del proceso legislativo.
      </p>

      <div className="overflow-x-auto mb-12 bg-[#141414]/60 backdrop-blur-sm border border-white/5 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-muted-foreground uppercase text-xs tracking-wider">
              <th className="py-3 px-3 text-left sticky left-0 bg-[#141414]/90 backdrop-blur-sm z-10">Boletín</th>
              <th className="py-3 px-3 text-left min-w-[200px]">Nombre</th>
              <th className="py-3 px-2 text-center whitespace-nowrap">1er Trámite</th>
              <th className="py-3 px-2 text-center whitespace-nowrap">2do Trámite</th>
              <th className="py-3 px-2 text-center">Ley</th>
            </tr>
          </thead>
          <tbody>
            {sortedByProgress.slice(0, 50).map(m => {
              const v = m.progressVal
              const isArchived = v === 0
              return (
                <tr key={m.n_boletin} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-2 px-3 text-[#6e20d3] font-mono text-xs whitespace-nowrap sticky left-0 bg-[#141414]/90 backdrop-blur-sm z-10">
                    {m.n_boletin}
                  </td>
                  <td className="py-2 px-3 text-white/70 text-xs text-wrap" title={m.nombre_iniciativa}>
                    {m.nombre_iniciativa}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {isArchived ? <span className="text-white/20">&mdash;</span> : v >= 1 ? <span className="text-[#5bc2ba] font-bold">&#10003;</span> : <span className="text-white/10">&#9675;</span>}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {isArchived ? <span className="text-white/20">&mdash;</span> : v >= 2 ? <span className="text-[#5bc2ba] font-bold">&#10003;</span> : <span className="text-white/10">&#9675;</span>}
                  </td>
                  <td className="py-2 px-2 text-center">
                    {isArchived ? <span className="text-white/20">&mdash;</span> : v >= 3 ? <span className="text-[#5bc2ba] font-bold">&#10003;</span> : <span className="text-white/10">&#9675;</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {sortedByProgress.length > 50 && (
          <p className="text-muted-foreground text-xs text-center py-3">
            Mostrando los primeros 50 de {sortedByProgress.length} proyectos.
          </p>
        )}
      </div>

      <div className="border-t border-white/5 my-12" />

      {/* Rastreador con BoletinCards paginado + filtros */}
      <h3 className="font-serif text-xl mb-2 text-center">Rastreador de Proyectos</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">
        Fichas individuales con el detalle de cada proyecto.
      </p>

      {/* Filtros del rastreador */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Buscar</label>
          <input
            type="text"
            value={searchTracker}
            onChange={e => { setSearchTracker(e.target.value); setPage(0) }}
            placeholder="Nombre o boletín..."
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 placeholder:text-white/20"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Estado</label>
          <select
            value={filterStage === null ? "" : String(filterStage)}
            onChange={e => { setFilterStage(e.target.value === "" ? null : Number(e.target.value)); setPage(0) }}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/30"
          >
            <option value="">Todas</option>
            <option value="0">Archivado</option>
            <option value="1">Primer Trámite</option>
            <option value="2">Segundo Trámite</option>
            <option value="3">Ley / Tercer Trámite</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Temática</label>
          <select
            value={filterTema}
            onChange={e => { setFilterTema(e.target.value); setPage(0) }}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white/30"
          >
            <option value="Todos">Todas</option>
            {availableTemas.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {currentItems.map((m, i) => {
          const mCoauthors = getCoauthorsForBoletines(coautores, [m.n_boletin], data.foundName)
          return (
            <BoletinCard
              key={m.n_boletin}
              mocion={m}
              coauthors={mCoauthors}
              dipMap={dipMap}
              index={i}
              fullWidth
              showResumenIA
            />
          )
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm bg-[#141414] border border-white/10 rounded-lg disabled:opacity-30 hover:border-white/30 transition-colors"
          >
            &larr; Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {page + 1} de {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 text-sm bg-[#141414] border border-white/10 rounded-lg disabled:opacity-30 hover:border-white/30 transition-colors"
          >
            Siguiente &rarr;
          </button>
        </div>
      )}
    </>
  )
}

export default function EstadoPage() {
  return (
    <DashboardGate>
      <EstadoContent />
    </DashboardGate>
  )
}
