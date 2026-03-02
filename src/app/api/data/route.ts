/**
 * API Route: /api/data
 *
 * Carga todas las tablas desde PostgreSQL (Supabase) usando conexión directa.
 * Se ejecuta en el servidor (Node.js), no en el navegador.
 */
import { NextResponse } from 'next/server'
import { Pool } from 'pg'

// Pool de conexiones reutilizable (singleton)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase pooler requiere esto
  max: 5,
  idleTimeoutMillis: 30000,
})

export async function GET() {
  let client
  try {
    client = await pool.connect()

    const [mocionesRes, coautoresRes, diputadosRes, iaRes, textosPdfRes] = await Promise.all([
      client.query('SELECT * FROM mociones'),
      client.query('SELECT * FROM coautores'),
      client.query('SELECT * FROM dim_diputados'),
      client.query('SELECT * FROM analisis_ia'),
      client.query('SELECT n_boletin, resumen_ia FROM textos_pdf'),
    ])

    return NextResponse.json({
      mociones: mocionesRes.rows,
      coautores: coautoresRes.rows,
      diputados: diputadosRes.rows,
      analisisIA: iaRes.rows,
      textosPdf: textosPdfRes.rows,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[API/data] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido al conectar a PostgreSQL' },
      { status: 500 }
    )
  } finally {
    if (client) client.release()
  }
}
