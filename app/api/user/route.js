// app/api/user/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json(); 
    console.log("Dati ricevuti dal client:", body);

    const externalResponse = await fetch('https://activity-tracker-be-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // <--- MANCAVA QUESTO!
        'Accept': 'application/json',
      },
      body: JSON.stringify(body), 
    });

    const result = await externalResponse.json();

    // Gestione intelligente della risposta:
    // Se l'API esterna risponde con un errore (es. 401, 422), 
    // riportiamo lo status corretto anche al nostro frontend.
    if (!externalResponse.ok) {
      return NextResponse.json(
        { success: false, message: result.message || "Errore login", errors: result.errors },
        { status: externalResponse.status }
      );
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("Errore nel bridge API:", error);
    return NextResponse.json(
      { success: false, message: "Errore interno del server" },
      { status: 500 }
    );
  }
}