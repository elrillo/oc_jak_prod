"use client"

import { useState } from "react"
import { PageHeader } from "@/components/PageHeader"

const FAQ_ITEMS = [
  {
    category: "Sobre el Proyecto y su Objetivo",
    questions: [
      {
        q: "¿Qué es el Observatorio Congreso?",
        a: "Es un proyecto del Departamento de Análisis y Estudios de la Fundación Balmaceda, el cual a través de su plataforma web, da cuenta del trabajo de recopilación, sistematización y análisis efectuado respecto de la labor parlamentaria efectuada por parte de los representantes en el Congreso Nacional (tanto Senadores como Diputados). Dichos datos públicos son principalmente obtenidos desde el Sistema de Información Legislativa (SIL) y los sitios web institucionales del Senado, la Cámara de Diputados, la Biblioteca del Congreso Nacional y el Consejo Resolutivo de Asignaciones Parlamentarias. El objetivo de esta iniciativa es facilitar a la ciudadanía el acceso y comprensión de la actividad parlamentaria mediante visualizaciones interactivas. En particular, respecto al micrositio analisiskast.observatoriocongreso.cl, dicho proyecto busca dar cuenta de la labor legislativa del exdiputado José Antonio Kast, entre el 11 de marzo del año 2002 y el 10 de marzo del año 2018, mediante un análisis interactivo de los datos obtenidos y sistematizados desde fuentes oficiales del Congreso Nacional."
      },
      {
        q: "¿Es un sitio oficial del Congreso Nacional?",
        a: "No. Somos una Organización de la Sociedad Civil que utiliza datos abiertos del Congreso Nacional para facilitar la transparencia y la fiscalización de parte de la ciudadanía a los representantes del Congreso Nacional."
      },
      {
        q: "¿Qué periodo cubre este análisis?",
        a: (
          <>
            Este análisis cubre las mociones presentadas o patrocinadas por parte del exdiputado José Antonio Kast, entre el 11 de marzo del año 2002 y el 10 de marzo del año 2018, correspondientes al:
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Quincuagésimo Primer Período Legislativo (desde el 11-03-2002 al 10-03-2006), el cual se encuentra integrada por las legislaturas N°346, 347, 348, 349, 350, 351, 352 y 353.</li>
              <li>Quincuagésimo Segundo Período Legislativo (desde el 11-03-2006 al 10-03-2010), el cual se encuentra integrada por las legislaturas N°354, 355, 356 y 357.</li>
              <li>Quincuagésimo Tercer Período Legislativo (desde el 11-03-2010 al 10-03-2014), el cual se encuentra integrada por las legislaturas N°358, 359, 360 y 361.</li>
              <li>Quincuagésimo Cuarto Período Legislativo (desde el 11-03-2014 al 10-03-2018), el cual se encuentra integrada por las legislaturas N°362, 363, 364 y 365.</li>
            </ol>
          </>
        )
      },
      {
        q: "¿Cómo se generaron las temáticas?",
        a: (
          <>
            Para efectos del análisis y la experiencia interactiva de la información disponible en la plataforma, las comisiones iniciales en las cuales fueron presentadas cada una de las mociones parlamentarias presentadas o patrocinadas por parte del señor Kast, fueron categorizadas (por afinidad de materia tratada) en 10 temáticas, siendo estas las siguientes:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Constitución y Justicia</li><li>Economía y Hacienda</li><li>Desarrollo Social y Familia</li><li>Educación, Ciencia, Cultura y Deporte</li><li>Salud</li><li>Vivienda e Infraestructura</li><li>Ciudadanía y DD.HH.</li><li>Seguridad y Defensa Nacional</li><li>Medio Ambiente y Recursos Naturales</li><li>Gobierno Interior</li>
            </ul>
          </>
        )
      },
      {
        q: "¿Cómo puedo contactarme con el equipo Observatorio Congreso?",
        a: "Para consultas, reclamos, sugerencias o colaboraciones, puedes escribir al siguiente correo electrónico: estudios@fundacionbalmaceda.cl."
      }
    ]
  },
  {
    category: "Origen y Fiabilidad de los Datos",
    questions: [
      {
        q: "¿De dónde obtienen la información?",
        a: "Los datos provienen directamente de fuentes públicas oficiales del Congreso Nacional de Chile, siendo estas el Sistema de Información Legislativa (SIL) y los sitios web institucionales de la Cámara de Diputados y la Biblioteca del Congreso Nacional (BCN). Puedes consultar más detalles en nuestra Metodología de Datos."
      },
      {
        q: "¿Por qué los datos pueden diferir?",
        a: "Nuestras cifras son obtenidas desde las fuentes públicas oficiales del Congreso Nacional de Chile. No obstante a ello, las variaciones en la información pueden ocurrir debido, por ejemplo, a diferencias en los orígenes de la información dada la discrepancia entre distintas fuentes o a un problema de actualización/sincronización de los datos. En la eventualidad de evidenciar dicho inconveniente, solicitamos al Usuario tomar contacto con el equipo Observatorio Congreso al correo electrónico: estudios@fundacionbalmaceda.cl"
      },
      {
        q: "¿Qué modificaciones en los datos se han efectuado?",
        a: (
          <>
            Se ha efectuado una modificación a la categoría “tipo de proyecto” de los siguientes boletines:
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Boletín 4109-07: Reforma Constitucional que regula el trámite de urgencia en la tramitación de la ley.</li>
              <li>Boletín 4442-07: Reforma la Constitución Política de la República estableciendo la calidad con libertad en materia de educación.</li>
              <li>Boletín 4549-07: Reforma constitucional que incorpora el concepto de familia en la asociación de las personas.</li>
              <li>Boletín 6233-07: Reforma constitucional para establecer el voto voluntario.</li>
              <li>Boletín 7699-07: Establece una Reforma Constitucional que autoriza indemnización por errónea formalización de la investigación.</li>
              <li>Boletín 9847-07: Reforma constitucional en materia de nacionalización por ley en relación con la condena por delito que merezca pena aflictiva</li>
            </ol>
            <p className="mt-2">Dicha modificación es efectuada debido a que el Sistema de Información Legislativa (SIL) indica que tales mociones son “Proyectos de ley”, en circunstancia que tal como se establece explícitamente en su denominación estas corresponden a “Reformas Constitucionales”</p>
          </>
        )
      }
    ]
  },
  {
    category: "Uso de la Plataforma",
    questions: [
      {
        q: "¿Puedo descargar los datos para mi propia investigación?",
        a: "Sí. El proyecto promueve el uso de datos abiertos. Puedes utilizar la información citando al Observatorio Congreso como fuente de la información, según lo estipulado en nuestros Términos de Uso."
      },
      {
        q: "¿Qué hago si encuentro un error en una visualización?",
        a: "Si detectas un error u omisión entre los datos señalados en la presente plataforma respecto de aquellos proporcionados en los sitios web institucionales del Congreso Nacional, puedes reportarlo a través de nuestros canales de contacto, suministrando los antecedentes correspondientes al respecto, para proceder con su revisión y corrección, en caso corresponda."
      }
    ]
  },
  {
    category: "Soporte y Actualización",
    questions: [
      {
        q: "¿Qué significa 'Resumen IA'?",
        a: "Son resúmenes generados por inteligencia artificial a partir del texto original de cada moción parlamentaria. Permiten conocer rápidamente el contenido de un proyecto sin necesidad de leer el documento completo."
      },
      {
        q: "¿Con qué frecuencia se actualizan los datos?",
        a: "Dado que analizamos periodos legislativos que ya concluyeron, los datos son mayoritariamente estáticos. Sin embargo, considerando que aún existen proyectos presentados que se encuentran en tramitación legislativa, el análisis presentado en el sitio web está sujeto a modificaciones. La actualización de la información (en caso que corresponda), es de carácter periódica, siendo esta última efectuada en enero del año 2026."
      }
    ]
  }
]

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <PageHeader
        title="Preguntas Frecuentes (FAQ)"
        subtitle="Bienvenido a la sección de ayuda. Aquí encontrarás respuestas a las dudas más comunes sobre el funcionamiento de nuestra plataforma."
      />

      <div className="space-y-12">
        {FAQ_ITEMS.map((section, sIdx) => (
          <div key={sIdx}>
            <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2 text-[#6e20d3]">
              {section.category}
            </h3>
            <div className="space-y-3">
              {section.questions.map((item, qIdx) => {
                const id = `${sIdx}-${qIdx}`
                const isOpen = openIndex === id
                return (
                  <div
                    key={id}
                    className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-serif text-sm md:text-base pr-4">
                        {item.q}
                      </span>
                      <span className="text-white/40 text-xl shrink-0 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="transition-all duration-300 ease-in-out overflow-hidden"
                      style={{
                        maxHeight: isOpen ? "800px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed text-justify">
                        {item.a}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
