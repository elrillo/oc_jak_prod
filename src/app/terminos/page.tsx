import { PageHeader } from "@/components/PageHeader"

export default function TerminosPage() {
  return (
    <>
      <PageHeader
        title="Términos de Uso"
        subtitle="Condiciones que rigen el uso de la plataforma Observatorio Congreso."
      />

      <div className="max-w-3xl mx-auto space-y-12 mb-20 text-muted-foreground leading-relaxed text-justify">
        <p className="mb-8">
          El acceso y uso del sitio web analisiskast.observatoriocongreso.cl, está sujeto a los siguientes términos y condiciones:
        </p>

        {/* 1. SOBRE LA PLATAFORMA */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            1. SOBRE LA PLATAFORMA.
          </h3>
          <p>
            El sitio web analisiskast.observatoriocongreso.cl es un proyecto de análisis y fiscalización de carácter informativo y educativo, cuyo contenido (obtenido desde fuentes oficiales del Congreso Nacional) está diseñado para facilitar el acceso público a la información legislativa del exdiputado señor José Antonio Kast Rist.
          </p>
          <p className="mt-4">
            Los usuarios pueden consultar, difundir y citar la información presentada, siempre que se otorgue el crédito correspondiente al Observatorio Congreso de la Fundación Balmaceda como fuente del análisis presentado.
          </p>
        </section>

        {/* 2. SOBRE EL CONTENIDO DE LA INFORMACIÓN */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            2. SOBRE EL CONTENIDO DE LA INFORMACIÓN.
          </h3>
          <p>
            Como equipo Observatorio Congreso hemos aplicado rigurosos procesos de validación y verificación de la información analizada y transparentada en la plataforma web, cuya fuente primaria de los datos han sido sitios web institucionales del Congreso Nacional. No obstante, pueden existir involuntariamente errores u omisiones en la información.
          </p>
          <p className="mt-4">
            En la eventualidad de evidenciar problemas en los datos (sean estas por errores, omisiones o de otra naturaleza) entre aquellos informados por parte del Sistema de Información Legislativa (SIL) y/o los sitios web institucionales de la Cámara de Diputados y la Biblioteca del Congreso Nacional, respecto de los informados en la presente plataforma, solicitamos que los usuarios puedan tomar contacto con nosotros (a partir de los canales indicados en la sección Conecta) dando cuenta del problema, suministrando los antecedentes correspondientes al respecto, para proceder con su revisión y corrección, en caso corresponda.
          </p>
        </section>

        {/* 3. SOBRE LA PROPIEDAD INTELECTUAL */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            3. SOBRE LA PROPIEDAD INTELECTUAL
          </h3>
          <p>
            Los datos legislativos utilizados en esta plataforma son de dominio público y provienen del Sistema de Información Legislativa (SIL), y de los sitios web institucionales de la Cámara de Diputados y la Biblioteca del Congreso Nacional (BCN).
          </p>
          <p className="mt-4">
            No obstante, el diseño de los tableros web, la visualización de la plataforma, la arquitectura de la base de datos, el análisis de la información y el código fuente de la plataforma son propiedad intelectual del proyecto Observatorio Congreso de la Fundación Balmaceda.
          </p>
          <p className="mt-4">
            Dado lo anterior, como equipo Observatorio Congreso proporcionamos el uso académico y periodístico de la información dispuesta en la plataforma, siempre que se cite la fuente como: "Datos obtenidos de observatoriocongreso.cl - Observatorio Congreso". Cualquier otro tipo de uso del contenido de esta plataforma requiere autorización previa por escrito, la cual se deberá efectuar al correo electrónico estudios@fundacionbalmaceda.cl
          </p>
          <p className="mt-4">
            Cabe indicar que se prohíbe el uso por parte de los usuarios, de sistemas automatizados (bots, scrapers) para la extracción masiva de datos de la plataforma.
          </p>
        </section>

        {/* 4. SOBRE LA RESPONSABILIDAD DE LA INFORMACIÓN */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            4. SOBRE LA RESPONSABILIDAD DE LA INFORMACIÓN
          </h3>
          <p>
            El equipo Observatorio Congreso del proyecto no se hace responsable por:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Interpretaciones erróneas de los datos, efectuadas por parte de terceros.</li>
            <li>El uso de la información en contextos de campañas electorales o propaganda política.</li>
            <li>Fallos temporales de disponibilidad del sitio debido a mantenimiento o caídas de servidores.</li>
          </ul>
          <p className="mt-4">
            A su vez, cabe advertir que los análisis generados mediante inteligencia artificial son aproximaciones y no deben ser considerados como interpretaciones definitivas.
          </p>
        </section>

        {/* 5. SOBRE LA PRIVACIDAD DE INFORMACIÓN */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            5. SOBRE LA PRIVACIDAD DE INFORMACIÓN
          </h3>
          <p>
            Con el propósito de dar cumplimiento a la ley N°19628 sobre protección de la vida privada, este sitio no recolecta datos personales de los visitantes sin su expreso consentimiento, más allá de las métricas de navegación anónimas necesarias para optimizar el rendimiento de la plataforma web.
          </p>
        </section>

        {/* 6. SOBRE MODIFICACIONES A LA PLATAFORMA */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            6. SOBRE MODIFICACIONES A LA PLATAFORMA
          </h3>
          <p>
            Nos reservamos el derecho de modificar los datos exhibidos en el presente sitio, y los términos y condiciones de uso, cuando se estime necesario. Los cambios serán efectivos desde su publicación en esta plataforma. El uso continuado del sitio después de la publicación de cambios constituye la aceptación de los términos modificados. Las modificaciones efectuadas a los datos referentes al trabajo legislativo del exdiputado José Antonio Kast, se dispondrán en un apartado de la sección Preguntas Frecuentes.
          </p>
        </section>

        {/* 7. CONTACTO */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-white">
            7. CONTACTO
          </h3>
          <p>
            Para consultas sobre estos términos de uso, puede contactarnos a través de los canales indicados en la sección Conecta.
          </p>
        </section>
      </div>
    </>
  )
}
