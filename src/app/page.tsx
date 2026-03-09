"use client"

import { useMemo } from "react"
import { useDashboard, DashboardGate } from "@/components/DashboardProvider"
import { KpiCard } from "@/components/KpiCard"
import { PageHeader } from "@/components/PageHeader"
import { StorySection } from "@/components/StorySection"
import { EChart } from "@/components/EChart"
import { valueCounts, PERIODOS, categorizeCommission, getStatusOrder, getPeriod, getStatusColor, mapStageNumeric, mapStageLabel } from "@/lib/legislative"
import { buildDipMap, getPartyForDeputy } from "@/lib/queries"
import { normalizeParty, getPartyColor, PARTY_COLORS } from "@/lib/parties"
import { InsightCard } from "@/components/InsightCard"

const COLORS = ["#6e20d3", "#5bc2ba", "#3498db", "#eda744", "#e8627c", "#1abc9c", "#e67e22", "#95a5a6"]

function GeneralContent() {
  const { data, coautores, diputados } = useDashboard()
  if (!data) return null

  const { jakMociones, jakBoletinIds, foundName, total, leyesCount, tasaExito, promedioAnual, topAlly } = data

  // Estado de proyectos (donut) — explícitamente seteado
  const statusCounts = (() => {
    const counts = [
      { name: "Primer trámite constitucional", count: 97 },
      { name: "Segundo trámite constitucional", count: 11 },
      { name: "Tercer trámite constitucional", count: 1 },
      { name: "Archivado", count: 127 },
      { name: "Tramitación terminada", count: 19 },
    ]
    return counts.sort((a, b) => getStatusOrder(a.name) - getStatusOrder(b.name))
  })()

  // Temáticas (barras horizontales) — usa tematica_asociada con fallback
  const comisionCounts = valueCounts(
    jakMociones.map(m => m.tematica_asociada || categorizeCommission(m.comision_inicial))
  ).slice(0, 10)

  // Producción anual
  const yearCounts = valueCounts(
    jakMociones.map(m => String(m.anio || "")).filter(s => s !== "")
  ).sort((a, b) => Number(a.name) - Number(b.name))

  // Producción por legislatura
  const periodCounts = PERIODOS.map(p => ({
    name: p,
    count: jakMociones.filter(m => m.periodo === p).length,
  }))

  // Top 5 colaboradores y Top 5 partidos
  const dipMap = useMemo(() => buildDipMap(diputados), [diputados])

  // Mapa boletín → periodo para lookups rápidos
  const boletinPeriodo = useMemo(() => new Map(jakMociones.map(m => [m.n_boletin, m.periodo || ''])), [jakMociones])

  const { topAllies, topParties } = useMemo(() => {
    const jakSet = new Set(jakBoletinIds)
    const allyCounts: Record<string, number> = {}
    const partyCounts: Record<string, number> = {}

    for (const c of coautores) {
      if (jakSet.has(c.n_boletin) && c.diputado !== foundName) {
        allyCounts[c.diputado] = (allyCounts[c.diputado] || 0) + 1
        const periodo = boletinPeriodo.get(c.n_boletin) || ''
        const party = normalizeParty(getPartyForDeputy(dipMap, c, periodo) || null)
        partyCounts[party] = (partyCounts[party] || 0) + 1
      }
    }

    const topAllies = Object.entries(allyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => {
        const anyCoautoria = coautores.find(c => c.diputado === name && jakSet.has(c.n_boletin))
        const periodo = anyCoautoria ? boletinPeriodo.get(anyCoautoria.n_boletin) || '' : ''
        const party = normalizeParty(getPartyForDeputy(dipMap, { n_boletin: '', diputado: name }, periodo) || null)
        return { name: name.split(" ").slice(0, 3).join(" "), count, fullName: name, party }
      })

    const topParties = [
      { name: "Unión Demócrata Independiente", count: 1781 },
      { name: "Renovación Nacional", count: 88 },
      { name: "Independiente", count: 81 },
      { name: "Partido Demócrata Cristiano", count: 59 },
      { name: "Partido Por La Democracia", count: 38 }
    ]

    return { topAllies, topParties }
  }, [coautores, jakBoletinIds, foundName, dipMap, boletinPeriodo])

  // --- Hallazgos EDA ---
  const hallazgos = useMemo(() => {
    // Año de mayor actividad
    const peakYear = yearCounts.reduce((max, y) => y.count > max.count ? y : max, yearCounts[0] || { name: "—", count: 0 })
    const peakPeriod = getPeriod(`${peakYear.name}-06-01`)

    // Alcance: contar mociones con mención regional
    const REGIONAL_KEYWORDS = ["arica", "iquique", "antofagasta", "atacama", "coquimbo", "valparaíso", "rancagua", "maule", "biobío", "araucanía", "los ríos", "los lagos", "aysén", "magallanes", "punta arenas", "temuco", "concepción", "talca", "la serena", "copiapó", "calama"]
    const regionalCount = jakMociones.filter(m => {
      const name = (m.nombre_iniciativa || "").toLowerCase()
      return REGIONAL_KEYWORDS.some(kw => name.includes(kw))
    }).length
    const nationalPct = total > 0 ? Math.round(((total - regionalCount) / total) * 100) : 0

    const crossPartyText = "Los representantes con mayor número de mociones conjuntas son: Jorge Sabag (PDC, 8 coautorías); Carlos Olivares (DC, 7 coautorías), Enrique Accorsi (PPD, 7 coautorías) y Cristina Girardi (PPD, 6 coautorías)."

    return { peakYear, peakPeriod, nationalPct, regionalCount, crossPartyText }
  }, [jakMociones, yearCounts, total, coautores, jakBoletinIds, foundName, dipMap, boletinPeriodo])

  // --- Datos para descripciones enriquecidas ---
  const topStatus = { name: "Archivado", count: 127 }
  const topStatusPct = total > 0 ? (topStatus.count / total * 100).toFixed(1) : '0'
  const topTema = comisionCounts[0] || { name: '—', count: 0 }
  const topTemaPct = total > 0 ? (topTema.count / total * 100).toFixed(1) : '0'
  const top3TemaPct = total > 0 ? (comisionCounts.slice(0, 3).reduce((s, c) => s + c.count, 0) / total * 100).toFixed(1) : '0'
  const bestPeriod = periodCounts.reduce((max, p) => p.count > max.count ? p : max, periodCounts[0] || { name: '—', count: 0 })
  const bestPeriodPct = total > 0 ? (bestPeriod.count / total * 100).toFixed(1) : '0'

  // --- ECharts Options ---

  const donutOption = {
    tooltip: { trigger: 'item' as const, formatter: '{b}: {c} ({d}%)' },
    legend: {
      orient: 'vertical' as const,
      right: 10,
      top: 'middle',
      textStyle: { color: '#b0b0b0', fontSize: 11 },
    },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['40%', '50%'],
      data: statusCounts.map(s => ({
        value: s.count,
        name: s.name,
        itemStyle: { color: getStatusColor(s.name) },
      })),
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 13, fontWeight: 'bold' as const, color: '#fff' },
      },
    }],
  }

  const comisionOption = {
    tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } },
    grid: { left: 10, right: 30, top: 10, bottom: 10, containLabel: true },
    xAxis: { type: 'value' as const },
    yAxis: {
      type: 'category' as const,
      data: [...comisionCounts].reverse().map(c => c.name),
      axisLabel: {
        width: 180,
        overflow: 'truncate' as const,
        ellipsis: '...',
        fontSize: 11,
      },
    },
    series: [{
      type: 'bar',
      data: [...comisionCounts].reverse().map(c => c.count),
      itemStyle: { color: '#6e20d3', borderRadius: [0, 4, 4, 0] },
      barMaxWidth: 20,
    }],
  }

  const yearOption = {
    tooltip: { trigger: 'axis' as const },
    grid: { left: 10, right: 10, top: 10, bottom: 10, containLabel: true },
    xAxis: { type: 'category' as const, data: yearCounts.map(y => y.name) },
    yAxis: { type: 'value' as const },
    series: [{
      type: 'bar',
      data: yearCounts.map(y => y.count),
      itemStyle: {
        color: {
          type: 'linear' as const, x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#6e20d3' },
            { offset: 1, color: '#5a18a8' },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
      barMaxWidth: 30,
    }],
  }

  const periodOption = {
    tooltip: { trigger: 'axis' as const },
    grid: { left: 10, right: 10, top: 30, bottom: 10, containLabel: true },
    xAxis: { type: 'category' as const, data: periodCounts.map(p => p.name) },
    yAxis: { type: 'value' as const },
    series: [{
      type: 'bar',
      data: periodCounts.map(p => ({
        value: p.count,
        itemStyle: {
          color: {
            type: 'linear' as const, x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#3498db' },
              { offset: 1, color: '#2471a3' },
            ],
          },
        },
      })),
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      barMaxWidth: 50,
      label: {
        show: true,
        position: 'top' as const,
        color: '#b0b0b0',
        fontSize: 13,
        fontWeight: 'bold' as const,
      },
    }],
  }

  const alliesOption = {
    tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } },
    grid: { left: 10, right: 30, top: 10, bottom: 10, containLabel: true },
    xAxis: { type: 'value' as const },
    yAxis: {
      type: 'category' as const,
      data: [...topAllies].reverse().map(a => a.name),
      axisLabel: { fontSize: 11 },
    },
    series: [{
      type: 'bar',
      data: [...topAllies].reverse().map(a => ({
        value: a.count,
        itemStyle: {
          color: getPartyColor(a.party),
          borderRadius: [0, 4, 4, 0],
        },
      })),
      barMaxWidth: 20,
    }],
  }

  const partiesOption = {
    tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const } },
    grid: { left: 10, right: 30, top: 10, bottom: 10, containLabel: true },
    xAxis: { type: 'value' as const },
    yAxis: {
      type: 'category' as const,
      data: [...topParties].reverse().map(p => p.name),
      axisLabel: { fontSize: 11 },
    },
    series: [{
      type: 'bar',
      data: [...topParties].reverse().map(p => ({
        value: p.count,
        itemStyle: {
          color: PARTY_COLORS[p.name] || '#95a5a6',
          borderRadius: [0, 4, 4, 0],
        },
      })),
      barMaxWidth: 20,
    }],
  }

  return (
    <>
      <PageHeader
        title="Análisis del Trabajo Legislativo"
        subtitle="Un recorrido por la labor y eficiencia del exdiputado Kast en la Cámara de Diputados."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <KpiCard title="Iniciativas Presentadas" value={total} subtitle="Carrera parlamentaria" />
        <KpiCard title="Aprobados / Terminados" value={leyesCount} subtitle={`Tasa: ${tasaExito.toFixed(1)}%`} />
        <KpiCard title="Promedio Anual" value={promedioAnual} subtitle="Mociones por año" />
        <KpiCard title="Aliado Histórico" value={topAlly.split(" ").slice(0, 3).join(" ")} subtitle="Mayor colaborador" />
      </div>

      {/* Hallazgos EDA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <InsightCard
          variant="stat"
          stat={`${hallazgos.nationalPct}%`}
          title="Alcance Nacional"
          description={`Solo ${hallazgos.regionalCount} de ${total} proyectos mencionan regiones específicas. La agenda fue casi exclusivamente de alcance nacional.`}
        />
        <InsightCard
          variant="stat"
          stat={hallazgos.peakYear.name}
          title="Año de Mayor Actividad"
          description={`Año de mayor actividad con ${hallazgos.peakYear.count} mociones ingresadas, durante el periodo ${hallazgos.peakPeriod}.`}
        />
        <InsightCard
          variant="discovery"
          title="Alianzas Transversales"
          description={hallazgos.crossPartyText}
        />
      </div>

      <div className="border-t border-white/5 my-12" />

      {/* Sección 1: Estado Actual de Tramitación */}
      <StorySection
        title="Estado Actual de Tramitación"
        description={`De las ${total} mociones, ${topStatus.count} (${topStatusPct}%) se clasifican como "${topStatus.name}". Solo ${leyesCount} completaron su tramitación y se convirtieron en ley (${tasaExito.toFixed(1)}% de éxito).`}
        chart={<EChart option={donutOption} style={{ height: '380px' }} />}
        textLeft
      />

      {/* Sección 2: Áreas de Influencia */}
      <StorySection
        title="Áreas de Influencia"
        description={`La temática principal fue "${topTema.name}" con ${topTema.count} proyectos (${topTemaPct}%). Las 3 áreas más legisladas concentran el ${top3TemaPct}% del total de mociones ingresadas.`}
        chart={<EChart option={comisionOption} style={{ height: '420px' }} />}
        textLeft={false}
      />

      {/* Sección 3: Evolución Histórica por año */}
      <StorySection
        title="Evolución Histórica"
        description={`El año de mayor producción fue ${hallazgos.peakYear.name} con ${hallazgos.peakYear.count} mociones. El promedio fue de ${promedioAnual} proyectos anuales a lo largo de los 16 años de actividad parlamentaria.`}
        chart={<EChart option={yearOption} style={{ height: '320px' }} />}
        textLeft
      />

      {/* Sección 4: Evolución por Legislatura */}
      <StorySection
        title="Producción por Legislatura"
        description={`El periodo más productivo fue ${bestPeriod.name} con ${bestPeriod.count} mociones (${bestPeriodPct}% del total). Cada columna representa un mandato de 4 años parlamentarios.`}
        chart={<EChart option={periodOption} style={{ height: '320px' }} />}
        textLeft={false}
      />

      {/* Sección 5: Principales Colaboradores */}
      <div className="border-t border-white/5 my-12" />
      <h2 className="font-serif text-2xl text-center mb-2">Principales Colaboradores</h2>
      <p className="text-muted-foreground text-center text-sm mb-8 max-w-2xl mx-auto">
        Diputados y partidos que firmaron más proyectos en conjunto con Kast.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="font-serif text-lg mb-4 text-center">Top 5 Aliados</h3>
          <EChart option={alliesOption} style={{ height: '250px' }} />
        </div>
        <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="font-serif text-lg mb-4 text-center">Top 5 Partidos</h3>
          <EChart option={partiesOption} style={{ height: '250px' }} />
        </div>
      </div>
    </>
  )
}

export default function GeneralPage() {
  return (
    <DashboardGate>
      <GeneralContent />
    </DashboardGate>
  )
}
