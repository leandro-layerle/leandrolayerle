export type Service = {
  slug: string;
  title: string;
  headline: string;
  emphasis: string;
  description: string;
  image: string;
  situations: string[];
  solutions: { title: string; text: string }[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "consultoria", title: "Consultoría tecnológica",
    headline: "Antes de invertir en tecnología.", emphasis: "Entendamos qué necesita tu negocio.",
    description: "Te acompaño a identificar oportunidades, elegir herramientas y definir un plan de mejoras que puedas llevar a la práctica.", image: "/images/services/consultoria.png",
    situations: ["Tu empresa creció y los procesos se volvieron difíciles de gestionar.", "Tenés varias herramientas pero no sabés si las estás aprovechando.", "Querés incorporar tecnología sin invertir en soluciones innecesarias."],
    solutions: [{title:"Diagnóstico",text:"Relevamiento de hasta tres procesos y herramientas actuales."},{title:"Plan de acción",text:"Priorización de mejoras según impacto, esfuerzo y viabilidad."},{title:"Acompañamiento",text:"Asesoramiento para evaluar alternativas y tomar decisiones."}],
    deliverables:["Mapa de oportunidades y recomendaciones.","Hoja de ruta priorizada.","Reunión de presentación y próximos pasos."]
  },
  {
    slug:"automatizacion",title:"Automatización e integraciones",
    headline:"Menos trabajo manual.",emphasis:"Más tiempo para lo importante.",
    description:"Conecto herramientas y simplifico procesos repetitivos para que tu equipo pueda concentrarse en el trabajo que aporta valor.",image:"/images/services/automatizacion.png",
    situations:["Copiás información entre planillas y sistemas.","El seguimiento de clientes depende de recordatorios manuales.","Las tareas repetitivas generan demoras o errores."],
    solutions:[{title:"Flujos de trabajo",text:"Automatización de tareas y avisos según reglas acordadas."},{title:"Integraciones",text:"Conexión de herramientas mediante APIs cuando estén disponibles."},{title:"Gestión de consultas",text:"Registro y seguimiento de interesados con los canales existentes."}],
    deliverables:["Flujo implementado y probado según alcance.","Documentación y capacitación de uso.","Revisión de errores, permisos y costos recurrentes."]
  },
  {
    slug:"desarrollo",title:"Sistemas a medida",
    headline:"Tu negocio no tiene que adaptarse al software.",emphasis:"El software puede adaptarse a tu negocio.",
    description:"Diseño aplicaciones e integraciones para necesidades concretas cuando las herramientas existentes no son suficientes.",image:"/images/services/sistemas.png",
    situations:["Las planillas ya no alcanzan para gestionar la operación.","Un sistema existente limita tu crecimiento.","Necesitás conectar aplicaciones o construir una funcionalidad específica."],
    solutions:[{title:"Aplicaciones web",text:"Sistemas internos y portales ajustados al proceso real."},{title:"APIs e integraciones",text:"Servicios e interfaces con contratos claros."},{title:"Modernización",text:"Evolución incremental de aplicaciones existentes."}],
    deliverables:["Alcance y criterios de aceptación acordados.","Código, pruebas y documentación según propuesta.","Entrega y puesta en marcha según infraestructura acordada."]
  },
  {
    slug:"inteligencia-artificial",title:"Inteligencia artificial aplicada",
    headline:"IA donde tenga sentido.",emphasis:"No IA por el simple hecho de usarla.",
    description:"Evalúo cómo incorporar inteligencia artificial para facilitar tareas, analizar información y asistir a las personas en su trabajo diario.",image:"/images/services/ia.png",
    situations:["Tu equipo dedica tiempo a leer, resumir o clasificar información.","Hay consultas frecuentes que podrían atenderse de forma asistida.","Querés adoptar IA sin perder control sobre tus datos ni resultados."],
    solutions:[{title:"Asistentes",text:"Ayuda contextual con información autorizada del negocio."},{title:"Documentos y datos",text:"Extracción y clasificación con validación de resultados."},{title:"IA en procesos",text:"Integración gradual con revisión humana y evaluación de calidad."}],
    deliverables:["Caso de uso y criterios de calidad definidos.","Piloto o implementación según alcance.","Evaluación de resultados, límites y costos de operación."]
  },
  {
    slug:"capacitacion",title:"Capacitación empresarial",
    headline:"Aprender para aplicar.",emphasis:"No solamente para conocer.",
    description:"Talleres prácticos de IA para empresas, cámaras y asociaciones, adaptados a las tareas reales de sus participantes.",image:"/images/services/ia.png",
    situations:["Tu equipo quiere utilizar IA pero no sabe por dónde empezar.","Cada persona usa herramientas de manera diferente.","Necesitás una capacitación que pueda aplicarse al trabajo cotidiano."],
    solutions:[{title:"IA para negocios",text:"Ejercicios de ventas, atención al cliente y administración."},{title:"Talleres por sector",text:"Actividades adaptadas a turismo, hotelería e inmobiliarias."},{title:"Uso responsable",text:"Revisión de resultados, privacidad y buenas prácticas."}],
    deliverables:["Taller virtual o presencial a coordinar.","Ejercicios y material de trabajo.","Recomendaciones para continuar aplicando lo aprendido."]
  },
  {
    slug:"consultoria-it",title:"Consultoría especializada IT",
    headline:"Experiencia técnica.",emphasis:"Al servicio de tu equipo.",
    description:"Colaboro con equipos de desarrollo que necesitan resolver desafíos técnicos, modernizar aplicaciones o sumar capacidades especializadas.",image:"/images/services/sistemas.png",
    situations:["Necesitás evolucionar una aplicación .NET sin detener la operación.","Tu equipo requiere apoyo en arquitectura, calidad o integraciones.","Querés incorporar IA o GitHub Copilot con criterios técnicos claros."],
    solutions:[{title:"Arquitectura y .NET",text:"Diseño, desarrollo y revisión de decisiones técnicas."},{title:"Modernización y calidad",text:"Auditorías, pruebas y evolución incremental de sistemas."},{title:"IA y mentoría",text:"Adopción de herramientas, capacitación y acompañamiento técnico."}],
    deliverables:["Objetivos y alcance acordados con el equipo.","Recomendaciones, código o entregables según modalidad.","Transferencia de conocimiento y próximos pasos."]
  }
];

export const industries: Service[] = [
  {
    slug: "hoteleria", title: "Tecnología para hoteles y posadas",
    headline: "Más tiempo para tus huéspedes.", emphasis: "Menos tareas repetitivas.",
    description: "Te ayudo a simplificar la atención, organizar consultas y facilitar la gestión diaria de tu alojamiento, sin perder el trato personalizado.", image: "/images/services/automatizacion.png",
    situations: ["Tu equipo responde las mismas preguntas sobre horarios, servicios y disponibilidad.", "Las consultas llegan por distintos canales y cuesta hacerles seguimiento.", "Preparar información en otros idiomas o copiar datos entre herramientas lleva tiempo."],
    solutions: [{title:"Atención asistida",text:"Respuestas a preguntas frecuentes con información aprobada por el alojamiento y derivación al equipo cuando corresponda."},{title:"Consultas y reservas",text:"Organización de interesados, recordatorios e integración con sistemas de reservas si sus interfaces lo permiten."},{title:"Operación diaria",text:"Automatización de avisos, preparación de información para huéspedes y tareas administrativas."}],
    deliverables: ["Relevamiento de canales y herramientas actuales.", "Plan de mejora o piloto con alcance acordado.", "Pruebas con escenarios de atención, capacitación y documentación."]
  },
  {
    slug: "inmobiliarias", title: "Tecnología para inmobiliarias",
    headline: "Más tiempo para tus clientes.", emphasis: "Mejor seguimiento de cada oportunidad.",
    description: "Te ayudo a organizar consultas, agilizar la búsqueda de propiedades y simplificar el seguimiento comercial de tu inmobiliaria.", image: "/images/services/consultoria.png",
    situations: ["Recibís consultas por varios canales y resulta difícil centralizarlas.", "El seguimiento depende de recordatorios manuales.", "Buscar propiedades acordes a cada interesado y preparar propuestas lleva tiempo."],
    solutions: [{title:"Gestión de interesados",text:"Registro de consultas y necesidades en las herramientas existentes, cuando sea viable."},{title:"Búsqueda asistida",text:"Selección de propiedades a partir de criterios acordados, con información actualizada y revisión del asesor."},{title:"Seguimiento comercial",text:"Recordatorios, preparación de respuestas y avisos para que el equipo decida el próximo paso."}],
    deliverables: ["Mapa del proceso comercial y sus oportunidades de mejora.", "Flujo o piloto probado con casos acordados.", "Documentación, capacitación y criterios para medir resultados."]
  },
  {
    slug: "turismo", title: "Tecnología para agencias de turismo",
    headline: "Menos tiempo preparando propuestas.", emphasis: "Más tiempo creando experiencias.",
    description: "Te acompaño a agilizar cotizaciones, itinerarios y tareas operativas, aprovechando las herramientas que ya utiliza tu agencia.", image: "/images/services/ia.png",
    situations: ["Preparar una cotización personalizada implica consultar varias fuentes.", "La información de actividades, proveedores y horarios está dispersa.", "Responder consultas en distintos idiomas y hacer seguimiento ocupa parte de la jornada."],
    solutions: [{title:"Cotizaciones",text:"Preparación asistida de propuestas a partir de tarifas y reglas autorizadas, con revisión antes del envío."},{title:"Itinerarios",text:"Organización de experiencias y alternativas según preferencias, disponibilidad confirmada y restricciones."},{title:"Coordinación",text:"Integraciones, recordatorios y gestión de consultas según los sistemas disponibles."}],
    deliverables: ["Análisis del proceso de cotización y operación.", "Prototipo o implementación según alcance y accesos disponibles.", "Pruebas, documentación y capacitación para el equipo."]
  },
  {
    slug: "comercios", title: "Tecnología para comercios y servicios",
    headline: "Simplificá la gestión de tu negocio.", emphasis: "Concentrate en atender mejor.",
    description: "Te ayudo a organizar pedidos, presupuestos, consultas y tareas administrativas con soluciones ajustadas a tu forma de trabajar.", image: "/images/services/sistemas.png",
    situations: ["Los pedidos y consultas quedan repartidos entre mensajes y planillas.", "Preparar presupuestos o registrar información requiere repetir tareas.", "Necesitás ordenar el trabajo sin incorporar herramientas innecesarias."],
    solutions: [{title:"Pedidos y consultas",text:"Organización de información y seguimiento con herramientas adecuadas al negocio."},{title:"Presupuestos",text:"Plantillas y automatizaciones con revisión de precios y condiciones antes de enviar."},{title:"Gestión administrativa",text:"Integraciones, recordatorios y reportes para reducir tareas manuales."}],
    deliverables: ["Relevamiento y priorización de mejoras.", "Solución acotada o plan de implementación acordado.", "Pruebas y guía de uso para el equipo."]
  }
];

export function getService(slug: string): Service | undefined {
  return [...services, ...industries].find((service) => service.slug === slug);
}
