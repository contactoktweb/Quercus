"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

const projects = [
  { value: '', label: 'Selecciona un proyecto' },
  { value: 'el-quelele', label: 'El Quelele' },
  { value: 'dunah', label: 'DUNAH' },
  { value: 'quintaesencia', label: 'Quintaesencia' },
  { value: 'quercus-baja', label: 'Quercus Baja' },
  { value: 'elemental', label: 'Elemental' },
  { value: 'ventusbay', label: 'Ventusbay' },
  { value: 'otro', label: 'Otro / Aún no estoy seguro' },
]

const interestOptions = [
  { value: '100-0', label: '100% vivencial - 0% financiero' },
  { value: '75-25', label: '75% vivencial - 25% financiero' },
  { value: '50-50', label: '50% vivencial - 50% financiero' },
  { value: '25-75', label: '25% vivencial - 75% financiero' },
  { value: '0-100', label: '0% vivencial - 100% financiero' },
  { value: 'no-seguro', label: 'Aún no estoy seguro' },
]

type FormData = {
  nombre: string
  proyecto: string
  interes: string
  telefono: string
  email: string
  comentarios: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    proyecto: '',
    interes: '',
    telefono: '',
    email: '',
    comentarios: '',
  })

  const totalSteps = 3

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
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
      if (!formData.interes) newErrors.interes = 'Selecciona tu tipo de interés'
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
    if (!validateStep(step)) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
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
    } else if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault()
      if (step < totalSteps) {
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
            Encuentra tu lugar en Quercus
          </h2>
          <p className="mt-6 text-warm-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
            Gracias por tu interés en los desarrollos de Quercus. Completa tus datos y selecciona el proyecto que te interesa para enviarte información detallada y brindarte atención personalizada.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {[1, 2, 3].map((s) => (
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
              {s < 3 && (
                <div className={`w-12 md:w-20 h-px mx-2 transition-colors duration-300 ${
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
          className="flex items-center justify-center gap-4 mb-12 text-xs"
        >
          <span className={`transition-colors duration-300 ${step === 1 ? 'text-khaki' : 'text-warm-white/40'}`}>
            Tus datos
          </span>
          <span className="text-warm-white/20">|</span>
          <span className={`transition-colors duration-300 ${step === 2 ? 'text-khaki' : 'text-warm-white/40'}`}>
            Proyecto e interés
          </span>
          <span className="text-warm-white/20">|</span>
          <span className={`transition-colors duration-300 ${step === 3 ? 'text-khaki' : 'text-warm-white/40'}`}>
            Comentarios
          </span>
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
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => updateField('telefono', e.target.value)}
                  placeholder="Tu número de teléfono"
                  className={`w-full bg-transparent border ${
                    errors.telefono ? 'border-red-400/50' : 'border-warm-white/20'
                  } px-5 py-4 text-warm-white placeholder:text-warm-white/30 focus:border-khaki focus:outline-none transition-colors duration-300`}
                />
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
                  Selecciona el tipo de interés para tu inversión. El primer porcentaje representa el interés vivencial y el segundo el financiero.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interestOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('interes', option.value)}
                      className={`p-4 border text-left text-sm transition-all duration-300 ${
                        formData.interes === option.value
                          ? 'border-khaki text-khaki bg-khaki/5'
                          : 'border-warm-white/20 text-warm-white/70 hover:border-warm-white/40'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {errors.interes && (
                  <p className="mt-2 text-red-400/80 text-xs">{errors.interes}</p>
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

              {/* Summary */}
              <div className="p-6 border border-warm-white/10 bg-warm-white/5">
                <h4 className="text-warm-white/80 text-sm mb-4">Resumen de tu solicitud</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-warm-white/60">
                    <span className="text-warm-white/40">Nombre:</span> {formData.nombre}
                  </p>
                  <p className="text-warm-white/60">
                    <span className="text-warm-white/40">Email:</span> {formData.email}
                  </p>
                  <p className="text-warm-white/60">
                    <span className="text-warm-white/40">Proyecto:</span> {projects.find(p => p.value === formData.proyecto)?.label}
                  </p>
                  <p className="text-warm-white/60">
                    <span className="text-warm-white/40">Interés:</span> {interestOptions.find(o => o.value === formData.interes)?.label}
                  </p>
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
