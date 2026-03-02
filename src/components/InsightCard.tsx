"use client"

import { motion } from "framer-motion"

interface InsightCardStatProps {
  variant: "stat"
  label?: string
  title: string
  stat: string
  description: string
  accentColor?: string
}

interface InsightCardDiscoveryProps {
  variant: "discovery"
  label?: string
  title: string
  description: string
  accentColor?: string
}

interface InsightCardComparisonProps {
  variant: "comparison"
  label?: string
  title: string
  description?: string
  left: { value: string; label: string }
  right: { value: string; label: string }
  accentColor?: string
}

export type InsightCardProps =
  | InsightCardStatProps
  | InsightCardDiscoveryProps
  | InsightCardComparisonProps

const DEFAULT_COLORS = {
  stat: "#eda744",
  discovery: "#6e20d3",
  comparison: "#3498db",
}

/**
 * InsightCard — Componente reutilizable para presentar hallazgos del EDA.
 * 3 variantes: stat (cifra destacada), discovery (narrativa), comparison (contraste).
 */
export function InsightCard(props: InsightCardProps) {
  const accent = props.accentColor || DEFAULT_COLORS[props.variant]

  const labelText =
    props.label ||
    (props.variant === "stat" ? "HALLAZGO" : props.variant === "discovery" ? "DESCUBRIMIENTO" : "COMPARACIÓN")

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#141414]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
      style={{ borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <div className="p-5">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: accent }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: accent }}
          >
            {labelText}
          </span>
        </div>

        {/* Contenido según variante */}
        {props.variant === "stat" && (
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <p
                className="font-serif text-3xl lg:text-4xl font-bold leading-none"
                style={{ color: accent }}
              >
                {props.stat}
              </p>
            </div>
            <div className="min-w-0">
              <h4 className="font-serif text-sm font-semibold text-white/90 mb-1">
                {props.title}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                {props.description}
              </p>
            </div>
          </div>
        )}

        {props.variant === "discovery" && (
          <div>
            <h4 className="font-serif text-base font-semibold text-white/90 mb-2">
              {props.title}
            </h4>
            <p className="text-sm text-white/50 leading-relaxed">
              {props.description}
            </p>
          </div>
        )}

        {props.variant === "comparison" && (
          <div>
            <h4 className="font-serif text-sm font-semibold text-white/90 mb-3">
              {props.title}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-white/5 rounded-lg py-3 px-2">
                <p
                  className="font-serif text-2xl font-bold leading-none mb-1"
                  style={{ color: accent }}
                >
                  {props.left.value}
                </p>
                <p className="text-[11px] text-white/40">{props.left.label}</p>
              </div>
              <div className="text-center bg-white/5 rounded-lg py-3 px-2">
                <p className="font-serif text-2xl font-bold text-white/70 leading-none mb-1">
                  {props.right.value}
                </p>
                <p className="text-[11px] text-white/40">{props.right.label}</p>
              </div>
            </div>
            {props.description && (
              <p className="text-xs text-white/40 mt-3 leading-relaxed">
                {props.description}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
