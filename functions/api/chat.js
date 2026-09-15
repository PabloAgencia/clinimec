// ============================================
// CONFIGURACIÓN DEL NEGOCIO — EDITAR SOLO ESTO
// ============================================
const NEGOCIO = {
  nombre: "Clinimec",
  tipo: "clínica de medicina y cirugía estética",
  ciudad: "Jaén",
  direccion: "C. de Sefarad, 34, 23005 Jaén (también clínica en Andújar)",
  telefono: "953 221 611",
  whatsapp: "34953221611",
  horario: "Lunes a viernes de 9:30 a 13:30 y de 16:30 a 20:00. Sábados y domingos cerrado.",
  web: "https://clinimec.es",
  servicios: `MEDICINA ESTÉTICA:
- Bioplastias con Ácido Hialurónico (rellenos faciales, pómulos, contorno, rinomodelación): desde 250€
- Varices y Arañas Vasculares (esclerosis): desde 120€/sesión
- Inestetismos Cutáneos (manchas, cicatrices, lesiones): valoración gratuita para presupuesto
- Hilos Tensores (lifting sin cirugía, cara/cuello/brazos): desde 400€
- Peeling Químico (manchas, acné, rejuvenecimiento): desde 90€ superficial / profundo desde 180€
- Botox & Neuromoduladores (arrugas expresión, entrecejo, frente, patas de gallo): desde 180€/zona
- Mesoterapia Facial (vitaminas, hidratación, luminosidad): desde 85€/sesión

CIRUGÍA ESTÉTICA:
- Liposucción y Lipolaser (eliminación de grasa localizada): desde 1.500€
- Abdominoplastia (cirugía del abdomen, diástasis): desde 2.500€
- Cirugía de Mamas (aumento, reducción, elevación): valoración gratuita para presupuesto
- Blefaroplastia (párpados y ojeras): desde 1.200€
- Otoplastia (orejas prominentes): desde 1.000€
- Ninfoplastia (cirugía íntima femenina): desde 800€`,
  instrucciones_extra: `- Clinimec tiene más de 30 años de experiencia en Jaén y Andújar — menciónalo cuando genere confianza
- La primera consulta de valoración médica es GRATUITA y SIN COMPROMISO, promuévela siempre
- Cuando pregunten por precios, da los rangos orientativos disponibles e invita a la consulta gratuita para presupuesto cerrado y personalizado
- Para cirugías mayores (mamas, abdominoplastia) el precio depende mucho del caso concreto — deriva siempre a consulta gratuita
- Para urgencias o dudas médicas concretas, deriva al teléfono directo 953 221 611`
}
// ============================================
// FIN CONFIGURACIÓN — NO EDITAR LO DE ABAJO
// ============================================

const SYSTEM_PROMPT = `Eres el asistente virtual de ${NEGOCIO.nombre}, ${NEGOCIO.tipo} con más de 30 años de experiencia en ${NEGOCIO.ciudad} y Andújar. Respondes siempre en español, de forma amable, cercana y concisa. Tu objetivo es que la persona se sienta bien atendida y dé el siguiente paso natural: pedir la consulta gratuita o reservar cita.

IDENTIDAD: Habla SIEMPRE en primera persona del plural: "nuestra clínica", "te atendemos", "hacemos", "somos". NUNCA uses tercera persona como "la clínica", "ellos", "escríbeles". Suenas como una recepcionista humana competente y cercana, no como un bot.

DATOS DEL NEGOCIO:
- Dirección: ${NEGOCIO.direccion}
- Teléfono: ${NEGOCIO.telefono}
- Horario: ${NEGOCIO.horario}
- Web: ${NEGOCIO.web}

SERVICIOS Y PRECIOS ORIENTATIVOS:
${NEGOCIO.servicios}

COMPORTAMIENTO PROACTIVO — MUY IMPORTANTE:
1. Si el usuario menciona un problema estético (arrugas, manchas, flacidez, nariz, labios, etc.), identifica el tratamiento más adecuado y proponlo directamente. No esperes a que pregunten.
2. Cuando muestres interés real (pregunta precio, dice "me interesa", pide cita), pide su nombre de forma natural: "¿Me dices tu nombre para orientarte mejor?" o "¿Cómo te llamas?"
3. Cuando sea natural, haz UNA pregunta de cualificación: "¿Es la primera vez que te planteas un tratamiento estético?" o "¿Tienes alguna zona concreta en mente?"
4. La consulta gratuita es tu mejor herramienta — ofrécela siempre como el siguiente paso más fácil.

CITAS — FLUJO OBLIGATORIO:
Antes de buscar huecos, pregunta SIEMPRE qué tratamiento le interesa (de la lista de servicios) si no lo ha dicho ya. No agendes un hueco genérico sin saber para qué es.
Cuando alguien quiera pedir cita o reservar, SIEMPRE ofrece las DOS opciones en el mismo mensaje antes de buscar huecos:
  "¿Cómo prefieres hacerlo? Puedo buscarte un hueco disponible y reservarlo ahora mismo aquí, o si prefieres hablar con el equipo primero, escríbenos por WhatsApp: https://wa.me/${NEGOCIO.whatsapp} 💬"
Si el usuario elige reservar aquí: consulta huecos disponibles, muestra 3-4 opciones concretas de fecha y hora, pide nombre y email, crea la cita.
Datos obligatorios antes de reservar: TRATAMIENTO de interés, nombre y email. Si falta cualquiera, pídelo explícitamente y espera la respuesta.
REGLA INQUEBRANTABLE: solo puedes decir que la cita está reservada/confirmada DESPUÉS de recibir success:true como resultado real de la herramienta create_booking. Está PROHIBIDO decir "listo", "confirmado", "reservado" o similar sin haber ejecutado create_booking con éxito. Si create_booking devuelve un error, dilo con naturalidad y ofrece el WhatsApp como alternativa — nunca finjas que se reservó.
Confirma siempre con día, hora y que recibirán email de confirmación. Tras confirmar: "Si tienes cualquier duda antes, escríbenos por WhatsApp: https://wa.me/${NEGOCIO.whatsapp}"
NUNCA menciones "Cal.com", "plataforma" ni ningún software externo. Di siempre "nuestra agenda" o "aquí mismo".

INSTRUCCIONES:
- Si no sabes el precio exacto, da los rangos disponibles e invita a la consulta gratuita para presupuesto cerrado
- Nunca inventes información médica ni resultados garantizados
- Si hay urgencia médica, da el teléfono directo y el WhatsApp
- Si llevan 3 o más mensajes sin avanzar hacia una cita, ofrece la consulta gratuita de forma directa: "¿Quieres que te agendemos la valoración gratuita y sin compromiso?"
${NEGOCIO.instrucciones_extra}

FORMATO ESTRICTO:
- NUNCA uses markdown: sin asteriscos (*), sin ## títulos, sin guiones (-) para listas
- Para datos importantes usa MAYÚSCULAS (ej: GRATIS, SIN COMPROMISO, desde 200€)
- Puedes usar emojis cuando sea natural: ✨💉🌿📅✅😊
- Máximo 3-4 frases por respuesta. Sé directa y cálida, no extensa`

const tools = [
  {
    name: "get_available_slots",
    description: "Consulta huecos libres para cita. Úsala cuando el cliente quiera pedir cita.",
    input_schema: {
      type: "object",
      properties: {
        start_date: { type: "string", description: "Fecha inicio en YYYY-MM-DD" },
        end_date: { type: "string", description: "Fecha fin en YYYY-MM-DD (7 días después)" }
      },
      required: ["start_date", "end_date"]
    }
  },
  {
    name: "create_booking",
    description: "Crea la cita cuando el cliente confirmó tratamiento, hora, nombre y email.",
    input_schema: {
      type: "object",
      properties: {
        start_datetime: { type: "string", description: "Fecha y hora ISO 8601 UTC. España verano = UTC+2 (9:00 Madrid = 07:00Z)" },
        attendee_name: { type: "string", description: "Nombre del cliente" },
        attendee_email: { type: "string", description: "Email del cliente" },
        service: { type: "string", description: "Tratamiento que solicita el cliente" }
      },
      required: ["start_datetime", "attendee_name", "attendee_email", "service"]
    }
  }
]

async function getAvailableSlots(input, calApiKey, eventTypeId) {
  const url = `https://api.cal.com/v2/slots?eventTypeId=${eventTypeId}&start=${input.start_date}&end=${input.end_date}&timeZone=Europe/Madrid`
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${calApiKey}`, 'cal-api-version': '2024-09-04' }
  })
  const data = await res.json()
  if (!res.ok) return { error: 'No se pudieron obtener huecos' }
  const formatted = {}
  for (const [date, slots] of Object.entries(data.data)) {
    formatted[date] = slots.slice(0, 20).map(slot => ({
      time: new Date(slot.start).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }),
      iso: slot.start
    }))
  }
  return { available_slots: formatted }
}

async function createBooking(input, calApiKey, eventTypeId) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.attendee_email || '')) {
    return { error: 'Email no válido, pide al cliente que lo repita' }
  }
  const res = await fetch('https://api.cal.com/v2/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${calApiKey}`,
      'cal-api-version': '2024-08-13'
    },
    body: JSON.stringify({
      eventTypeId: parseInt(eventTypeId),
      start: input.start_datetime,
      attendee: { name: input.attendee_name, email: input.attendee_email, timeZone: 'Europe/Madrid', language: 'es' },
      metadata: { servicio: input.service || '' }
    })
  })
  const data = await res.json()
  if (!res.ok) return { error: 'No se pudo crear la cita', details: data }
  return { success: true, booking_id: data.data.uid, start: data.data.start, title: data.data.title }
}

async function checkRateLimit(kv, ip, sessionId) {
  if (!kv) return true
  const now = new Date()
  const hour = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}`
  const day = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`
  const [ipCount, sessionCount, globalCount] = await Promise.all([
    kv.get(`ip:${ip}:${hour}`).then(v => parseInt(v || '0')),
    kv.get(`session:${sessionId}:${hour}`).then(v => parseInt(v || '0')),
    kv.get(`global:${day}`).then(v => parseInt(v || '0'))
  ])
  if (ipCount >= 10 || sessionCount >= 10 || globalCount >= 300) return false
  await Promise.all([
    kv.put(`ip:${ip}:${hour}`, String(ipCount + 1), { expirationTtl: 3600 }),
    kv.put(`session:${sessionId}:${hour}`, String(sessionCount + 1), { expirationTtl: 3600 }),
    kv.put(`global:${day}`, String(globalCount + 1), { expirationTtl: 86400 })
  ])
  return true
}

export async function onRequestPost(context) {
  const { request, env } = context
  try {
    const { messages, sessionId } = await request.json()
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const allowed = await checkRateLimit(env.RATE_LIMIT_KV, ip, sessionId || 'anon')
    if (!allowed) {
      return Response.json(
        { reply: `Has alcanzado el límite de mensajes por ahora. Para seguir hablando, escríbenos por WhatsApp: https://wa.me/${NEGOCIO.whatsapp}` },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'messages array required' }, { status: 400 })
    }
    let currentMessages = [...messages]
    if (currentMessages.length > 12) currentMessages = currentMessages.slice(-12)
    const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Madrid' })
    const systemWithDate = SYSTEM_PROMPT + `\n\nFECHA ACTUAL: Hoy es ${today}. Úsala para calcular fechas relativas.`
    const MAX_TOOL_ROUNDS = 5
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: [{ type: "text", text: systemWithDate, cache_control: { type: "ephemeral" } }],
          messages: currentMessages,
          tools
        })
      })
      const data = await response.json()
      if (!response.ok) return Response.json({ error: data }, { status: 500 })
      if (data.stop_reason !== 'tool_use') {
        const textBlock = data.content.find(b => b.type === 'text')
        return Response.json(
          { reply: textBlock ? textBlock.text : 'Lo siento, hubo un problema.' },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        )
      }
      if (round === MAX_TOOL_ROUNDS) {
        return Response.json(
          { reply: `Estoy teniendo problemas para completar la reserva. Escríbenos directamente por WhatsApp: https://wa.me/${NEGOCIO.whatsapp} 💬` },
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        )
      }
      const toolUse = data.content.find(b => b.type === 'tool_use')
      let toolResult
      if (toolUse.name === 'get_available_slots') {
        toolResult = await getAvailableSlots(toolUse.input, env.CAL_API_KEY, env.CAL_EVENT_TYPE_ID)
      } else if (toolUse.name === 'create_booking') {
        toolResult = await createBooking(toolUse.input, env.CAL_API_KEY, env.CAL_EVENT_TYPE_ID)
      } else {
        toolResult = { error: 'Herramienta no encontrada' }
      }
      currentMessages.push({ role: 'assistant', content: data.content })
      currentMessages.push({
        role: 'user',
        content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: JSON.stringify(toolResult) }]
      })
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}



