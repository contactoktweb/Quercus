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

    // Buscar en Sanity si existe un usuario con esas credenciales
    const user = await client.fetch(
      `*[_type == "editorAuth" && username == $username && password == $password][0]`,
      { username, password }
    )

    if (!user) {
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
