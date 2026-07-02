'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Dejar un rastro/token de edición en localStorage con expiración de 2 horas
        const expirationHours = 2;
        const expiresAt = new Date().getTime() + expirationHours * 60 * 60 * 1000;
        
        const sessionData = {
          token: 'editor-token-' + Math.random().toString(36).substr(2, 9),
          expiresAt: expiresAt,
          role: 'editor'
        };
        
        localStorage.setItem('quercus_auth_session', JSON.stringify(sessionData));
        
        // Redirigir al inicio o a los proyectos
        router.push('/');
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err: any) {
      setError('Error de conexión. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-gunmetal mb-2">Acceso de Edición</h1>
          <p className="text-sm text-silver-sand">
            Ingresa tus credenciales para habilitar el modo editor en los mapas.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-khaki focus:border-khaki outline-none transition-all"
              placeholder="Ej. admin"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-khaki focus:border-khaki outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gunmetal text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-md mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'}`}
          >
            {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
