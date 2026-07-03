import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar en la configuración global de Sanity si existen esas credenciales
    const config = await client.fetch(
      `*[_type == "globalConfig" && editorUsername == $username && editorPassword == $password][0]`,
      { username, password }
    )

    if (!config) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Autenticación exitosa',
    })
  } catch (error: any) {
    console.error('Error en auth login:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
