"use client"

import { useMemo } from "react"
import { useDashboard, DashboardGate } from "@/components/DashboardProvider"
import { PageHeader } from "@/components/PageHeader"
import { BoletinCard } from "@/components/BoletinCard"
import { InsightCard } from "@/components/InsightCard"
import { mapStageNumeric, categorizeCommission, SUCCESS_PATTERN } from "@/lib/legislative"
import { getCoauthorsForBoletines, buildDipMap, getPartyForDeputy } from "@/lib/queries"
import { normalizeParty } from "@/lib/parties"
import { motion } from "framer-motion"
import type { MocionEnriquecida } from "@/lib/types"

/**
 * IDs de las mociones destacadas seleccionadas editorialmente.
 */
const FEATURED_IDS = [
  "4109-07", "4442-07", "4549-07", "6233-07", "6909-07",
  "7699-07", "9693-07", "9847-07", "10149-07", "10317-07",
  "2997-16", "7234-07", "10073-07", "10110-07", "10336-07",
  "10431-07", "10815-07",
]

function DestacadosContent() {
  const { data, coautores, diputados } = useDashboard()

  const dipMap = useMemo(() => buildDipMap(diputados), [diputados])

  const featured = useMemo(() => {
    if (!data) return []

    const byId = FEATURED_IDS
      .map(id => data.jakMociones.find(m => m.n_boletin === id))
      .filter((m): m is MocionEnriquecida => m !== undefined)

    if (byId.length < FEATURED_IDS.length) {
      const usedIds = new Set(byId.map(m => m.n_boletin))
      const extras = data.jakMociones
        .filter(m => !usedIds.has(m.n_boletin))
        .sort((a, b) => {
          const aLey = SUCCESS_PATTERN.test(a.estado_del_proyecto_de_ley) ? 10 : 0
          const bLey = SUCCESS_PATTERN.test(b.estado_del_proyecto_de_ley) ? 10 : 0
          const aRes = a.resumen_ejecutivo ? 5 : 0
          const bRes = b.resumen_ejecutivo ? 5 : 0
          const aDate = a.fecha_de_ingreso ? new Date(a.fecha_de_ingreso).getTime() : 0
          const bDate = b.fecha_de_ingreso ? new Date(b.fecha_de_ingreso).getTime() : 0
          return (bLey + bRes) - (aLey + aRes) || bDate - aDate
        })
        .slice(0, FEATURED_IDS.length - byId.length)
      return [...byId, ...extras]
    }

    return byId
  }, [data])

  // Hallazgo: proyecto más transversal (más coautores y partidos distintos)
  const mostTransversal = useMemo(() => {
    if (!data || featured.length === 0) return null

    const results = featured.map(m => {
      const mCoauthors = getCoauthorsForBoletines(coautores, [m.n_boletin], data.foundName)
      const parties = new Set(
        mCoauthors.map(c => normalizeParty(getPartyForDeputy(dipMap, c, m.periodo) || null))
      )
      return { mocion: m, coauthorCount: mCoauthors.length, partyCount: parties.size }
    })

    return results.sort((a, b) => b.partyCount - a.partyCount || b.coauthorCount - a.coauthorCount)[0] || null
  }, [data, featured, coautores, dipMap])

  if (!data) return null

  const leyesCount = featured.filter(m => SUCCESS_PATTERN.test(m.estado_del_proyecto_de_ley || "")).length
  const avgProgress = featured.length > 0
    ? featured.reduce((sum, m) => sum + mapStageNumeric(m.etapa_del_proyecto, m.estado_del_proyecto_de_ley), 0) / featured.length
    : 0

  return (
    <>
      <PageHeader
        title="Mociones Destacadas"
        subtitle="Proyectos de ley seleccionados por su relevancia legislativa e impacto público."
      />

      {/* KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Selección</p>
          <p className="font-serif text-2xl font-bold">{featured.length}</p>
          <p className="text-white/40 text-xs">mociones</p>
        </div>
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Convertidas en Ley</p>
          <p className="font-serif text-2xl font-bold text-[#5bc2ba]">{leyesCount}</p>
          <p className="text-white/40 text-xs">de {featured.length}</p>
        </div>
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Progreso Promedio</p>
          <p className="font-serif text-2xl font-bold">{Math.round((avgProgress / 4) * 100)}%</p>
          <p className="text-white/40 text-xs">escala 0-4</p>
        </div>
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Temáticas</p>
          <p className="font-serif text-2xl font-bold">
            {new Set(featured.map(m => categorizeCommission(m.comision_inicial))).size}
          </p>
          <p className="text-white/40 text-xs">áreas distintas</p>
        </div>
      </motion.div>

      {/* Hallazgo: Proyecto más transversal */}
      {mostTransversal && (
        <div className="mb-8">
          <InsightCard
            variant="discovery"
            title="Proyecto Más Transversal"
            description={`"${(mostTransversal.mocion.nombre_iniciativa || "").slice(0, 100)}" (Boletín ${mostTransversal.mocion.n_boletin}) contó con ${mostTransversal.coauthorCount} coautores de ${mostTransversal.partyCount} partidos distintos, reflejando el mayor consenso multipartidario entre las mociones destacadas.`}
          />
        </div>
      )}

      {/* Tarjetas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {featured.map((mocion, i) => {
          const mocionCoauthors = getCoauthorsForBoletines(coautores, [mocion.n_boletin], data.foundName)
          return (
            <BoletinCard
              key={mocion.n_boletin}
              mocion={mocion}
              coauthors={mocionCoauthors}
              dipMap={dipMap}
              index={i}
              showResumenIA
            />
          )
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-white/25 text-xs mt-10 italic"
      >
        Selección editorial. Las mociones pueden ser modificadas por el equipo de investigación.
      </motion.p>
    </>
  )
}

export default function DestacadosPage() {
  return (
    <DashboardGate>
      <DestacadosContent />
    </DashboardGate>
  )
}
