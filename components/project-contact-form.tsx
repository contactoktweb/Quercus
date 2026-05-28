"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface ProjectContactFormProps {
  projectName: string
  selectedLot?: string | null
}

const interestOptions = [
  { id: 'vivencial-100', label: '100% vivencial - 0% financiero', description: 'Busco un espacio para vivir o disfrutar' },
  { id: 'vivencial-75', label: '75% vivencial - 25% financiero', description: 'Principalmente para uso personal con algo de inversión' },
  { id: 'vivencial-50', label: '50% vivencial - 50% financiero', description: 'Balance entre uso personal e inversión' },
  { id: 'vivencial-25', label: '25% vivencial - 75% financiero', description: 'Principalmente inversión con uso ocasional' },
  { id: 'financiero-100', label: '0% vivencial - 100% financiero', description: 'Busco una oportunidad de inversión' },
  { id: 'unsure', label: 'Aún no estoy seguro', description: 'Me gustaría conocer más opciones' },
]

export function ProjectContactForm({ projectName, selectedLot }: ProjectContactFormProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: '',
    comments: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleInterestSelect = (interestId: string) => {
    setFormData(prev => ({ ...prev, interest: interestId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-crystal-blue/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-crystal-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-gunmetal mb-4">Solicitud enviada</h3>
        <p className="text-rifle-green/70 mb-8 max-w-md mx-auto">
          Gracias por tu interés en {projectName}. Nuestro equipo se pondrá en contacto contigo pronto.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-khaki text-sm tracking-luxury uppercase hover:text-gunmetal transition-colors duration-300"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    )
  }

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <span className="text-xs tracking-luxury uppercase text-khaki block mb-6">Contacto</span>
        <h2 className="font-serif text-3xl md:text-4xl text-gunmetal mb-4">
          Solicita información sobre {projectName}
        </h2>
        <p className="text-rifle-green/70 max-w-lg mx-auto">
          Déjanos tus datos y nuestro equipo te compartirá información detallada, disponibilidad y próximos pasos.
        </p>
      </motion.div>

      {selectedLot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-crystal-blue/10 border border-crystal-blue/30 p-4 mb-8 text-center"
        >
          <span className="text-sm text-gunmetal">
            Has seleccionado el <strong>Lote {selectedLot}</strong>
          </span>
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Personal info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-xs tracking-luxury uppercase text-rifle-green/60 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-silver-sand/50 py-3 text-gunmetal placeholder:text-silver-sand/50 focus:border-gunmetal focus:outline-none transition-colors duration-300"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs tracking-luxury uppercase text-rifle-green/60 mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-silver-sand/50 py-3 text-gunmetal placeholder:text-silver-sand/50 focus:border-gunmetal focus:outline-none transition-colors duration-300"
              placeholder="+52 999 123 4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs tracking-luxury uppercase text-rifle-green/60 mb-2">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-silver-sand/50 py-3 text-gunmetal placeholder:text-silver-sand/50 focus:border-gunmetal focus:outline-none transition-colors duration-300"
            placeholder="tu@email.com"
          />
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="project" value={projectName} />
        {selectedLot && <input type="hidden" name="selectedLot" value={selectedLot} />}

        {/* Interest selection */}
        <div>
          <label className="block text-xs tracking-luxury uppercase text-rifle-green/60 mb-4">
            Tu interés principal *
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            {interestOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleInterestSelect(option.id)}
                className={`text-left p-4 border transition-all duration-300 ${
                  formData.interest === option.id
                    ? 'border-khaki bg-khaki/10'
                    : 'border-silver-sand/30 hover:border-silver-sand/60'
                }`}
              >
                <span className={`block text-sm mb-1 ${formData.interest === option.id ? 'text-gunmetal font-medium' : 'text-gunmetal'}`}>
                  {option.label}
                </span>
                <span className="text-xs text-rifle-green/50">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block text-xs tracking-luxury uppercase text-rifle-green/60 mb-2">
            Comentarios o dudas adicionales
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            value={formData.comments}
            onChange={handleChange}
            className="w-full bg-transparent border border-silver-sand/30 p-4 text-gunmetal placeholder:text-silver-sand/50 focus:border-gunmetal focus:outline-none transition-colors duration-300 resize-none"
            placeholder="Cuéntanos más sobre lo que buscas..."
          />
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.interest}
            className="bg-gunmetal text-warm-white text-sm tracking-luxury uppercase px-12 py-4 hover:bg-rifle-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar solicitud'
            )}
          </button>
        </div>
      </motion.form>
    </div>
  )
}
