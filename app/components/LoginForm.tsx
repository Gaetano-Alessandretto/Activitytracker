'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const router = useRouter(); // Inizializzi il router
   const handleLogin = async (e: any) => {

    e.preventDefault();

    console.log("Dati inviati:", { email, password });

    const userData = {

      username: email,

      password: password

    };

    const response = await fetch('/api/user', {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

        },

        body: JSON.stringify(userData), // Trasforma l'oggetto in stringa

      });



      const result = await response.json();

      console.log("Risposta dal server:", result);

      router.push('/components/Home');

  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#F4F8FA' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '30rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          padding: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#020617', marginBottom: '2.5rem' }}>
          Accedi al tuo account
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 items-center w-full">
          
          {/* Campo Email */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>
              Email
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="w-full" // Usiamo Tailwind per la larghezza
              style={{
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                padding: '0.75rem',
                fontSize: '0.9rem',
              }}
              required
            />
          </div>

          {/* Campo Password - FIX APPLICATO QUI */}
          <div className="flex flex-col gap-2 w-full">
  <label
    htmlFor="password"
    style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginLeft: '2px' }}
  >
    Password
  </label>
  <Password
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    toggleMask
    feedback={false}
    placeholder="La tua password"
    
    // 1. Forza il contenitore esterno (quello che vedi nel DOM come .p-password)
    style={{ width: '100%' }}
    
    // 2. Forza l'input vero e proprio a occupare tutto lo spazio del contenitore
    inputStyle={{
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      padding: '0.75rem',
      fontSize: '0.9rem',
    }}

    // 3. Questa è la chiave: forza la classe 'w-full' su ogni elemento interno
    className="w-full"
    inputClassName="w-full" // Forza la classe sull'elemento <input>

    // 4. Centratura perfetta dell'occhio (se il padding lo sposta)
    pt={{
      iconField: { root: { className: 'w-full', style: { position: 'relative', width: '100%' } } },
    }}
    required
  />
</div>

          <Button
            label="Login"
            icon="pi pi-sign-in"
            type="submit"
            disabled={!email || !password}
            style={{
              marginTop: '1.5rem',
              borderRadius: '8px',
              backgroundColor: '#3bcde7',
              border: 'none',
              padding: '0.75rem 2.5rem',
              width: '100%',
              maxWidth: '14rem',
              fontWeight: 600,
            }}
          />
        </form>
      </Card>
    </div>
  );
}