import { PageHeader } from "@/components/PageHeader"

export default function MetodologiaPage() {
  return (
    <>
      <PageHeader
        title="Metodología de Datos"
        subtitle="Esta sección describe la metodología aplicada para la obtención, sistematización, análisis y visualización de la actividad legislativa del exdiputado José Antonio Kast durante su periodo como representante electo de la Cámara de Diputados entre el 11 de marzo del año 2002 y el 10 de marzo del año 2018."
      />

      <div className="max-w-4xl mx-auto space-y-12 mb-20 px-4">
        {/* FUENTES DE DATOS */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            1. Fuentes de Datos
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            Los datos utilizados en esta plataforma provienen de fuentes públicas oficiales del Congreso Nacional de Chile. La información legislativa es obtenida desde:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-muted-foreground leading-relaxed text-justify">
            <li>
              <strong>El Sistema de Información Legislativa (SIL):</strong> En dicha plataforma web es posible obtener información respecto de cada uno de los proyectos de ley, proyectos de acuerdo y reformas constitucionales presentadas por parte del exdiputado señor José Antonio Kast, y la correspondiente tramitación legislativa. <a href="https://tramitacion.senado.cl/appsenado/templates/tramitacion/" target="_blank" rel="noopener noreferrer" className="text-[#6e20d3] hover:underline break-all">Enlace</a>
            </li>
            <li>
              <strong>El sitio web institucional de la Cámara de Diputados:</strong> En dicha plataforma web, particularmente en la sección "Actividad Legislativa" es posible obtener información respecto de los "Boletines de Sesiones" los cuales fueron empleados para corroborar la información proporcionada por parte del Sistema de Información Legislativa (SIL) respecto al contenido de cada una de las mociones parlamentarias presentadas por parte del exdiputado señor José Antonio Kast. <a href="https://camara.cl/legislacion/sesiones_sala/sesiones_sala.aspx" target="_blank" rel="noopener noreferrer" className="text-[#6e20d3] hover:underline break-all">Enlace</a>
            </li>
            <li>
              <strong>El sitio web institucional de la Biblioteca del Congreso Nacional (BCN):</strong> En dicha plataforma web, particularmente en la sección "Reseñas biográficas parlamentarias" es posible obtener información respecto del trabajo legislativo del exdiputado señor José Antonio Kast, a fin de corroborar la información proporcionada por parte del Sistema de Información Legislativa (SIL). <a href="https://www.bcn.cl/historiapolitica/resenas_parlamentarias/" target="_blank" rel="noopener noreferrer" className="text-[#6e20d3] hover:underline break-all">Enlace</a>
            </li>
            <li>
              <strong>El sitio web institucional del Servicio Electoral (SERVEL):</strong> En dicha plataforma web, particularmente en la sección "Resultados electorales Históricos" es posible obtener información respecto del partido político al cual pertenecían cada uno de los diputados electos con los cuales el señor José Antonio Kast estableció alianzas, al momento de presentar o patrocinar mociones parlamentarias. <a href="https://www.servel.cl/" target="_blank" rel="noopener noreferrer" className="text-[#6e20d3] hover:underline break-all">Enlace</a>
            </li>
          </ol>
        </section>

        {/* PROCESO DE SISTEMATIZACIÓN */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            2. Proceso de Sistematización y Análisis de la Información
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            Tras la correspondiente identificación y recopilación de las mociones parlamentarias presentadas (o patrocinadas) por parte del exdiputado señor José Antonio Kast Rist durante su periodo como diputado (2002-2018), se procedió a sistematizar dicha información. Dicho ejercicio considera datos respecto de la tramitación legislativa de cada boletín, considerando para ello, la generación de las siguientes categorías:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed text-justify mb-4">
            <li>Nombre de la iniciativa de ley;</li>
            <li>Número de boletín;</li>
            <li>Fecha de ingreso;</li>
            <li>Cámara de origen (la cual para efectos de este análisis corresponden todos a la Cámara de Diputados);</li>
            <li>Tipo de Iniciativa (la cual para efectos de este análisis corresponden todos a moción parlamentaria);</li>
            <li>Tipo de proyecto (es decir, si corresponde a Proyecto de Ley, Proyecto de Acuerdo o Reforma Constitucional);</li>
            <li>Comisión inicial de la iniciativa (el cual posteriormente se reclasifica en temáticas para efectos del análisis efectuado);</li>
            <li>Etapa de la tramitación legislativa;</li>
            <li>Datos sobre publicación en el Diario Oficial del boletín, en caso corresponda.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            El flujo de datos se gestiona mediante herramientas de automatización que garantizan la integridad de la información, de esta manera los datos obtenidos por parte del Sistema de Información Legislativa (SIL) son normalizados, es decir, se categorizan y estandarizan formatos, corrigiendo los errores ortográficos y de forma que puedan existir. Posteriormente, la información procesada se almacena en un Data Warehouse optimizado para consultas analíticas rápidas. Por último, la información analizada es exhibida en la plataforma a través de las siguientes secciones: Información general, Información por periodo legislativo, Mociones parlamentarias destacadas, Análisis por comisiones, Análisis de alianzas políticas, Estado de tramitación de proyectos, Leyes publicadas, Explorador de las iniciativas de ley.
          </p>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Complementariamente a lo anterior, el análisis de inteligencia artificial se emplea con un enfoque heurístico basado en keywords para clasificar temáticamente las mociones, determinar el tipo de iniciativa (Punitiva, Propositiva o Administrativa) y generar resúmenes ejecutivos extractivos. El análisis de sentimiento se realiza mediante un score normalizado entre -1.0 y 1.0 que evalúa el tono general del texto legislativo.
          </p>
        </section>

        {/* ALIANZAS */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            3. Sobre el Apartado de "Alianzas"
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            Respecto al apartado “Alianzas” del sitio, es necesario tener en consideración lo siguiente: La información respecto del Partido Político de cada diputado que estableció alianza con el señor José Antonio Kast, a fin de presentar o patrocinar una moción parlamentaria, fue obtenida desde la sección “Resultados electorales Históricos” del sitio web del Servicio Electoral (SERVEL). Dicho dato, por tanto, corresponde al partido político en el cual se encontraba el representante al momento de ser electo en la correspondiente elección parlamentaria.
          </p>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            Respecto en particular a la categoría "Independiente" (tanto aquellos contenidos en un pacto como fuera de pacto) estos estarán agrupados en una sola categoría, siendo dichos representantes los siguientes:
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-muted-foreground leading-relaxed">
            <li>Alberto Cardemil, Ind. (ILD), correspondiente al periodo 2006 - 2010</li>
            <li>Andrea Molina, Ind. (ILB), correspondiente al periodo 2010 - 2014</li>
            <li>Daniella Cicardini, Ind. (PS), correspondiente al periodo 2014 - 2018</li>
            <li>Eduardo Díaz, Ind. (ILB), correspondiente al periodo 2006 - 2010</li>
            <li>Felipe Kast, Ind. (RN), correspondiente al periodo 2014 - 2018</li>
            <li>Gastón Von Mühlenbrock, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Ignacio Urrutia, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Marta Isasi, Ind. (ILB), correspondiente al periodo 2010 - 2014</li>
            <li>Pablo Prieto, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Pedro Pablo Álvarez-Salamanca Ramírez, Ind. (ILB), correspondiente al periodo 2010 - 2014</li>
            <li>Pedro Velásquez, Ind., correspondiente al periodo 2010 - 2014</li>
            <li>Ramón Pérez, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Roberto Delmastro, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Rosauro Martínez, Ind. (ILC), correspondiente al periodo 2002 - 2006</li>
            <li>Tucapel Jiménez, Ind. (ILB), correspondiente al periodo 2006 – 2010</li>
          </ol>
        </section>

        {/* CALIDAD DE LA INFORMACIÓN PROPORCIONADA */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            4. Calidad de la Información Proporcionada
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            La información empleada para efectos del análisis realizado por parte de Observatorio Congreso es obtenida de los sitios web institucionales del Congreso Nacional, principalmente desde el Sistema de Información Legislativa (SIL). En particular respecto al contenido de las mociones parlamentarias estos fueron obtenidos desde la plataforma antes señalada, y revisados a partir de la información dispuesta en los Diario de Sesiones de la Camara de Diputados. Junto con ello, se efectuaron correcciones manuales respecto de denominación de categorías que presentaban errores ortográficos o de formatos, permitiendo así la normalización de la información para un adecuado análisis. Junto a ello, la denominación y estandarización de los partidos políticos se efectuó a partir de la información dispuesta en el sitio web del Servicio Electoral (SERVEL). No obstante, pueden existir involuntariamente errores u omisiones en la información. En la eventualidad de evidenciar problemas en los datos (sean estas por errores, omisiones o de otra naturaleza) entre aquellos informados por parte del Sistema de Información Legislativa (SIL) y/o los sitios web institucionales de la Cámara de Diputados y la Biblioteca del Congreso Nacional, respecto de los informados en la presente plataforma, solicitamos que los usuarios puedan tomar contacto con nosotros (a partir de los canales indicados en la sección Conecta) dando cuenta del problema, suministrando los antecedentes correspondientes al respecto, para proceder con su revisión y corrección, en caso corresponda.
          </p>
        </section>

        {/* LIMITACIONES DEL ANÁLISIS */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            5. Limitaciones del Análisis
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Esta plataforma se enfoca exclusivamente en efectuar un estudio interactivo de las mociones parlamentarias presentadas o patrocinadas por parte del exdiputado José Antonio Kast. Por tanto, el presente análisis prescinde de realizar un análisis general respecto del trabajo parlamentario, focalizando el presente trabajo en un análisis de la labor legislativa, omitiendo por tanto su labor representativa, política y de fiscalización (el cual contiene variables como asistencia, votación, intervenciones en sala, etc). A su vez, cabe advertir que respecto al análisis de IA, este es de carácter heurístico, por lo cual puede contener imprecisiones en la clasificación temática o en los resúmenes generados. Los datos reflejan el estado registrado al momento de la última sincronización con la documentación elaborada a partir de los boletines obtenidos desde el Sistema de información Legislativa (SIL), los cuales fueron revisados a partir de los textos disponibles en los correspondientes Diarios de Sesión.
          </p>
        </section>

        {/* ACTUALIZACIÓN DE DATOS */}
        <section>
          <h3 className="text-xl font-serif font-semibold mb-4 border-b border-white/10 pb-2">
            6. Actualización de Datos
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Respecto a la actualización de datos referentes al trabajo legislativo del exdiputado José Antonio Kast entre el 11 de marzo del año 2002 y el 10 de marzo del año 2018, dicha información puede experimentar variaciones, pues existen proyectos presentados que aún se encuentran en tramitación legislativa, motivo por el cual, el análisis presentado en el sitio web está sujeto a modificaciones. Cabe señalar que los datos transparentados representan una “fotografía” del instante en que estos fueron obtenidos y posteriormente revisados. Dicho ejercicio de revisión de la información proporcionada por parte del Sistema de Información Legislativa (SIL) respecto a las mociones presentadas por parte del señor Kast se efectuó por última vez en enero del año 2026.
          </p>
        </section>

      </div>
    </>
  )
}
