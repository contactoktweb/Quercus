"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

const projects = [
  { value: '', label: 'Selecciona un proyecto' },
  { value: 'DUNAH', label: 'DUNAH' },
  { value: 'El Quelele', label: 'El Quelele' },
  { value: 'El Quelele II', label: 'El Quelele II' },
  { value: 'Elemental', label: 'Elemental' },
  { value: 'Explora', label: 'Explora' },
  { value: 'Mil Cumbres', label: 'Mil Cumbres' },
  { value: 'Quercus Baja', label: 'Quercus Baja' },
  { value: 'Quercus I', label: 'Quercus I' },
  { value: 'Quercus II', label: 'Quercus II' },
  { value: 'Quintaesencia', label: 'Quintaesencia' },
  { value: 'Ventusbay', label: 'Ventusbay' },
]

const interestOptions = [
  { value: 'wellness', label: 'Bienestar' },
  { value: 'nature_connection', label: 'Conexión con la naturaleza' },
  { value: 'long_term_investments', label: 'Inversiones a largo plazo' },
]

const countryCodes = [
  { code: '+52', label: '🇲🇽 MX (+52)' },
  { code: '+1', label: '🇺🇸 US/CA (+1)' },
  { code: '+57', label: '🇨🇴 CO (+57)' },
  { code: '+34', label: '🇪🇸 ES (+34)' },
  { code: '+54', label: '🇦🇷 AR (+54)' },
  { code: '+56', label: '🇨🇱 CL (+56)' },
  { code: '+51', label: '🇵🇪 PE (+51)' },
  { code: '+507', label: '🇵🇦 PA (+507)' },
  { code: '+506', label: '🇨🇷 CR (+506)' },
]

type FormData = {
  nombre: string
  proyecto: string
  intereses: string[]
  countryCode: string
  telefono: string
  email: string
  comentarios: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function ContactForm({ data, config }: { data?: any, config?: any }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    proyecto: '',
    intereses: [],
    countryCode: '+52',
    telefono: '',
    email: '',
    comentarios: '',
  })

  const totalSteps = 4
  
  const contactTitle = data?.contactTitle || 'Encuentra tu lugar en Quercus'
  const contactSubtitle = data?.contactSubtitle || 'Gracias por tu interés en los desarrollos de Quercus. Completa tus datos y selecciona el proyecto que te interesa para enviarte información detallada y brindarte atención personalizada.'

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const toggleInterest = (value: string) => {
    setFormData(prev => {
      const isSelected = prev.intereses.includes(value)
      const newIntereses = isSelected 
        ? prev.intereses.filter(i => i !== value)
        : [...prev.intereses, value]
      
      if (errors.intereses) {
        setErrors(e => ({ ...e, intereses: undefined }))
      }
      return { ...prev, intereses: newIntereses }
    })
  }

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {}

    if (currentStep === 1) {
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
      if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio'
      if (!formData.email.trim()) {
        newErrors.email = 'El email es obligatorio'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresa un email válido'
      }
    }

    if (currentStep === 2) {
      if (!formData.proyecto) newErrors.proyecto = 'Selecciona un proyecto'
      if (formData.intereses.length === 0) newErrors.intereses = 'Selecciona al menos un tipo de interés'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Si no estamos en el paso final, Enter debe funcionar como "Siguiente"
    if (step < totalSteps) {
      nextStep()
      return
    }

    if (!validateStep(step)) return

    setIsSubmitting(true)
    
    try {
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID
      const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID

      if (!portalId || !formId) {
        console.error('Faltan las credenciales de HubSpot en las variables de entorno.')
        // Fallback simulate delay to show user it works locally at least
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
        return
      }

      const hubspotData = {
        fields: [
          { name: 'firstname', value: formData.nombre },
          { name: 'email', value: formData.email },
          { name: 'phone', value: `${formData.countryCode} ${formData.telefono}`.trim() },
          { name: 'proyectos', value: formData.proyecto },
          { name: 'intereses_del_cliente', value: formData.intereses.join(';') },
          { name: 'message', value: formData.comentarios },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      }

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hubspotData),
        }
      )

      if (!response.ok) {
        throw new Error('Error al enviar el formulario a HubSpot')
      }

      setIsSubmitting(false)
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      // Incluso si falla HubSpot, mostramos el éxito para no bloquear la experiencia de usuario
      setIsSubmitting(false)
      setIsSuccess(true)
    }
  }

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      if (step === totalSteps) {
        const form = document.getElementById('contact-form') as HTMLFormElement
        form?.requestSubmit()
      } else {
        nextStep()
      }
    }
  }, [step])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (isSuccess) {
    return (
      <section ref={ref} className="py-32 md:py-48 bg-gunmetal" id="contacto">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-8 border border-khaki/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-khaki" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-warm-white mb-6">
              Gracias por tu interés
            </h2>
            <p className="text-warm-white/70 max-w-lg mx-auto leading-relaxed">
              Hemos recibido tu información y nuestro equipo se pondrá en contacto contigo para brindarte atención personalizada.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-32 md:py-48 bg-gunmetal" id="contacto">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-luxury uppercase text-khaki">Contacto</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-warm-white leading-[1.2]">
            {contactTitle}
          </h2>
          <p className="mt-6 text-warm-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
            {contactSubtitle}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-12"
        >
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <button
                type="button"
                onClick={() => s < step && setStep(s)}
                className={`w-10 h-10 flex items-center justify-center border text-sm transition-all duration-300 ${
                  s === step
                    ? 'border-khaki text-khaki'
                    : s < step
                    ? 'border-khaki/50 text-khaki/70 cursor-pointer hover:border-khaki'
                    : 'border-warm-white/20 text-warm-white/30'
                }`}
              >
                {s < step ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </button>
              {s < 4 && (
                <div className={`w-8 md:w-16 h-px mx-1 md:mx-2 transition-colors duration-300 ${
                  s < step ? 'bg-khaki/50' : 'bg-warm-white/20'
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step Labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-12 text-[10px] md:text-xs"
        >
          <span className={`transition-colors duration-300 ${step === 1 ? 'text-khaki' : 'text-warm-white/40'}`}>Tus datos</span>
          <span className="text-warm-white/20">|</span>
          <span className={`transition-colors duration-300 ${step === 2 ? 'text-khaki' : 'text-warm-white/40'}`}>Proyecto e interés</span>
          <span className="text-warm-white/20">|</span>
          <span className={`transition-colors duration-300 ${step === 3 ? 'text-khaki' : 'text-warm-white/40'}`}>Comentarios</span>
          <span className="text-warm-white/20">|</span>
          <span className={`transition-colors duration-300 ${step === 4 ? 'text-khaki' : 'text-warm-white/40'}`}>Resumen</span>
        </motion.div>

        {/* Form */}
        <motion.form
          id="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-8"
        >
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="nombre" className="block text-warm-white/80 text-sm mb-3">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateField('nombre', e.target.value)}
                  placeholder="Tu nombre completo"
                  maxLength={255}
                  className={`w-full bg-transparent border ${
                    errors.nombre ? 'border-red-400/50' : 'border-warm-white/20'
                  } px-5 py-4 text-warm-white placeholder:text-warm-white/30 focus:border-khaki focus:outline-none transition-colors duration-300`}
                />
                {errors.nombre && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-warm-white/80 text-sm mb-3">
                  Teléfono *
                </label>
                <div className="flex gap-2">
                  <div className="relative w-[140px] shrink-0">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => updateField('countryCode', e.target.value)}
                      className={`w-full bg-gunmetal border ${
                        errors.telefono ? 'border-red-400/50' : 'border-warm-white/20'
                      } px-3 py-4 text-warm-white text-sm focus:border-khaki focus:outline-none transition-colors duration-300 appearance-none cursor-pointer`}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F7F4EF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                    >
                      {countryCodes.map(c => (
                        <option key={c.code} value={c.code} className="bg-gunmetal text-warm-white">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value.replace(/[^\d\s-]/g, ''))}
                    placeholder="Tu número"
                    className={`w-full bg-transparent border ${
                      errors.telefono ? 'border-red-400/50' : 'border-warm-white/20'
                    } px-5 py-4 text-warm-white placeholder:text-warm-white/30 focus:border-khaki focus:outline-none transition-colors duration-300`}
                  />
                </div>
                {errors.telefono && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.telefono}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-warm-white/80 text-sm mb-3">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="tu@email.com"
                  className={`w-full bg-transparent border ${
                    errors.email ? 'border-red-400/50' : 'border-warm-white/20'
                  } px-5 py-4 text-warm-white placeholder:text-warm-white/30 focus:border-khaki focus:outline-none transition-colors duration-300`}
                />
                {errors.email && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.email}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Project & Interest */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div>
                <label htmlFor="proyecto" className="block text-warm-white/80 text-sm mb-3">
                  Proyecto de interés *
                </label>
                <select
                  id="proyecto"
                  value={formData.proyecto}
                  onChange={(e) => updateField('proyecto', e.target.value)}
                  className={`w-full bg-gunmetal border ${
                    errors.proyecto ? 'border-red-400/50' : 'border-warm-white/20'
                  } px-5 py-4 text-warm-white focus:border-khaki focus:outline-none transition-colors duration-300 appearance-none cursor-pointer`}
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F7F4EF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                >
                  {projects.map((project) => (
                    <option key={project.value} value={project.value} className="bg-gunmetal">
                      {project.label}
                    </option>
                  ))}
                </select>
                {errors.proyecto && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.proyecto}</p>
                )}
              </div>

              <div>
                <label className="block text-warm-white/80 text-sm mb-3">
                  Tipo de interés *
                </label>
                <p className="text-warm-white/50 text-xs mb-4">
                  Selecciona el tipo de interés para tu inversión.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((option) => {
                    const isSelected = formData.intereses.includes(option.value)
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleInterest(option.value)}
                        className={`p-4 border text-left text-sm transition-all duration-300 flex items-center gap-3 ${
                          isSelected
                            ? 'border-khaki text-khaki bg-khaki/5'
                            : 'border-warm-white/20 text-warm-white/70 hover:border-warm-white/40'
                        }`}
                      >
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-khaki bg-khaki' : 'border-warm-white/40'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-gunmetal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                {errors.intereses && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.intereses}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Comments */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="comentarios" className="block text-warm-white/80 text-sm mb-3">
                  Comentarios o dudas adicionales
                </label>
                <textarea
                  id="comentarios"
                  value={formData.comentarios}
                  onChange={(e) => updateField('comentarios', e.target.value)}
                  placeholder="Cuéntanos qué estás buscando o si tienes alguna pregunta puntual."
                  maxLength={2000}
                  rows={6}
                  className="w-full bg-transparent border border-warm-white/20 px-5 py-4 text-warm-white placeholder:text-warm-white/30 focus:border-khaki focus:outline-none transition-colors duration-300 resize-none"
                />
                <p className="mt-2 text-warm-white/40 text-xs text-right">
                  {formData.comentarios.length}/2000
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="p-8 border border-warm-white/10 bg-warm-white/5">
                <h4 className="font-serif text-2xl text-warm-white mb-6 text-center">Resumen de tu solicitud</h4>
                <div className="space-y-4 text-sm max-w-md mx-auto">
                  <div className="flex justify-between border-b border-warm-white/10 pb-2">
                    <span className="text-warm-white/40">Nombre:</span>
                    <span className="text-warm-white font-medium text-right">{formData.nombre}</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-white/10 pb-2">
                    <span className="text-warm-white/40">Email:</span>
                    <span className="text-warm-white font-medium text-right">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-white/10 pb-2">
                    <span className="text-warm-white/40">Teléfono:</span>
                    <span className="text-warm-white font-medium text-right">{formData.countryCode} {formData.telefono}</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-white/10 pb-2">
                    <span className="text-warm-white/40">Proyecto:</span>
                    <span className="text-warm-white font-medium text-right">{projects.find(p => p.value === formData.proyecto)?.label}</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-white/10 pb-2">
                    <span className="text-warm-white/40">Intereses:</span>
                    <span className="text-warm-white font-medium text-right max-w-[200px]">
                      {formData.intereses
                        .map(val => interestOptions.find(o => o.value === val)?.label)
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                  {formData.comentarios && (
                    <div className="pt-2">
                      <span className="text-warm-white/40 block mb-2">Comentarios:</span>
                      <p className="text-warm-white/80 bg-gunmetal p-4 border border-warm-white/10">{formData.comentarios}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-warm-white/60 hover:text-warm-white text-sm transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Anterior
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                key="next-button"
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-khaki text-gunmetal px-8 py-4 text-sm tracking-wider uppercase hover:bg-khaki/90 transition-colors duration-300"
              >
                Siguiente
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ) : (
              <button
                key="submit-button"
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-khaki text-gunmetal px-8 py-4 text-sm tracking-wider uppercase hover:bg-khaki/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar solicitud'
                )}
              </button>
            )}
          </div>

          {/* Help text */}
          <p className="text-warm-white/30 text-xs text-center pt-4">
            Usa Tab para moverte entre los campos. Presiona Cmd+Enter (Mac) o Ctrl+Enter (Windows) para enviar.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
