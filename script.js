/* ═══════════════════════════════════════════════════════
   EL VIAJE DEL PILOTO EMOCIONAL — script.js
   GSAP + ScrollTrigger + Canvas Animations + Full Logic
═══════════════════════════════════════════════════════ */

/* ─── GSAP PLUGINS ─── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════ DATA ═══════════════ */
const EMOTION_ASSETS = {
  miedo: 'images/miedo.jpeg',
  tristeza: 'images/tristeza.jpeg',
  ira: 'images/furia.jpeg',
  enojo: 'images/furia.jpeg',
  alegria: 'images/Alegría.PNG',
  calma: 'images/tranquilidad.jpeg',
  frustracion: 'images/frustración.gif',
  entusiasmo: 'images/entusiasmo.jpeg'
};

const EMOTIONS = {
  miedo: {
    label: 'Miedo',
    intensity: 72,
    cause: 'Percepción de peligro o incertidumbre ante el futuro',
    body: 'Tensión en el pecho, latidos acelerados, músculos tensos',
    message: 'Tu sistema de protección se activó. El miedo indica que algo te importa. Úsalo para prepararte.',
    action: 'Convierte la alerta en preparación: nombra el riesgo, busca información y da un paso pequeño.',
    color: '#9b59b6'
  },
  tristeza: {
    label: 'Tristeza',
    intensity: 60,
    cause: 'Pérdida, decepción o sensación de desconexión',
    body: 'Peso en el pecho, ojos pesados, energía disminuida',
    message: 'La tristeza pide que pares y conectes contigo mismo. Puede ser una invitación a pedir apoyo.',
    action: 'Dale espacio sin aislarte: escribe lo que duele y compártelo con alguien seguro.',
    color: '#3498db'
  },
  ira: {
    label: 'Ira',
    intensity: 85,
    cause: 'Un límite fue cruzado o algo no fue justo',
    body: 'Calor en el rostro, mandíbula apretada, tensión muscular',
    message: 'Detectaste enojo. Puede indicar que un límite fue cruzado. Úsalo para defender lo que valoras.',
    action: 'Pausa antes de responder y transforma la fuerza en un límite claro.',
    color: '#e74c3c'
  },
  alegria: {
    label: 'Alegría',
    intensity: 90,
    cause: 'Logro, conexión o experiencia que se alinea con tus valores',
    body: 'Ligereza en el cuerpo, sonrisa natural, energía expansiva',
    message: 'La alegría es energía para compartir. Potencia lo que la generó y conéctate con otros.',
    action: 'Identifica qué la provocó y repite esa condición de forma intencional.',
    color: '#f7c948'
  },
  calma: {
    label: 'Calma',
    intensity: 55,
    cause: 'Sensación de seguridad, equilibrio y presencia plena',
    body: 'Respiración suave, cuerpo relajado, mente clara',
    message: 'La calma es tu estado de mayor claridad. Toma decisiones importantes desde aquí.',
    action: 'Aprovecha la claridad: decide, ordena prioridades y protege este ritmo.',
    color: '#4ecdc4'
  },
  frustracion: {
    label: 'Frustración',
    intensity: 78,
    cause: 'Esfuerzo sin resultados esperados o bloqueos repetidos',
    body: 'Tensión en los hombros, apretón de mandíbula, suspirar',
    message: 'La frustración indica que el método necesita ajuste, no que tú hayas fallado. Ajusta la estrategia.',
    action: 'Divide la meta en una prueba más pequeña y cambia el método, no tu valor personal.',
    color: '#ff6b35'
  },
  entusiasmo: {
    label: 'Entusiasmo',
    intensity: 95,
    cause: 'Visión de posibilidad, novedad o meta significativa',
    body: 'Energía alta, hablar rápido, ideas que fluyen',
    message: 'El entusiasmo es combustible puro. Canalízalo hacia acciones concretas antes de que se disperse.',
    action: 'Aterriza la energía: escribe la primera acción y ejecútala antes de abrir otra idea.',
    color: '#00d4ff'
  }
};

const TIMON_DATA = {
  enojo: {
    label: 'Enojo',
    routes: [
      { arrow: '→ RUTA A', action: 'Defender un límite que fue cruzado de forma clara y asertiva', result: 'El enojo se convierte en fortaleza y autorespeto.' },
      { arrow: '→ RUTA B', action: 'Expresar cómo te afectó la situación usando lenguaje en primera persona', result: 'La comunicación asertiva reemplaza la agresión.' },
      { arrow: '→ RUTA C', action: 'Hacer pausa, respirar y luego responder desde la calma', result: 'Recuperas el control antes de actuar.' }
    ]
  },
  miedo: {
    label: 'Miedo',
    routes: [
      { arrow: '→ RUTA A', action: 'Prepararte con anticipación: planificar, estudiar, entrenar', result: 'El miedo se transforma en acción preventiva.' },
      { arrow: '→ RUTA B', action: 'Identificar exactamente qué temes y cuestionar si es real o imaginado', result: 'La claridad disuelve el miedo difuso.' },
      { arrow: '→ RUTA C', action: 'Buscar apoyo o mentores que ya superaron ese miedo', result: 'No tienes que recorrer el camino solo.' }
    ]
  },
  tristeza: {
    label: 'Tristeza',
    routes: [
      { arrow: '→ RUTA A', action: 'Pedir apoyo a alguien de confianza sin minimizar lo que sientes', result: 'La tristeza compartida pierde peso.' },
      { arrow: '→ RUTA B', action: 'Darte espacio para sentir sin juzgarte: la tristeza tiene derecho a existir', result: 'La aceptación acelera la recuperación.' },
      { arrow: '→ RUTA C', action: 'Escribir lo que sientes para darle forma y comprenderlo mejor', result: 'La escritura convierte el dolor en comprensión.' }
    ]
  },
  alegria: {
    label: 'Alegría',
    routes: [
      { arrow: '→ RUTA A', action: 'Compartir lo que te alegra con personas cercanas', result: 'La alegría compartida se multiplica.' },
      { arrow: '→ RUTA B', action: 'Usarla como energía para emprender o crear algo nuevo', result: 'La alegría alimenta la creatividad y la iniciativa.' },
      { arrow: '→ RUTA C', action: 'Reconocer qué la generó y repetir esas condiciones', result: 'Diseñas más momentos de bienestar intencionalmente.' }
    ]
  },
  frustracion: {
    label: 'Frustración',
    routes: [
      { arrow: '→ RUTA A', action: 'Ajustar la estrategia: no cambies la meta, cambia el método', result: 'La frustración se convierte en innovación y adaptación.' },
      { arrow: '→ RUTA B', action: 'Hacer una pausa activa: descansar para ver el problema con nuevos ojos', result: 'El descanso estratégico recupera perspectiva.' },
      { arrow: '→ RUTA C', action: 'Dividir la meta en pasos más pequeños y celebrar cada avance', result: 'Los micrologros sostienen la motivación.' }
    ]
  }
};

Object.entries({
  enojo: [
    { arrow: '→ RUTA D', action: 'Convertir la queja en una petición concreta: qué necesitas y para cuándo.', result: 'La energía deja de atacar y empieza a resolver.' },
    { arrow: '→ RUTA E', action: 'Mover el cuerpo durante veinte segundos antes de hablar: manos, cuello y respiración.', result: 'Baja la carga física y aumenta la claridad.' }
  ],
  miedo: [
    { arrow: '→ RUTA D', action: 'Ensayar el primer paso en pequeño antes de enfrentarlo completo.', result: 'La confianza aparece por práctica, no por magia.' },
    { arrow: '→ RUTA E', action: 'Nombrar el peor escenario y escribir una respuesta posible.', result: 'El miedo baja cuando tu mente ve una salida.' }
  ],
  tristeza: [
    { arrow: '→ RUTA D', action: 'Hacer una acción suave de cuidado: tomar agua, caminar lento o descansar.', result: 'El cuerpo recibe seguridad mientras la emoción pasa.' },
    { arrow: '→ RUTA E', action: 'Recordar una conexión real: un mensaje corto, un saludo o pedir compañía.', result: 'La tristeza no tiene que convertirse en aislamiento.' }
  ],
  alegria: [
    { arrow: '→ RUTA D', action: 'Agradecer a alguien que participó en ese momento positivo.', result: 'La alegría fortalece vínculos cuando se reconoce.' },
    { arrow: '→ RUTA E', action: 'Guardar esa energía en una acción concreta de hoy.', result: 'La emoción no se dispersa: se convierte en avance.' }
  ],
  frustracion: [
    { arrow: '→ RUTA D', action: 'Preguntar: qué parte sí funciona y qué parte debo cambiar.', result: 'Dejas de pelear con todo el problema a la vez.' },
    { arrow: '→ RUTA E', action: 'Pedir retroalimentación específica, no solo ánimo general.', result: 'El apoyo externo se vuelve útil y accionable.' }
  ]
}).forEach(([emotion, routes]) => TIMON_DATA[emotion].routes.push(...routes));

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué harías aunque nadie lo notara ni te lo reconociera?',
    opts: [
      { text: 'Crear algo: arte, música, escritura, diseño', type: 'creativo' },
      { text: 'Superar un desafío personal o batir mis propios récords', type: 'superacion' },
      { text: 'Ayudar o acompañar a alguien que lo necesita', type: 'ayuda' },
      { text: 'Aprender algo completamente nuevo', type: 'aprendizaje' },
      { text: 'Explorar lugares o experiencias sin restricciones', type: 'libertad' }
    ]
  },
  {
    q: '¿Qué actividad te hace perder la noción del tiempo por completo?',
    opts: [
      { text: 'Proyectos creativos donde expreso mi visión', type: 'creativo' },
      { text: 'Entrenar, practicar o mejorar una habilidad', type: 'superacion' },
      { text: 'Conversaciones profundas o escuchar a otros', type: 'ayuda' },
      { text: 'Investigar, leer o explorar ideas complejas', type: 'aprendizaje' },
      { text: 'Viajar, experimentar o improvisar sin planes', type: 'libertad' }
    ]
  },
  {
    q: '¿Qué meta te parece genuinamente tuya, no impuesta por otros?',
    opts: [
      { text: 'Dejar algo creado que tenga mi sello único', type: 'creativo' },
      { text: 'Convertirme en la mejor versión de mí mismo', type: 'superacion' },
      { text: 'Hacer una diferencia real en la vida de alguien', type: 'ayuda' },
      { text: 'Entender cómo funciona el mundo a un nivel profundo', type: 'aprendizaje' },
      { text: 'Vivir según mis propias reglas sin ataduras innecesarias', type: 'libertad' }
    ]
  },
  {
    q: '¿Qué te hace sentir que estás creciendo de verdad?',
    opts: [
      { text: 'Cuando termino algo que no existía antes y es mío', type: 'creativo' },
      { text: 'Cuando supero mis propios límites anteriores', type: 'superacion' },
      { text: 'Cuando alguien me dice que lo que hice importó', type: 'ayuda' },
      { text: 'Cuando comprendo algo que antes me resultaba misterioso', type: 'aprendizaje' },
      { text: 'Cuando tomo mis propias decisiones sin miedo', type: 'libertad' }
    ]
  }
];

const MOTOR_TYPES = {
  creativo:    { name: 'MOTOR CREATIVO', icon: '🎨', desc: 'Tu energía nace de la expresión original. Necesitas crear, imaginar y dejar huella. Cuando te permites crear libremente, tu rendimiento y bienestar se disparan.' },
  superacion:  { name: 'MOTOR DE SUPERACIÓN', icon: '🏋️', desc: 'Te impulsa superar tus propios límites. Los retos son tu combustible. Cada obstáculo es una oportunidad de descubrir más sobre ti mismo.' },
  ayuda:       { name: 'MOTOR DE AYUDA', icon: '🤝', desc: 'Encontrar sentido en el impacto que tienes sobre otros. Tu energía fluye cuando contribuyes al bienestar de quienes te rodean.' },
  aprendizaje: { name: 'MOTOR DE APRENDIZAJE', icon: '🔬', desc: 'La comprensión profunda es tu combustible. Necesitas entender el "por qué" de las cosas. Tu mente se activa ante lo desconocido.' },
  libertad:    { name: 'MOTOR DE LIBERTAD', icon: '🌅', desc: 'La autonomía y la aventura te impulsan. Necesitas espacio para decidir tu propio camino. Las restricciones te agotan; la exploración te libera.' }
};

/* ─────────────────────────────────────────────────────────────────
   RETO_BANK — Grupo de 4 personas · Exposición de 15 min en total
   Cada emoción tiene 4 retos (uno por integrante).
   Diseñados para que los compañeros ayuden a tratar la emoción.
───────────────────────────────────────────────────────────────── */
const RETO_BANK = {

  /* ── RETOS GENERALES (sin emoción específica detectada) ── */
  base: [
    {
      tag: 'Persona 1 · Radar',
      title: 'Dime cómo llegas hoy',
      text: 'Di una sola palabra que describa cómo llegas hoy. Los otros tres escuchan en silencio y cuando terminas responden al unísono: "te escuchamos". Nadie comenta ni da consejos.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Apoyo',
      title: 'Algo real que reconozco en ti',
      text: 'Dile a la persona de tu izquierda algo concreto y positivo que hayas notado de ella hoy: su actitud, esfuerzo o presencia. Esa persona solo responde: "gracias, lo recibo." Sin modestia excesiva.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Cuerpo',
      title: 'Semáforo corporal grupal',
      text: 'Todos muestran con la mano su color emocional ahora: verde = bien, amarillo = regular, rojo = difícil. La Persona 3 lee el panorama del grupo en voz alta y propone una micro-acción de apoyo para quien esté en rojo.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 4 · Cierre',
      title: 'Una acción de apoyo para hoy',
      text: 'Cada integrante dice en una frase qué acción pequeña puede hacer hoy para apoyar a alguien del grupo o de su entorno. La Persona 4 recoge las cuatro respuestas y las resume con una sola idea.',
      time: '2 min'
    }
  ],

  /* ── MIEDO ── */
  miedo: [
    {
      tag: 'Persona 1 · Nombrar',
      title: 'Le pongo nombre a mi miedo',
      text: 'La Persona 1 nombra en voz alta un miedo pequeño y real. Las otras tres escuchan sin interrumpir. Al terminar, el grupo solo dice: "ese miedo tiene sentido, gracias por decirlo." Sin consejos todavía.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Pregunta útil',
      title: '¿Qué sí puedes controlar?',
      text: 'La Persona 2 le pregunta a quien nombró el miedo: "De todo eso, ¿qué es lo más pequeño que sí puedes controlar ahora mismo?" Escucha la respuesta sin agregarle más. Esa persona decide si quiere responder.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Cualidad valiente',
      title: 'Veo en ti una fuerza',
      text: 'La Persona 3 le dice a la Persona 1: "Una cualidad tuya que te ayudaría a enfrentar ese miedo es…" Debe ser algo observado de verdad, no inventado. La Persona 1 lo recibe sin negarlo.',
      time: '1 min'
    },
    {
      tag: 'Persona 4 · Impulso',
      title: 'Primer paso juntos',
      text: 'La Persona 4 propone un primer paso de 10 segundos que la Persona 1 podría hacer hoy aunque tenga miedo. El grupo cuenta 3, 2, 1 y la Persona 1 dice en voz alta: "lo voy a intentar."',
      time: '1 min'
    }
  ],

  /* ── ENOJO / IRA ── */
  enojo: [
    {
      tag: 'Persona 1 · Sentir',
      title: 'Digo lo que me molesta sin atacar',
      text: 'La Persona 1 completa esta frase frente al grupo: "Me sentí… cuando… y lo que necesito es…" Sin atacar a nadie. Solo describe la emoción y la necesidad. El grupo escucha sin responder todavía.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Escucha activa',
      title: 'Te escucho y te lo devuelvo',
      text: 'La Persona 2 repite lo que escuchó de la Persona 1, bajando el tono: "Entiendo que sentiste… y necesitas…" La Persona 1 confirma si fue bien comprendida. No se agrega opinión, solo eco empático.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Cuerpo y pausa',
      title: 'Soltar para responder mejor',
      text: 'Todos aprietan los puños 5 segundos pensando en algo que les molesta. Al soltar, la Persona 3 dice en voz alta una petición concreta que reemplaza la queja original de la Persona 1. El grupo valida si suena más respetuosa.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 4 · Límite sano',
      title: 'Mi límite en una frase',
      text: 'La Persona 4 modela frente al grupo cómo poner un límite con calma: "Me ayuda cuando… Me incomoda cuando…" Luego invita a la Persona 1 a repetir su propia versión con ese formato. El grupo agradece la claridad.',
      time: '1–2 min'
    }
  ],

  /* ── TRISTEZA ── */
  tristeza: [
    {
      tag: 'Persona 1 · Presencia',
      title: 'No tienes que estar bien todavía',
      text: 'La Persona 1 dice una sola cosa que le pesa hoy, sin explicar demasiado. Las otras tres personas responden en silencio acercando levemente la silla o dando una señal física de presencia. Nadie habla por 10 segundos.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Compañía sin solución',
      title: 'Te escucho sin arreglarte',
      text: 'La Persona 2 le dice a la Persona 1: "¿Qué necesitas ahora: que te escuche, que guardemos silencio contigo, o que te recuerde algo bueno?" La Persona 1 elige y el grupo responde exactamente eso, sin añadir más.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Frase de bolsillo',
      title: 'Una frase para cuando regrese',
      text: 'La Persona 3 le dice a la Persona 1 una frase corta y auténtica para recordar cuando vuelva a sentirse así. La Persona 1 la repite en voz baja una vez. El grupo valida que sea realista y no forzada.',
      time: '1 min'
    },
    {
      tag: 'Persona 4 · Red de apoyo',
      title: 'Con quién puedes hablar',
      text: 'La Persona 4 le pregunta a la Persona 1: "¿Hay alguien fuera de este grupo con quien te sentirías seguro/a hablando si esto regresa?" La Persona 1 nombra a esa persona. El grupo confirma que pedir ayuda es fortaleza.',
      time: '1–2 min'
    }
  ],

  /* ── ALEGRÍA ── */
  alegria: [
    {
      tag: 'Persona 1 · Compartir',
      title: 'Algo bueno que me pasó',
      text: 'La Persona 1 comparte en 20 segundos algo bueno que le ocurrió recientemente, por pequeño que sea. El resto escucha con atención completa. Al terminar, cada uno hace un gesto discreto de celebración (aplauso suave, pulgar arriba, sonrisa).',
      time: '1 min'
    },
    {
      tag: 'Persona 2 · Repetir la condición',
      title: '¿Cómo puedes volver a sentirlo?',
      text: 'La Persona 2 le pregunta a la Persona 1: "¿Qué hizo posible ese momento positivo?" y luego: "¿Qué podrías hacer esta semana para repetir esa condición?" La Persona 1 encuentra una acción concreta.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Gratitud específica',
      title: 'Gracias por algo concreto',
      text: 'La Persona 3 le agradece a alguien del grupo algo específico que haya hecho o dicho hoy: su escucha, su presencia, su energía o su actitud. Debe ser real y concreto, no genérico. La otra persona lo recibe.',
      time: '1 min'
    },
    {
      tag: 'Persona 4 · Energía a una meta',
      title: 'Convierto esta alegría en acción',
      text: 'La Persona 4 completa la frase: "Estoy contento/a por… entonces hoy puedo avanzar en…" El grupo propone una forma pequeña de mantener esa energía activa durante el día sin que se disperse.',
      time: '1–2 min'
    }
  ],

  /* ── FRUSTRACIÓN ── */
  frustracion: [
    {
      tag: 'Persona 1 · Nombrar el bloqueo',
      title: 'Algo que no me está saliendo',
      text: 'La Persona 1 describe en una frase algo que lleva tiempo intentando y no le sale. No busca que la resuelvan, solo que la escuchen. El grupo solo responde: "entendemos, estamos aquí." Sin soluciones todavía.',
      time: '1 min'
    },
    {
      tag: 'Persona 2 · Cambiar el método',
      title: 'No cambies la meta, cambia el método',
      text: 'La Persona 2 propone una forma diferente de intentar lo que la Persona 1 nombró. No una queja distinta: una estrategia concreta y distinta. La Persona 1 decide si resuena o no. El grupo puede agregar una sola idea más.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Fortaleza que ya tienes',
      title: 'No eres tu error',
      text: 'La Persona 3 le dice a la Persona 1 una fortaleza real que ya tiene y que podría ayudarla a volver a intentarlo. Empieza así: "Algo que veo en ti y que te sirve para esto es…" La Persona 1 lo escucha sin negarlo.',
      time: '1 min'
    },
    {
      tag: 'Persona 4 · Micro-paso',
      title: 'El paso más pequeño posible',
      text: 'La Persona 4 ayuda a la Persona 1 a dividir su meta bloqueada en el paso más pequeño imaginable: algo que dure menos de 2 minutos. El grupo verifica que sea realmente pequeño. La Persona 1 dice cuándo lo haría.',
      time: '1–2 min'
    }
  ],

  /* ── CALMA ── */
  calma: [
    {
      tag: 'Persona 1 · Anclar',
      title: 'Qué me da este estado de calma',
      text: 'La Persona 1 describe en una frase qué condiciones le permitieron llegar con calma hoy: descanso, preparación, claridad, conexión. El grupo escucha y cada uno identifica en silencio si comparte alguna de esas condiciones.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Compartir la calma',
      title: 'Pásame un poco de esa energía',
      text: 'La Persona 2 le pide a la Persona 1 un consejo concreto para llegar con más calma a situaciones difíciles. La Persona 1 responde solo desde su experiencia real, no desde el deber ser.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Decisión desde la calma',
      title: 'Esto lo decido ahora',
      text: 'La Persona 3 invita a todo el grupo a pensar: "¿Qué decisión o conversación difícil sería mejor tener desde este estado de calma?" Cada uno lo piensa 20 segundos y comparte si quiere.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 4 · Proteger el ritmo',
      title: 'Cómo cuido este estado',
      text: 'La Persona 4 le pregunta a la Persona 1: "¿Qué protegerías para no perder esta calma durante el resto del día?" La Persona 1 nombra una acción concreta. El grupo propone una más que también podría ayudar.',
      time: '1–2 min'
    }
  ],

  /* ── ENTUSIASMO ── */
  entusiasmo: [
    {
      tag: 'Persona 1 · Aterrizar',
      title: 'Mi idea más concreta ahora mismo',
      text: 'La Persona 1 tiene 30 segundos para decir la idea más concreta que tiene en este momento, la que más energía le genera. Las otras tres escuchan sin interrumpir. Al terminar, preguntan: "¿cuál es el primer paso físico?"',
      time: '1–2 min'
    },
    {
      tag: 'Persona 2 · Priorizar',
      title: 'Una sola, bien hecha',
      text: 'La Persona 2 ayuda a la Persona 1 a elegir una sola acción de todas las que mencionó: la más importante, no la más emocionante. El grupo puede votar si hay duda.',
      time: '1–2 min'
    },
    {
      tag: 'Persona 3 · Contagio positivo',
      title: 'Tu entusiasmo inspira',
      text: 'La Persona 3 le dice a la Persona 1 cómo su energía ha influido en el grupo hoy: algo concreto que notó. Luego cada integrante comparte en 10 segundos qué les generó ese entusiasmo.',
      time: '1 min'
    },
    {
      tag: 'Persona 4 · Ancla de acción',
      title: '¿Cuándo exactamente lo harás?',
      text: 'La Persona 4 pregunta a la Persona 1: "¿Cuándo exactamente ejecutarás ese primer paso: hoy, mañana, esta semana?" La Persona 1 dice la hora o el día. El grupo lo escucha como testigo.',
      time: '1 min'
    }
  ]
};

const TRIP_SCENARIOS = [
  {
    char: `<img class="scenario-img" src="${EMOTION_ASSETS.frustracion}" alt="Frustración" />`, charName: 'ALEX — COMPAÑERO/A',
    situation: 'Alex trabajó mucho en una entrega grupal, pero en la presentación final otra persona se llevó el crédito. Ahora quiere mandar un mensaje agresivo al grupo.',
    speech: '"Me cansé. Voy a decirles que son unos aprovechados y que no vuelvo a trabajar con nadie. Que se arreglen solos."',
    q: '¿Cómo respondes?',
    opts: [
      { text: 'Le das la razón total y le ayudas a escribir el mensaje fuerte.', skills: [] },
      { text: 'Validas su enojo, pero le propones redactar un mensaje firme con hechos concretos.', skills: ['empatia', 'asertividad'] },
      { text: 'Le dices que se calme porque no vale la pena hacer drama.', skills: [] },
      { text: 'Le ayudas a separar emoción, hechos y petición antes de responder al grupo.', skills: ['empatia', 'escucha', 'asertividad'] }
    ]
  },
  {
    char: `<img class="scenario-img" src="${EMOTION_ASSETS.tristeza}" alt="Tristeza" />`, charName: 'MARINA — AMIGA CERCANA',
    situation: 'Marina te confiesa que últimamente finge estar bien para no preocupar a nadie. Ha dejado de responder mensajes y se siente una carga.',
    speech: '"No quiero molestar. Siento que si cuento lo que me pasa, todos se van a cansar de mí."',
    q: '¿Qué le respondes?',
    opts: [
      { text: 'Le dices que no exagere y que todos tienen problemas.', skills: [] },
      { text: 'Le preguntas qué necesita esta noche y te quedas escuchando sin llenar el silencio.', skills: ['empatia', 'escucha'] },
      { text: 'Le prometes resolverle todo para que se sienta mejor rápido.', skills: ['empatia'] },
      { text: 'La acompañas a pensar en una persona adulta/profesional segura si esto se repite.', skills: ['empatia', 'cooperacion', 'respeto'] }
    ]
  },
  {
    char: `<img class="scenario-img" src="${EMOTION_ASSETS.ira}" alt="Ira" />`, charName: 'CARLOS — JEFE O LÍDER',
    situation: 'Carlos corrige tu trabajo frente a todos, pero mezcla una observación válida con un comentario humillante. El equipo queda en silencio.',
    speech: '"Esto está flojo. No sé si fue falta de atención o si simplemente no estás al nivel."',
    q: '¿Cómo reaccionas?',
    opts: [
      { text: 'Respondes con otro ataque para no quedar débil.', skills: [] },
      { text: 'Dices: “Puedo revisar lo técnico, pero prefiero que evitemos comentarios personales”.', skills: ['asertividad', 'respeto'] },
      { text: 'Te quedas callado/a y luego lo comentas con todo el equipo menos con él.', skills: [] },
      { text: 'Pides ejemplos concretos, propones una revisión y marcas el límite del trato.', skills: ['escucha', 'asertividad', 'cooperacion', 'respeto'] }
    ]
  },
  {
    char: `<img class="scenario-img" src="${EMOTION_ASSETS.calma}" alt="Calma" />`, charName: 'SAM — PERSONA JOVEN',
    situation: 'Sam cometió un error que afectó a varias personas y ahora intenta negarlo por vergüenza. Tú sabes que si lo oculta, el problema crecerá.',
    speech: '"Si digo que fui yo, todos van a pensar que soy inútil. Mejor dejemos que pase."',
    q: '¿Qué haces?',
    opts: [
      { text: 'Lo cubres para que no pase vergüenza.', skills: ['empatia'] },
      { text: 'Lo presionas frente a todos para que confiese rápido.', skills: [] },
      { text: 'Le explicas que asumirlo puede reparar daño y le ayudas a preparar cómo decirlo.', skills: ['empatia', 'asertividad', 'cooperacion'] },
      { text: 'Buscas un espacio privado, reconoces su miedo y acuerdan una reparación concreta.', skills: ['empatia', 'respeto', 'cooperacion'] }
    ]
  }
];

const ALL_SKILLS = ['empatia', 'escucha', 'asertividad', 'respeto', 'cooperacion'];
const SKILL_LABELS = {
  empatia: 'EMPATÍA', escucha: 'ESCUCHA ACTIVA',
  asertividad: 'ASERTIVIDAD', respeto: 'RESPETO',
  cooperacion: 'COOPERACIÓN'
};

const MISSION_SECTIONS = {
  sectionIntro: { stage: '00 Inicio', topic: 'Inteligencia intrapersonal' },
  sectionRadar: { stage: '01 Reconocer', topic: 'Emociones' },
  sectionTimon: { stage: '02 Regular', topic: 'Encauzar emociones' },
  sectionMotor: { stage: '03 Impulsar', topic: 'Motivación intrínseca' },
  sectionTrip: { stage: '04 Conectar', topic: 'Inteligencia interpersonal' },
  sectionApoyo: { stage: '05 Apoyo', topic: 'Empoderamiento externo' },
  sectionMision: { stage: '06 Integrar', topic: 'Cargas positivas/negativas' },
  sectionRetos: { stage: '07 Escena', topic: 'Inteligencia interpersonal aplicada' }
};

const PILOT_LOG = {
  sectionIntro: {
    quote: 'Antes de despegar, mira hacia adentro: ahí empieza la navegación.',
    signal: 'Señal: autoconciencia',
    step: 0
  },
  sectionRadar: {
    quote: 'Una emoción no es un enemigo: es una señal esperando ser leída.',
    signal: 'Habilidad: reconocer emociones',
    step: 1
  },
  sectionTimon: {
    quote: 'Encauzar no es apagar lo que sientes; es darle una dirección segura.',
    signal: 'Habilidad: regular y dirigir',
    step: 2
  },
  sectionMotor: {
    quote: 'La motivación más fuerte aparece cuando recuerdas por qué vale la pena.',
    signal: 'Habilidad: motivación intrínseca',
    step: 3
  },
  sectionTrip: {
    quote: 'La empatía empieza cuando dejas de preparar tu defensa y empiezas a escuchar.',
    signal: 'Habilidad: inteligencia interpersonal',
    step: 4
  },
  sectionApoyo: {
    quote: 'Pedir apoyo no te resta poder: te recuerda que no navegas solo.',
    signal: 'Habilidad: empoderamiento externo',
    step: 5
  },
  sectionMision: {
    quote: 'Las cargas negativas pesan menos cuando las nombras y eliges qué hacer con ellas.',
    signal: 'Habilidad: integrar decisiones',
    step: 6
  },
  sectionRetos: {
    quote: 'Actuar una emoción ayuda a verla desde afuera y entenderla mejor por dentro.',
    signal: 'Habilidad: aplicar en grupo',
    step: 7
  }
};

const SYSTEM_BRIEFS = {
  sectionRadar: {
    label: 'Lectura del sistema',
    text: 'Este módulo convierte lo que sientes en una señal visible: nombrar la emoción es el primer paso para no actuar en automático.'
  },
  sectionTimon: {
    label: 'Ruta de regulación',
    text: 'Aquí la emoción no se cancela: se dirige. Cada opción muestra una forma concreta de responder con más intención.'
  },
  sectionMotor: {
    label: 'Fuente de impulso',
    text: 'Este sistema explora qué te mueve desde adentro, porque la motivación más estable nace del propósito y no solo de la presión externa.'
  },
  sectionTrip: {
    label: 'Prueba interpersonal',
    text: 'La tripulación pone en juego empatía, escucha y respeto: avanzar depende de activar habilidades reales, no solo de elegir rápido.'
  },
  sectionApoyo: {
    label: 'Red de soporte',
    text: 'El apoyo externo es parte del empoderamiento: reconocer a quién acudir también es una forma de cuidar tu navegación emocional.'
  },
  sectionMision: {
    label: 'Integración del viaje',
    text: 'Esta misión une todos los temas: emoción, necesidad, encauzamiento, motivación, relación con otros y apoyo.'
  },
  sectionRetos: {
    label: 'Aplicación en escena',
    text: 'La rueda lleva el aprendizaje al cuerpo: representar una situación ayuda a entender reacciones, empatía y decisiones en grupo.'
  }
};

/* ═══════════════ STATE ═══════════════ */
const state = {
  activeEmotion: null,
  activeTimon: 'enojo',
  selectedTimonRoute: null,
  quizAnswers: [],
  currentQuizQ: 0,
  quizDone: false,
  motorType: null,
  currentScenario: 0,
  unlockedSkills: new Set(),
  scenarioPassed: new Set(),
  tripCompletionShown: false,
  apoyoFlipped: [],
  apoyoLocked: false,
  apoyoMatched: new Set(),
  connectedStations: new Set(),
  misionAnswers: {},
  misionStep: 0,
  retoFocus: 'auto',
  retoShuffle: 0
};

/* ═══════════════ STARS CANVAS ═══════════════ */
(function initStars() {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005
    }));
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 1;
    stars.forEach(s => {
      const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,230,255,${a})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ═══════════════ RADAR CANVAS ═══════════════ */
(function initRadar() {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 320, H = 320, CX = W / 2, CY = H / 2, R = 130;
  let sweep = 0;

  function drawRadar() {
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#020b18';
    ctx.beginPath();
    ctx.arc(CX, CY, R + 2, 0, Math.PI * 2);
    ctx.fill();

    // Concentric rings
    [0.25, 0.5, 0.75, 1].forEach(f => {
      ctx.beginPath();
      ctx.arc(CX, CY, R * f, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${0.1 + f * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Crosshair lines
    ctx.strokeStyle = 'rgba(0,212,255,0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(CX + Math.cos(a) * R, CY + Math.sin(a) * R);
      ctx.stroke();
    }

    // Sweep gradient
    const sweepGrad = ctx.createConicalGradient
      ? null
      : null;

    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(sweep);
    const grad = ctx.createLinearGradient(0, 0, R, 0);
    grad.addColorStop(0, 'rgba(0,212,255,0.55)');
    grad.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, -0.5, 0.5);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Clip to circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.restore();

    sweep += 0.025;
    requestAnimationFrame(drawRadar);
  }
  drawRadar();
})();

/* ═══════════════ NAV PROGRESS ═══════════════ */
function updateNavProgress() {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = Math.min(100, (scrolled / total) * 100);
  const rounded = Math.round(pct);
  document.getElementById('navProgressFill').style.width = pct + '%';
  document.getElementById('missionPercent').textContent = `${rounded}%`;
}
window.addEventListener('scroll', updateNavProgress);

/* ═══════════════ COUNTER ANIMATION ═══════════════ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  let current = 0;
  const inc = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

/* ═══════════════ GSAP SCROLL ANIMATIONS ═══════════════ */
function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
  });

  // Intro animations
  gsap.timeline()
    .from('.intro-badge', { y: -20, opacity: 0, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' })
    .from('.line1', { x: -60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.line2', { x: -80, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .from('.line3', { x: -60, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('.intro-question-wrap', { y: 30, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
    .from('.panel-stat', { y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.3')
    .from('.btn-launch', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2')
    .from('.intro-scroll-hint', { opacity: 0, duration: 0.5 }, '-=0.1');

  // Counter on scroll
  document.querySelectorAll('.panel-stat-value').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => animateCounter(el)
    });
  });

  // Radar section
  ScrollTrigger.create({
    trigger: '#sectionRadar',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.radar-screen',
        { scale: 0.7, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'transform,opacity,visibility' }
      );
      gsap.fromTo('.emotion-btn',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.06,
          duration: 0.5,
          delay: 0.3,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility'
        }
      );
    }
  });

  // Timon section
  ScrollTrigger.create({
    trigger: '#sectionTimon',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.timon-emo',
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
      );
    }
  });

  // Motor section
  ScrollTrigger.create({
    trigger: '#sectionMotor',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.motor-quiz',
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }
      );
    }
  });

  // Apoyo network
  ScrollTrigger.create({
    trigger: '#sectionApoyo',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.memory-card',
        { scale: 0.8, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, stagger: 0.025, duration: 0.35, ease: 'back.out(1.4)', clearProps: 'transform,opacity,visibility' }
      );
    }
  });

  // Mission steps
  ScrollTrigger.create({
    trigger: '#sectionMision',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.ms-step',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
      );
    }
  });

  ScrollTrigger.create({
    trigger: '#sectionRetos',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.roulette-console, .scene-board, .role-pill',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.55, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
      );
    }
  });

  // Parallax on hero
  gsap.to('.intro-cockpit', {
    scrollTrigger: {
      trigger: '#sectionIntro',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -80,
    ease: 'none'
  });
}

/* ═══════════════ SECTION 1: RADAR EMOCIONAL ═══════════════ */
function initRadarSection() {
  gsap.set('.emotion-grid, .emotion-btn', { autoAlpha: 1, clearProps: 'opacity,visibility' });

  document.querySelectorAll('.emotion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const emo = btn.getAttribute('data-emotion');
      selectEmotion(emo);
    });
  });

  document.querySelectorAll('.radar-emotion-dot').forEach(dot => {
    dot.addEventListener('click', () => selectEmotion(dot.getAttribute('data-emotion')));
  });

  window.setTimeout(() => {
    gsap.set('.emotion-grid, .emotion-btn', { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' });
  }, 900);
}

function selectEmotion(emo) {
  state.activeEmotion = emo;
  const data = EMOTIONS[emo];

  // Update buttons
  document.querySelectorAll('.emotion-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-emotion') === emo));

  // Update radar dots
  document.querySelectorAll('.radar-emotion-dot').forEach(d => d.classList.toggle('active', d.getAttribute('data-emotion') === emo));

  // Update panel
  const placeholder = document.querySelector('.edp-placeholder');
  const content = document.getElementById('edpContent');
  placeholder.style.display = 'none';
  content.style.display = 'flex';

  document.getElementById('edpBarVal').textContent = data.intensity + '%';
  document.getElementById('edpBody').textContent = data.body;
  document.getElementById('edpCause').textContent = data.cause;
  document.getElementById('edpMessage').textContent = data.message;
  document.getElementById('emotionPortrait').src = EMOTION_ASSETS[emo];
  document.getElementById('emotionPortrait').alt = data.label;
  document.getElementById('emotionPortrait').className = `emotion-crop emotion-crop-${emo}`;
  document.getElementById('radarEchoImg').src = EMOTION_ASSETS[emo];
  document.getElementById('radarEchoImg').alt = `Eco de ${data.label}`;
  document.getElementById('radarEchoImg').className = `emotion-crop emotion-crop-${emo}`;
  document.getElementById('emotionBriefTitle').textContent = data.label;
  document.getElementById('emotionBriefText').textContent = data.action;

  // Animate bar
  gsap.fromTo('#edpBar', { width: '0%' }, { width: data.intensity + '%', duration: 0.8, ease: 'power3.out' });

  gsap.from(content, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' });
  gsap.fromTo('#emotionBrief',
    { y: 14, autoAlpha: 0.65 },
    { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' }
  );
  const cropScale = ['tristeza', 'frustracion'].includes(emo) ? 1.12 : 1;
  gsap.fromTo('#emotionPortrait', { scale: 0.82, rotation: -4 }, { scale: cropScale, rotation: 0, duration: 0.55, ease: 'back.out(1.5)' });
  pulseElement('.radar-screen', data.color);
  flashRadarEcho(data.color);
  gsap.fromTo('.radar-emotion-dot.active', { scale: 0.6 }, { scale: 1.35, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });

  // Update nav status
  document.getElementById('statusText').textContent = `EMOCIÓN: ${data.label.toUpperCase()}`;
}

/* ═══════════════ SECTION 3: TIMÓN EMOCIONAL ═══════════════ */
function flashRadarEcho(color) {
  const echo = document.getElementById('radarEcho');
  if (!echo) return;
  gsap.killTweensOf(echo);
  gsap.fromTo(echo,
    { autoAlpha: 0, scale: 0.55, filter: `drop-shadow(0 0 0 ${color})` },
    {
      autoAlpha: 0.9,
      scale: 1.08,
      filter: `drop-shadow(0 0 28px ${color})`,
      duration: 0.45,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      repeatDelay: 0.18
    }
  );
}

function initTimonSection() {
  gsap.set('.timon-emo, .timon-routes', { autoAlpha: 1, clearProps: 'transform,opacity,visibility' });

  document.querySelectorAll('.timon-emo').forEach(el => {
    el.addEventListener('click', () => {
      const emo = el.getAttribute('data-timon');
      state.activeTimon = emo;
      document.querySelectorAll('.timon-emo').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      renderTimonRoutes();
    });
  });
  renderTimonRoutes();
}

function renderTimonRoutes() {
  const container = document.getElementById('timonRoutes');
  const data = TIMON_DATA[state.activeTimon];
  container.innerHTML = '';

  data.routes.forEach((route, i) => {
    const div = document.createElement('div');
    div.className = 'timon-route';
    div.innerHTML = `<div class="tr-arrow">${route.arrow}</div><div class="tr-action">${route.action}</div>`;
    div.addEventListener('click', () => selectTimonRoute(route, div));
    container.appendChild(div);

    gsap.fromTo(div,
      { x: 40, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.4, delay: i * 0.07, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
    );
  });

  document.getElementById('timonChosen').style.display = 'none';
}

function selectTimonRoute(route, el) {
  state.selectedTimonRoute = route;
  document.querySelectorAll('.timon-route').forEach(r => r.classList.remove('chosen'));
  el.classList.add('chosen');

  const panel = document.getElementById('timonChosen');
  document.getElementById('tcContent').textContent = route.action;
  document.getElementById('tcResult').textContent = route.result;
  panel.style.display = 'block';
  gsap.from(panel, { y: 15, opacity: 0, duration: 0.4, ease: 'power2.out' });
  pulseElement(el, '#4ecdc4');
}

/* ═══════════════ SECTION 4: MOTOR INTERNO ═══════════════ */
function initMotorSection() {
  gsap.set('.motor-quiz, .quiz-step', { autoAlpha: 1, clearProps: 'transform,opacity,visibility' });

  renderQuizQuestion();
  document.getElementById('btnRetakeQuiz').addEventListener('click', () => {
    state.quizAnswers = [];
    state.currentQuizQ = 0;
    state.quizDone = false;
    document.getElementById('motorResult').style.display = 'none';
    document.getElementById('motorQuiz').style.display = 'block';
    renderQuizQuestion();
  });
}

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[state.currentQuizQ];
  const quizStep = document.getElementById('quizStep');
  gsap.set(quizStep, { autoAlpha: 1, x: 0, clearProps: 'transform,opacity,visibility' });
  document.getElementById('quizQNum').textContent = `${state.currentQuizQ + 1} / ${QUIZ_QUESTIONS.length}`;
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizProgressFill').style.width = (state.currentQuizQ / QUIZ_QUESTIONS.length * 100) + '%';

  const opts = document.getElementById('quizOptions');
  gsap.set(opts, { autoAlpha: 1, clearProps: 'opacity,visibility' });
  opts.innerHTML = '';
  q.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => selectQuizOption(opt.type, btn));
    opts.appendChild(btn);
  });

  gsap.fromTo('#quizStep',
    { autoAlpha: 0, x: 20 },
    { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
  );
  gsap.fromTo('.quiz-option',
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.32, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
  );
}

function selectQuizOption(type, btn) {
  document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  pulseElement(btn, '#f7c948');
  state.quizAnswers.push(type);

  setTimeout(() => {
    if (state.currentQuizQ < QUIZ_QUESTIONS.length - 1) {
      state.currentQuizQ++;
      gsap.to('#quizStep', { autoAlpha: 0, x: -20, duration: 0.25, ease: 'power2.in', onComplete: renderQuizQuestion });
    } else {
      showMotorResult();
    }
  }, 400);
}

function showMotorResult() {
  const counts = {};
  state.quizAnswers.forEach(t => counts[t] = (counts[t] || 0) + 1);
  const topType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const motor = MOTOR_TYPES[topType];
  state.motorType = topType;

  document.getElementById('motorResultIcon').textContent = motor.icon;
  document.getElementById('motorResultName').textContent = motor.name;
  document.getElementById('motorResultDesc').textContent = motor.desc;
  document.getElementById('quizProgressFill').style.width = '100%';

  gsap.to('#motorQuiz', {
    opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      document.getElementById('motorQuiz').style.display = 'none';
      const result = document.getElementById('motorResult');
      result.style.display = 'flex';
      gsap.from(result, { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' });
      gsap.from('#motorResultIcon', { scale: 0, rotation: -180, duration: 0.7, ease: 'back.out(1.7)', delay: 0.2 });
    }
  });
}

/* ═══════════════ SECTION 5: TRIPULACIÓN ═══════════════ */
function initTripulacionSection() {
  // Render skill badges
  const badgesContainer = document.getElementById('tsBadges');
  ALL_SKILLS.forEach(s => {
    const div = document.createElement('div');
    div.className = 'skill-badge';
    div.id = 'badge-' + s;
    div.textContent = SKILL_LABELS[s];
    badgesContainer.appendChild(div);
  });

  renderScenario();

  document.getElementById('btnPrevScenario').addEventListener('click', () => {
    if (state.currentScenario > 0) {
      state.currentScenario--;
      renderScenario('left');
    }
  });
  document.getElementById('btnNextScenario').addEventListener('click', () => {
    if (!state.scenarioPassed.has(state.currentScenario)) {
      setTripGate('Antes de avanzar, elige la respuesta que active varias habilidades: empatía, escucha, respeto, asertividad o cooperación.', true);
      pulseElement('#tripGateMsg', '#ff6b35');
      return;
    }
    if (state.currentScenario < TRIP_SCENARIOS.length - 1) {
      state.currentScenario++;
      renderScenario('right');
    } else {
      showTripCompletionAnimation();
      gsap.to(window, { duration: 1, scrollTo: '#sectionApoyo', ease: 'power3.inOut' });
    }
  });
}

function renderScenario(dir) {
  const sc = TRIP_SCENARIOS[state.currentScenario];
  const container = document.getElementById('tripScenario');
  const counter = document.getElementById('tripCounter');
  const completion = document.getElementById('tripCompletion');
  if (completion) completion.remove();
  counter.textContent = `${state.currentScenario + 1} / ${TRIP_SCENARIOS.length}`;
  setTripGate(state.scenarioPassed.has(state.currentScenario)
    ? 'Habilidades suficientes activas. Puedes avanzar.'
    : 'Para avanzar, debes elegir una respuesta completa, no solo una reacción impulsiva.', false);

  gsap.to(container, {
    opacity: 0, x: dir === 'right' ? -30 : (dir === 'left' ? 30 : 0), duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      container.innerHTML = `
        <div class="ts-header">
          <div class="ts-char-icon">${sc.char}</div>
          <div class="ts-char-info">
            <div class="ts-char-name">${sc.charName}</div>
          </div>
        </div>
        <div class="ts-situation">${sc.situation}</div>
        <div class="ts-speech">${sc.speech}</div>
        <div class="ts-q">${sc.q}</div>
        <div class="ts-options">
          ${sc.opts.map((opt, i) => `<button class="ts-opt" data-idx="${i}">${opt.text}</button>`).join('')}
        </div>
      `;

      container.querySelectorAll('.ts-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          container.querySelectorAll('.ts-opt').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          pulseElement(btn, '#4ecdc4');
          const skills = sc.opts[idx].skills;
          skills.forEach(s => state.unlockedSkills.add(s));
          updateSkillBadges(skills);
          if (skills.length >= 3) {
            state.scenarioPassed.add(state.currentScenario);
            setTripGate('Respuesta completa: activaste habilidades suficientes para seguir avanzando.', false);
            if (state.currentScenario === TRIP_SCENARIOS.length - 1) {
              showTripCompletionAnimation();
            }
          } else {
            state.scenarioPassed.delete(state.currentScenario);
            setTripGate('Aun faltan habilidades. Busca la opcion que combine escucha, respeto y accion concreta.', true);
          }
        });
      });

      gsap.fromTo(container, { opacity: 0, x: dir === 'right' ? 30 : (dir === 'left' ? -30 : 0) }, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' });
    }
  });
}

function showTripCompletionAnimation() {
  if (state.tripCompletionShown) return;
  state.tripCompletionShown = true;

  const layout = document.querySelector('#sectionTrip .trip-layout');
  const scenario = document.getElementById('tripScenario');
  const skills = document.getElementById('tripSkills');
  const nextBtn = document.getElementById('btnNextScenario');
  if (!layout || !scenario || !skills) return;

  const seal = document.createElement('div');
  seal.className = 'trip-completion-seal';
  seal.id = 'tripCompletion';
  seal.innerHTML = `
    <div class="trip-completion-orbit"></div>
    <div class="trip-completion-copy">
      <span>SISTEMA COMPLETADO</span>
      <strong>Tripulación sincronizada</strong>
      <p>Activaste empatía, escucha, asertividad, respeto y cooperación. Ya puedes avanzar con una respuesta más humana y consciente.</p>
    </div>
  `;
  layout.appendChild(seal);

  scenario.classList.add('trip-system-complete');
  skills.classList.add('trip-system-complete');
  if (nextBtn) {
    nextBtn.textContent = 'CONTINUAR →';
    nextBtn.classList.add('mission-ready');
  }

  gsap.timeline()
    .to('#sectionTrip .system-frame', {
      boxShadow: '0 0 0 2px rgba(247,201,72,0.36), 0 0 70px rgba(239,125,154,0.35), inset 0 0 38px rgba(247,201,72,0.09)',
      duration: 0.45,
      ease: 'power2.out'
    })
    .fromTo(seal,
      { autoAlpha: 0, y: 28, scale: 0.92 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo('.trip-completion-orbit',
      { scale: 0.2, rotate: -120, autoAlpha: 0 },
      { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.8)' },
      '-=0.38'
    )
    .fromTo('#sectionTrip .skill-badge.active',
      { scale: 1 },
      { scale: 1.08, duration: 0.22, repeat: 3, yoyo: true, stagger: 0.04, ease: 'sine.inOut' },
      '-=0.35'
    );

  createBurst(scenario);
  pulseElement('#tripGateMsg', '#f7c948');
}

function updateSkillBadges(active) {
  ALL_SKILLS.forEach(s => {
    const badge = document.getElementById('badge-' + s);
    if (state.unlockedSkills.has(s)) {
      badge.classList.add('active');
      if (active.includes(s)) gsap.from(badge, { scale: 1.3, duration: 0.3, ease: 'back.out(1.4)' });
    }
  });
}

/* ═══════════════ SECTION 6: APOYO EXTERNO ═══════════════ */
function initApoyoSection() {
  const network = document.getElementById('apoyoNetwork');
  if (!network) return;
  network.classList.add('apoyo-memory');
  network.innerHTML = `
    <div class="memory-panel">
      <div class="memory-head">
        <span>CONCENTRESE DE APOYO</span>
        <strong id="memoryScore">0 / 12 parejas</strong>
      </div>
      <div class="memory-board" id="apoyoMemoryBoard" aria-label="Juego de memoria de apoyo externo"></div>
    </div>
  `;
  createApoyoMemory();
  return;

  gsap.set('.apoyo-station, .apoyo-network, .apoyo-strength', { autoAlpha: 1, clearProps: 'transform,opacity,visibility' });

  const STATION_MSGS = {
    0: 'Tienes una base. Alguien te respalda.',
    1: '¡Bien! La conexión fortalece tu viaje.',
    2: 'Excelente red en construcción.',
    3: 'Tu red de apoyo es sólida.',
    4: '¡Casi completa! Eres muy fuerte.',
    5: 'Red completa. Navegas con toda la fuerza.',
    6: 'Red máxima activa. ¡Eres imparable!'
  };

  document.querySelectorAll('.as-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const station = btn.getAttribute('data-station');
      const stationEl = document.querySelector(`.apoyo-station[data-station="${station}"]`);

      if (state.connectedStations.has(station)) {
        state.connectedStations.delete(station);
        stationEl.classList.remove('connected');
        btn.textContent = 'CONECTAR';
      } else {
        state.connectedStations.add(station);
        stationEl.classList.add('connected');
        btn.textContent = '✓ ACTIVA';
        gsap.from(stationEl, { scale: 0.9, duration: 0.4, ease: 'back.out(1.7)' });
        createBurst(stationEl);
      }

      const count = state.connectedStations.size;
      const pct = Math.round((count / 6) * 100);
      gsap.to('#apoyoFill', { width: pct + '%', duration: 0.5, ease: 'power2.out' });
      document.getElementById('apoyoMsg').textContent = STATION_MSGS[count];
    });
  });
}

function setTripGate(message, warn) {
  const gate = document.getElementById('tripGateMsg');
  if (!gate) return;
  gate.textContent = message;
  gate.classList.toggle('warn', !!warn);
}

/* ═══════════════ SECTION 8: RETOS PERSONALIZADOS ═══════════════ */
const APOYO_MEMORY_CARDS = [
  { id: 'familia', label: 'Familia', icon: '👨‍👩‍👧' },
  { id: 'amistad', label: 'Amistad', icon: '🤝' },
  { id: 'docente', label: 'Docente', icon: '🎓' },
  { id: 'escucha', label: 'Escucha', icon: '👂' },
  { id: 'limites', label: 'Límites', icon: '🛑' },
  { id: 'consejo', label: 'Consejo', icon: '🧭' },
  { id: 'grupo', label: 'Grupo', icon: '🫂' },
  { id: 'calma', label: 'Calma', icon: '🌿' },
  { id: 'ayuda', label: 'Ayuda', icon: '🆘' },
  { id: 'confianza', label: 'Confianza', icon: '🔒' },
  { id: 'respeto', label: 'Respeto', icon: '💬' },
  { id: 'referente', label: 'Referente', icon: '⭐' }
];

function createApoyoMemory() {
  const board = document.getElementById('apoyoMemoryBoard');
  if (!board) return;
  state.apoyoFlipped = [];
  state.apoyoLocked = false;
  state.apoyoMatched = new Set();
  state.connectedStations.clear();

  const deck = shuffleArray([
    ...APOYO_MEMORY_CARDS,
    ...APOYO_MEMORY_CARDS
  ]);

  board.innerHTML = deck.map((card, index) => `
    <button class="memory-card${card.single ? ' memory-self' : ''}" data-id="${card.id}" data-index="${index}" type="button">
      <span class="memory-back">?</span>
      <span class="memory-front">
        <strong>${card.icon}</strong>
        <small>${card.label}</small>
      </span>
    </button>
  `).join('');

  board.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => flipApoyoCard(card));
  });

  updateApoyoMemoryScore();
  gsap.fromTo('.memory-card', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.025, duration: 0.35, ease: 'power2.out' });
}

function flipApoyoCard(card) {
  if (state.apoyoLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  pulseElement(card, '#8ee6a8');

  if (card.classList.contains('memory-self')) {
    card.classList.add('matched');
    document.getElementById('apoyoMsg').textContent = 'Tu red empieza por reconocer que también puedes pedir apoyo.';
    return;
  }

  state.apoyoFlipped.push(card);
  if (state.apoyoFlipped.length < 2) return;

  const [first, second] = state.apoyoFlipped;
  const match = first.dataset.id === second.dataset.id;
  state.apoyoLocked = true;

  if (match) {
    first.classList.add('matched');
    second.classList.add('matched');
    state.apoyoMatched.add(first.dataset.id);
    state.connectedStations.add(first.dataset.id);
    document.getElementById('apoyoMsg').textContent = `Pareja encontrada: ${first.querySelector('small').textContent}. Tu red gana fuerza.`;
    createBurst(second);
    state.apoyoFlipped = [];
    state.apoyoLocked = false;
    updateApoyoMemoryScore();
  } else {
    document.getElementById('apoyoMsg').textContent = 'No coinciden. Recuerda dónde estaban y vuelve a intentarlo.';
    setTimeout(() => {
      first.classList.remove('flipped');
      second.classList.remove('flipped');
      state.apoyoFlipped = [];
      state.apoyoLocked = false;
    }, 650);
  }
}

function updateApoyoMemoryScore() {
  const count = state.apoyoMatched.size;
  const pct = Math.round((count / APOYO_MEMORY_CARDS.length) * 100);
  const score = document.getElementById('memoryScore');
  if (score) score.textContent = `${count} / ${APOYO_MEMORY_CARDS.length} parejas`;
  gsap.to('#apoyoFill', { width: pct + '%', duration: 0.5, ease: 'power2.out' });
  if (count === APOYO_MEMORY_CARDS.length) {
    document.getElementById('apoyoMsg').textContent = 'Red completa: reconociste apoyos externos y cómo se conectan contigo.';
  }
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const ROLEPLAY_SITUATIONS = [
  {
    emotion: 'Miedo',
    title: 'El bloqueo antes de exponer',
    text: 'Una persona debe hablar al frente, pero se llena de miedo y quiere abandonar. El grupo debe mostrar qué pasa, cómo la apoyan y cómo logra dar el primer paso.',
    roles: ['El/la afectado/a: tiene miedo y no quiere pasar', 'El apoyo: le habla con calma y le da confianza', 'El/la impaciente: presiona sin darse cuenta', 'El mediador: ordena al grupo y propone empezar poco a poco']
  },
  {
    emotion: 'Enojo',
    title: 'La parte del trabajo que no llegó',
    text: 'El grupo va a presentar, pero alguien no hizo su parte. Una persona se enoja, otra se defiende y el grupo debe resolverlo sin pelear.',
    roles: ['El/la causante: no hizo su parte del trabajo', 'El/la afectado/a: se enoja porque siente que cargó con todo', 'El apoyo: intenta calmar la discusión', 'El mediador: propone una solución rápida para presentar']
  },
  {
    emotion: 'Tristeza',
    title: 'El comentario que bajó el ánimo',
    text: 'Alguien hace un comentario que hiere a otra persona. La persona afectada se pone triste y el grupo debe mostrar cómo acompañarla y reparar el daño.',
    roles: ['El/la afectado/a: se siente triste por el comentario', 'El/la causante: hizo el comentario sin medirlo', 'El apoyo: se acerca y escucha lo que siente', 'El mediador: ayuda a pedir disculpas y cerrar bien']
  },
  {
    emotion: 'Alegría',
    title: 'La buena noticia del equipo',
    text: 'El grupo recibe una buena noticia y todos celebran, pero una persona queda por fuera. Deben mostrar cómo compartir la alegría sin excluir a nadie.',
    roles: ['El/la emocionado/a: celebra mucho la noticia', 'El/la excluido/a: siente que no lo tuvieron en cuenta', 'El apoyo: invita a reconocer a todos', 'El mediador: convierte la celebración en unión del grupo']
  },
  {
    emotion: 'Calma',
    title: 'La decisión que divide al equipo',
    text: 'Dos personas quieren hacer las cosas de manera diferente y empiezan a discutir. El grupo debe mostrar cómo bajar el tono y tomar una decisión en calma.',
    roles: ['Persona 1: defiende una idea', 'Persona 2: defiende otra idea', 'El apoyo: pide que se escuchen sin interrumpir', 'El mediador: ayuda a escoger una opción justa']
  },
  {
    emotion: 'Frustración',
    title: 'El intento que no salió',
    text: 'Una persona intenta hacer algo varias veces y no le sale. Se frustra y quiere rendirse. El grupo debe ayudarle a ver algo bueno y buscar otra forma de intentarlo.',
    roles: ['El/la afectado/a: se frustra y quiere rendirse', 'El apoyo: le reconoce algo bueno que tiene', 'El compañero: le ayuda a intentar de nuevo', 'El mediador: propone cambiar la estrategia']
  },
  {
    emotion: 'Carga positiva / negativa',
    title: 'El grupo bajo presión',
    text: 'El grupo tiene poco tiempo y todos empiezan a estresarse. Una persona mete más presión, otra se altera y el grupo debe transformar esa carga negativa en cooperación.',
    roles: ['El/la alterado/a: se estresa y quiere correr', 'El/la que presiona: aumenta la tensión del grupo', 'El apoyo: pide respirar y hablar más claro', 'El mediador: reparte tareas para que todos ayuden']
  }
];

const roleplayState = {
  selectedIndex: null,
  spinRotation: 0,
  isSpinning: false,
  spinQueue: [],
  groupNumber: 1,
  timer: null,
  timeLeft: 60,
  audioCtx: null
};

function initRetosSection() {
  initRoleplaySection();
  initMissionClose();
}

function initRoleplaySection() {
  const spinBtn = document.getElementById('btnSpinScene');
  const startBtn = document.getElementById('btnStartTimer');
  const resetBtn = document.getElementById('btnResetTimer');
  if (!spinBtn || !startBtn || !resetBtn) return;

  spinBtn.addEventListener('click', () => {
    spinRoleplayScene();
    pulseElement(spinBtn, '#f0a36b');
  });

  startBtn.addEventListener('click', startRoleplayTimer);
  resetBtn.addEventListener('click', resetRoleplayTimer);
  setCountdownDisplay(60);
  updateRoleplayStatus();
}

function spinRoleplayScene() {
  if (roleplayState.isSpinning) return;
  const index = getNextRoleplayIndex();
  const spinBtn = document.getElementById('btnSpinScene');
  const startBtn = document.getElementById('btnStartTimer');
  const resetBtn = document.getElementById('btnResetTimer');

  roleplayState.isSpinning = true;
  roleplayState.selectedIndex = null;
  const spinLabel = spinBtn?.querySelector('.spin-label');
  if (spinBtn) {
    spinBtn.disabled = true;
    spinBtn.classList.add('spinning');
  }
  if (spinLabel) spinLabel.textContent = 'GIRANDO...';
  if (startBtn) startBtn.disabled = true;
  if (resetBtn) resetBtn.disabled = true;
  resetRoleplayTimer(false);
  setRoleplayPending(index);
  spinRoleplayWheel(index, () => {
    selectRoleplaySituation(index);
    roleplayState.isSpinning = false;
    roleplayState.groupNumber += 1;
    updateRoleplayStatus();
    if (spinBtn) {
      spinBtn.disabled = false;
      spinBtn.classList.remove('spinning');
    }
    if (spinLabel) spinLabel.textContent = 'COMENZAR';
    if (startBtn) startBtn.disabled = false;
    if (resetBtn) resetBtn.disabled = false;
  });
}

function getNextRoleplayIndex() {
  if (!roleplayState.spinQueue.length) {
    roleplayState.spinQueue = shuffleArray(ROLEPLAY_SITUATIONS.map((_, index) => index));
  }
  return roleplayState.spinQueue.shift();
}

function setRoleplayPending(index) {
  document.getElementById('sceneNumber').textContent = 'Ruleta en movimiento';
  document.getElementById('sceneTitle').textContent = 'Preparando situación...';
  document.getElementById('sceneText').textContent = 'La ruleta está eligiendo una escena diferente para este grupo. Al detenerse, aparecerán la situación y los cuatro roles.';
  document.getElementById('roleGrid').innerHTML = [1, 2, 3, 4].map(role => `
    <div class="role-pill role-pending">
      <span>Rol ${role}</span>
      <strong>Esperando asignación</strong>
    </div>
  `).join('');
  gsap.fromTo('.role-pending',
    { autoAlpha: 0.45 },
    { autoAlpha: 1, duration: 0.55, repeat: -1, yoyo: true, stagger: 0.08, ease: 'sine.inOut' }
  );
}

function selectRoleplaySituation(index) {
  const scene = ROLEPLAY_SITUATIONS[index];
  roleplayState.selectedIndex = index;
  gsap.killTweensOf('.role-pending');

  document.getElementById('sceneNumber').textContent = `Situación ${index + 1} / ${ROLEPLAY_SITUATIONS.length}`;
  document.getElementById('sceneTitle').textContent = `${scene.title} · ${scene.emotion}`;
  document.getElementById('sceneText').textContent = scene.text;

  const roleGrid = document.getElementById('roleGrid');
  roleGrid.innerHTML = scene.roles.map((role, roleIndex) => `
    <div class="role-pill">
      <span>Rol ${roleIndex + 1}</span>
      <strong>${role}</strong>
    </div>
  `).join('');

  gsap.fromTo('#sceneCard',
    { y: 20, autoAlpha: 0, scale: 0.97 },
    { y: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }
  );
  gsap.fromTo('.role-pill',
    { y: 14, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
  );
}

function spinRoleplayWheel(index, onComplete) {
  const wheel = document.getElementById('rouletteWheel');
  if (!wheel) return;
  const segment = 360 / ROLEPLAY_SITUATIONS.length;
  const target = 360 * 22 + (360 - (index * segment + segment / 2));
  roleplayState.spinRotation += target;
  gsap.to(wheel, {
    rotate: roleplayState.spinRotation,
    duration: 15,
    ease: 'power4.out',
    onComplete
  });
}

function startRoleplayTimer() {
  if (roleplayState.timer || roleplayState.selectedIndex === null) return;
  primeRoleplayAudio();
  const startBtn = document.getElementById('btnStartTimer');
  if (startBtn) startBtn.disabled = true;

  roleplayState.timer = setInterval(() => {
    roleplayState.timeLeft -= 1;
    setCountdownDisplay(roleplayState.timeLeft);

    if (roleplayState.timeLeft <= 0) {
      clearInterval(roleplayState.timer);
      roleplayState.timer = null;
      roleplayState.timeLeft = 0;
      setCountdownDisplay(0);
      playRoleplayBell();
      pulseElement(document.getElementById('countdownDisplay'), '#f0a36b');
      const start = document.getElementById('btnStartTimer');
      if (start) start.disabled = false;
    }
  }, 1000);
}

function resetRoleplayTimer(reactivateStart = true) {
  if (roleplayState.timer) {
    clearInterval(roleplayState.timer);
    roleplayState.timer = null;
  }
  roleplayState.timeLeft = 60;
  setCountdownDisplay(60);
  const startBtn = document.getElementById('btnStartTimer');
  if (startBtn && reactivateStart && roleplayState.selectedIndex !== null) startBtn.disabled = false;
}

function updateRoleplayStatus() {
  const status = document.getElementById('rouletteGroupStatus');
  if (!status) return;
  if (!roleplayState.spinQueue.length && roleplayState.groupNumber > ROLEPLAY_SITUATIONS.length) {
    status.textContent = 'Ya salieron las 7 situaciones. El próximo grupo inicia una nueva ronda.';
    return;
  }
  const remaining = roleplayState.spinQueue.length || ROLEPLAY_SITUATIONS.length;
  status.textContent = `Grupo ${roleplayState.groupNumber} listo · quedan ${remaining} situaciones sin repetir.`;
}

function setCountdownDisplay(seconds) {
  const display = document.getElementById('countdownDisplay');
  if (!display) return;
  const safeSeconds = Math.max(0, seconds);
  const mins = String(Math.floor(safeSeconds / 60)).padStart(2, '0');
  const secs = String(safeSeconds % 60).padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
  display.classList.toggle('danger', safeSeconds <= 10);
}

function primeRoleplayAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = roleplayState.audioCtx || new AudioContext();
  roleplayState.audioCtx = ctx;
  if (ctx.state === 'suspended') ctx.resume();
}

function playRoleplayBell() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = roleplayState.audioCtx || new AudioContext();
  roleplayState.audioCtx = ctx;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  [0, 0.22].forEach((delay, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(index === 0 ? 880 : 660, now + delay);
    gain.gain.setValueAtTime(0.001, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.28, now + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.75);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + 0.8);
  });
}

function initMissionClose() {
  const finish = document.getElementById('btnFinishMission');
  const finishTop = document.getElementById('btnFinishMissionTop');
  const card = document.getElementById('missionCloseCard');
  if (!card) return;

  const finishMission = (button) => {
    card.style.display = 'block';
    [finish, finishTop].forEach(btn => {
      if (!btn) return;
      btn.textContent = 'MISIÓN FINALIZADA';
      btn.disabled = true;
    });
    pulseElement(card, '#f0a36b');
    gsap.fromTo(card,
      { y: 24, autoAlpha: 0, scale: 0.96 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }
    );
    gsap.to(window, { duration: 0.8, scrollTo: card, ease: 'power3.inOut' });
  };

  if (finish) finish.addEventListener('click', () => finishMission(finish));
  if (finishTop) finishTop.addEventListener('click', () => finishMission(finishTop));
}

function getRetoKeys() {
  const rawFocus = state.retoFocus === 'auto'
    ? (state.activeEmotion || state.activeTimon || 'miedo')
    : state.retoFocus;
  const focus = rawFocus === 'ira' ? 'enojo' : rawFocus;
  return RETO_BANK[focus] ? [focus] : ['miedo'];
}

function buildRetos() {
  const retos = getRetoKeys().flatMap(key => RETO_BANK[key].map(reto => ({ ...reto, key })));
  const offset = state.retoShuffle % Math.max(retos.length, 1);
  return retos.slice(offset).concat(retos.slice(0, offset)).slice(0, 4);
}

function renderRetos() {
  const cards = document.getElementById('retoCards');
  if (!cards) return;

  const retos = buildRetos();
  const profileEmotion = state.retoFocus === 'auto'
    ? (state.activeEmotion || 'calma')
    : state.retoFocus;
  const retoEmotion = profileEmotion === 'ira' ? 'enojo' : profileEmotion;
  const profileLabel = EMOTIONS[profileEmotion]?.label || TIMON_DATA[retoEmotion]?.label || 'Ruta personal';
  const skillsCount = state.unlockedSkills.size;
  const supportCount = state.connectedStations.size;

  document.getElementById('retoEmotionImg').src = EMOTION_ASSETS[profileEmotion] || EMOTION_ASSETS.calma;
  document.getElementById('retoEmotionImg').className = `emotion-crop emotion-crop-${profileEmotion}`;
  document.getElementById('retoProfileTitle').textContent = state.retoFocus === 'auto'
    ? `Retos para ${profileLabel.toLowerCase()}`
    : `Enfoque: ${profileLabel}`;
  document.getElementById('retoProfileText').textContent = 'Retos exprés para trabajar esta emoción interactuando con otras personas.';
  document.getElementById('retoCount').textContent = `${retos.length} retos rápidos`;

  cards.innerHTML = retos.map((reto, index) => `
    <article class="reto-card" data-reto="${index}">
      <div class="reto-card-top">
        <span class="reto-tag">${reto.tag}</span>
        <span class="reto-time">${reto.time}</span>
      </div>
      <h3>${reto.title}</h3>
      <p>${reto.text}</p>
      <button class="reto-done" data-reto-done="${index}">MARCAR HECHO</button>
    </article>
  `).join('');

  document.querySelectorAll('.reto-done').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.reto-card');
      card.classList.toggle('done');
      btn.textContent = card.classList.contains('done') ? 'HECHO' : 'MARCAR HECHO';
      pulseElement(card, '#00ff9d');
    });
  });

  gsap.fromTo('.reto-card',
    { y: 18, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
  );
}

/* ═══════════════ SECTION 7: MISIÓN FINAL ═══════════════ */
function initMisionSection() {
  gsap.set('.ms-step, .mision-steps', { autoAlpha: 1, clearProps: 'transform,opacity,visibility' });

  document.querySelectorAll('.ms-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.getAttribute('data-step'));
      const val = btn.getAttribute('data-val');

      if (step !== state.misionStep) return;

      // Mark chosen
      document.querySelectorAll(`.ms-opt[data-step="${step}"]`).forEach(b => b.classList.remove('chosen'));
      btn.classList.add('chosen');
      pulseElement(btn, '#00ff9d');

      state.misionAnswers[step] = val;

      // Mark step complete
      const stepEl = document.querySelector(`.ms-step[data-step="${step}"]`);
      stepEl.classList.add('completed');
      gsap.to(stepEl, {
        borderColor: 'rgba(0,255,157,0.95)',
        boxShadow: '0 0 0 1px rgba(0,255,157,0.24), 0 0 34px rgba(0,255,157,0.22)',
        duration: 0.5
      });

      // Unlock next
      setTimeout(() => {
        state.misionStep++;
        const nextStep = document.querySelector(`.ms-step[data-step="${state.misionStep}"]`);
        if (nextStep) {
          nextStep.classList.remove('locked');
          gsap.fromTo(nextStep,
            { y: 20, autoAlpha: 0.35 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
          );
          nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          setTimeout(showMisionResult, 500);
        }
      }, 300);
    });
  });

  const goRetos = document.getElementById('btnGoRetos');
  if (goRetos) {
    goRetos.addEventListener('click', () => {
      gsap.to(window, { duration: 1, scrollTo: '#sectionRetos', ease: 'power3.inOut' });
    });
  }
}

function showMisionResult() {
  const steps = document.getElementById('misionSteps');
  const result = document.getElementById('misionResult');

  gsap.to(steps, {
    opacity: 0, y: -30, duration: 0.5,
    onComplete: () => {
      steps.style.display = 'none';
      result.style.display = 'flex';

      const desc = `Identificaste la emoción "${state.misionAnswers[0]}", reconociste que necesitas "${state.misionAnswers[1]}", encauzaste hacia "${state.misionAnswers[2]}", activaste tu motivación desde "${state.misionAnswers[3]}", respondiste con "${state.misionAnswers[4]}" y activaste el apoyo de "${state.misionAnswers[5]}". Ahora puedes cerrar el viaje con una práctica breve y acorde con tus elecciones.`;
      document.getElementById('mrDesc').textContent = desc;

      const statsData = [
        { val: '6', lbl: 'Sistemas navegados' },
        { val: '100%', lbl: 'Misión completada' },
        { val: '🌟', lbl: 'Piloto emocional' }
      ];
      document.getElementById('mrStats').innerHTML = statsData.map(s => `
        <div class="mr-stat">
          <div class="mr-stat-val">${s.val}</div>
          <div class="mr-stat-lbl">${s.lbl}</div>
        </div>
      `).join('');

      gsap.from(result, { scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(1.4)' });
      gsap.from('.mr-icon', { scale: 0, rotation: -360, duration: 0.8, delay: 0.3, ease: 'back.out(1.7)' });
      gsap.from('.mr-stat', { y: 20, opacity: 0, stagger: 0.1, delay: 0.5, duration: 0.5, ease: 'power2.out' });

      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('statusText').textContent = '¡MISIÓN COMPLETADA!';
    }
  });
}

/* ═══════════════ LAUNCH BUTTON ═══════════════ */
function initLaunchButton() {
  document.getElementById('btnLaunch').addEventListener('click', () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: '#sectionRadar',
      ease: 'power3.inOut'
    });
  });

  document.querySelectorAll('.route-node[data-target]').forEach(node => {
    node.addEventListener('click', () => {
      const target = node.getAttribute('data-target');
      gsap.to(window, {
        duration: 1.1,
        scrollTo: target,
        ease: 'power3.inOut'
      });
      pulseElement(node, '#f7c948');
    });
  });
}

/* ═══════════════ SECTION ENTRANCE EFFECTS ═══════════════ */
function initSectionEffects() {
  gsap.utils.toArray('.section').forEach((section, i) => {
    if (i === 0) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        const tag = section.getAttribute('data-section');
        const labels = ['', 'RADAR EMOCIONAL', 'TIMÓN EMOCIONAL', 'MOTOR INTERNO', 'TRIPULACIÓN', 'APOYO EXTERNO', 'MISIÓN FINAL', 'RUEDA DE ESCENAS'];
        if (tag === '6') {
          document.getElementById('statusText').textContent = 'NAVEGACIÓN COMPLETA';
        } else if (labels[tag]) {
          document.getElementById('statusText').textContent = labels[tag];
        }
      }
    });
  });
}

/* ═══════════════ EXTRA GSAP POLISH ═══════════════ */
function pulseElement(target, color = '#00d4ff') {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  gsap.fromTo(el,
    { boxShadow: `0 0 0 rgba(0,0,0,0)` },
    {
      boxShadow: `0 0 34px ${color}`,
      duration: 0.22,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    }
  );
}

function createBurst(sourceEl) {
  const rect = sourceEl.getBoundingClientRect();
  const burst = document.createElement('span');
  burst.className = 'connection-burst';
  burst.style.left = rect.left + rect.width / 2 + 'px';
  burst.style.top = rect.top + rect.height / 2 + 'px';
  document.body.appendChild(burst);

  gsap.to(burst, {
    scale: 16,
    opacity: 0,
    duration: 0.75,
    ease: 'power3.out',
    onComplete: () => burst.remove()
  });
}

function initAmbientAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.to('.nav-icon', { rotation: 360, duration: 10, repeat: -1, ease: 'none' });
  gsap.to('.hud-corner', { opacity: 0.2, duration: 1.8, repeat: -1, yoyo: true, stagger: 0.2, ease: 'sine.inOut' });
  gsap.to('.apoyo-center-icon', { y: -8, scale: 1.05, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.mr-glow', { rotation: 360, duration: 8, repeat: -1, ease: 'none' });
  gsap.to('.ambient-glyph', {
    y: -12,
    x: 8,
    rotation: 4,
    duration: 5.5,
    repeat: -1,
    yoyo: true,
    stagger: 0.35,
    ease: 'sine.inOut'
  });
}

function initAmbientGlyphs() {
  document.querySelectorAll('.touch-glow').forEach(glyph => {
    glyph.addEventListener('click', () => {
      glyph.classList.add('lit');
      createBurst(glyph);
      showEchoMessage(glyph.getAttribute('data-echo') || glyph.getAttribute('aria-label') || 'Señal activada.');
      gsap.fromTo(glyph,
        { scale: 1 },
        { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
      window.clearTimeout(glyph._litTimer);
      glyph._litTimer = window.setTimeout(() => glyph.classList.remove('lit'), 1700);
    });
  });
}

function initPilotLogDrag() {
  const log = document.getElementById('pilotLog');
  if (!log) return;

  const saved = sessionStorage.getItem('pilotLogPosition');
  if (saved) {
    try {
      const pos = JSON.parse(saved);
      log.style.left = `${pos.left}px`;
      log.style.top = `${pos.top}px`;
      log.style.right = 'auto';
      log.style.bottom = 'auto';
    } catch {
      sessionStorage.removeItem('pilotLogPosition');
    }
  }

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  log.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.pilot-log-close')) return;
    if (event.button !== undefined && event.button !== 0) return;
    const rect = log.getBoundingClientRect();
    dragging = true;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    log.classList.add('dragging');
    log.setPointerCapture(event.pointerId);
  });

  log.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const rect = log.getBoundingClientRect();
    const left = clamp(event.clientX - offsetX, 8, window.innerWidth - rect.width - 8);
    const top = clamp(event.clientY - offsetY, 76, window.innerHeight - rect.height - 8);
    log.style.left = `${left}px`;
    log.style.top = `${top}px`;
    log.style.right = 'auto';
    log.style.bottom = 'auto';
  });

  const stopDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    log.classList.remove('dragging');
    const rect = log.getBoundingClientRect();
    sessionStorage.setItem('pilotLogPosition', JSON.stringify({ left: rect.left, top: rect.top }));
    if (event?.pointerId !== undefined && log.hasPointerCapture(event.pointerId)) {
      log.releasePointerCapture(event.pointerId);
    }
  };

  log.addEventListener('pointerup', stopDrag);
  log.addEventListener('pointercancel', stopDrag);
}

function initPilotLogClose() {
  const log = document.getElementById('pilotLog');
  const closeBtn = document.getElementById('pilotLogClose');
  if (!log || !closeBtn) return;

  let reopenTimer = null;

  const showLog = () => {
    log.classList.remove('is-hidden');
    gsap.fromTo(log,
      { autoAlpha: 0, y: 18, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
    );
  };

  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    window.clearTimeout(reopenTimer);
    gsap.to(log, {
      autoAlpha: 0,
      y: 18,
      scale: 0.96,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        log.classList.add('is-hidden');
        reopenTimer = window.setTimeout(showLog, 30000);
      }
    });
  });
}

function showEchoMessage(message) {
  const echo = document.getElementById('echoMessage');
  if (!echo) return;
  echo.textContent = message;
  gsap.killTweensOf(echo);
  gsap.fromTo(echo,
    { autoAlpha: 0, y: 18, xPercent: -50 },
    { autoAlpha: 1, y: 0, xPercent: -50, duration: 0.35, ease: 'power2.out' }
  );
  gsap.to(echo, {
    autoAlpha: 0,
    y: 12,
    xPercent: -50,
    duration: 0.45,
    delay: 2.7,
    ease: 'power2.in'
  });
}

function initHoverAnimations() {
  const selectors = '.emotion-btn, .timon-emo, .timon-route, .quiz-option, .ts-opt, .apoyo-station, .memory-card, .ms-opt, .reto-focus, .reto-card, .reto-done, .role-pill, .scene-card, .btn-launch, .btn-secondary';
  document.querySelectorAll(selectors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -3, scale: 1.015, duration: 0.22, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out' });
    });
  });
}

function initSectionColorShift() {
  const sectionColors = {
    sectionIntro: '#68d8c6',
    sectionRadar: '#79c7ff',
    sectionTimon: '#7bdcb5',
    sectionMotor: '#f2c766',
    sectionTrip: '#ef7d9a',
    sectionApoyo: '#8ee6a8',
    sectionMision: '#b7d7ff',
    sectionRetos: '#f0a36b'
  };

  Object.entries(sectionColors).forEach(([id, color]) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        setMissionVisuals(id, color);
        document.getElementById('mainNav').classList.add('is-active');
      },
      onEnterBack: () => {
        setMissionVisuals(id, color);
      },
      onLeave: () => document.getElementById('mainNav').classList.remove('is-active')
    });
  });
}

function setMissionVisuals(sectionId, color) {
  const meta = MISSION_SECTIONS[sectionId];
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--mission-color', color);
  document.documentElement.style.setProperty('--mission-color-soft', hexToRgba(color, 0.12));
  document.documentElement.style.setProperty('--panel-tint', hexToRgba(color, 0.08));
  if (meta) {
    document.getElementById('missionStage').textContent = meta.stage;
    document.getElementById('missionTopic').textContent = meta.topic;
    document.getElementById('statusText').textContent = meta.topic.toUpperCase();
  }
  updatePilotLog(sectionId);
}

function updatePilotLog(sectionId) {
  const entry = PILOT_LOG[sectionId];
  const meta = MISSION_SECTIONS[sectionId];
  if (!entry || !meta) return;

  const stage = document.getElementById('pilotLogStage');
  const quote = document.getElementById('pilotLogQuote');
  const signal = document.getElementById('pilotLogSignal');
  const orbit = document.getElementById('pilotLogOrbit');
  if (!stage || !quote || !signal || !orbit) return;

  stage.textContent = `${meta.stage} · ${meta.topic}`;
  quote.textContent = entry.quote;
  signal.textContent = entry.signal;
  orbit.textContent = entry.step;

  document.querySelectorAll('#pilotConstellation span').forEach((dot, index) => {
    dot.classList.toggle('active', index <= Math.max(entry.step - 1, 0));
  });

  const log = document.getElementById('pilotLog');
  if (log?.classList.contains('is-hidden')) return;

  gsap.fromTo('#pilotLog',
    { y: 12, autoAlpha: 0.72 },
    { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
  );
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function initMissionRouteGuide() {
  const routeMap = [
    ['#sectionRadar', 0],
    ['#sectionTimon', 1],
    ['#sectionTrip', 2],
    ['#sectionMision', 3],
    ['#sectionRetos', 4]
  ];

  routeMap.forEach(([trigger, index]) => {
    ScrollTrigger.create({
      trigger,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveRoute(index),
      onEnterBack: () => setActiveRoute(index)
    });
  });
}

function setActiveRoute(index) {
  document.querySelectorAll('.route-node').forEach((node, i) => {
    node.classList.toggle('active', i === index);
  });
}

function decorateSystemSections() {
  document.querySelectorAll('.section:not(.section-intro) .section-container').forEach(container => {
    const section = container.closest('.section');
    const header = container.querySelector(':scope > .section-header');
    const brief = SYSTEM_BRIEFS[section?.id];

    if (header && brief && !header.querySelector('.section-brief')) {
      const briefEl = document.createElement('div');
      briefEl.className = 'section-brief';
      briefEl.innerHTML = `<strong>${brief.label}</strong><span>${brief.text}</span>`;
      header.appendChild(briefEl);
    }

    if (!container.querySelector(':scope > .system-frame')) {
      const frame = document.createElement('div');
      frame.className = 'system-frame';
      Array.from(container.children)
        .filter(child => !child.classList.contains('section-header'))
        .forEach(child => frame.appendChild(child));
      container.appendChild(frame);
    }
  });
}

/* ═══════════════ INIT ═══════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Tiny loading fade
  gsap.from('body', { opacity: 0, duration: 0.6, ease: 'power2.out' });
  decorateSystemSections();
  setMissionVisuals('sectionIntro', '#68d8c6');
  updateNavProgress();

  initAmbientAnimations();
  initScrollAnimations();
  initLaunchButton();
  initRadarSection();
  initTimonSection();
  initMotorSection();
  initTripulacionSection();
  initApoyoSection();
  initRetosSection();
  initMisionSection();
  initSectionEffects();
  initHoverAnimations();
  initSectionColorShift();
  initMissionRouteGuide();
  initAmbientGlyphs();
  initPilotLogDrag();
  initPilotLogClose();
});
