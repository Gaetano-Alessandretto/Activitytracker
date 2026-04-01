'use client';
import React, { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';

import { useRouter } from 'next/navigation';
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [residence, setResidence] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
 const router = useRouter();
  const show = () => {
    //@ts-ignore
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
};

  const handleRegister = async (e: any) => {
    setLoading(true)
    e.preventDefault();
    const userData = {
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        firstName: firstName,
        lastName: lastName,
        codiceFiscale: codiceFiscale,
        birthDate: birthDate,
        birthPlace: birthPlace,
        residence: residence
      };
    console.log(userData);
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Trasforma l'oggetto in stringa
      });
      const result = await response.json();
      if (!result.success) {
        Object.values(result.errors).forEach((fieldErrors: any) => {
          fieldErrors.forEach((message: string) => {
            //@ts-ignore
            toast.current.show({
              severity: 'error',
              summary: 'Errore',
              detail: message,
              life: 4000
            });
          });
        });
      }
      else {
        //@ts-ignore
        toast.current.show({
          severity: 'success',
          summary: 'Successo',
          detail: 'Registrazione effettuata con successo',
          life: 3000
        });

        setTimeout(() => {
          router.push('/components/Home');
        }, 1000);
      }
      setLoading(false)
  };


  // Stile comune per le etichette
  const labelStyle = { fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', marginLeft: '2px' };

  // Stile comune per gli InputText
  const inputStyle = {
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    padding: '0.75rem',
    fontSize: '0.9rem',
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10" style={{ backgroundColor: '#F4F8FA' }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '35rem', // Leggermente più largo per ospitare più campi
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          padding: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#020617', marginBottom: '2rem', textAlign: 'center' }}>
          Crea il tuo account
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-5 items-center w-full">

          {/* --- SEZIONE ACCOUNT --- */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="username" style={labelStyle}>Username</label>
              <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Scegli un username" className="w-full" style={inputStyle} required />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" style={labelStyle}>Email</label>
              <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="La tua email" className="w-full" style={inputStyle} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" style={labelStyle}>Password</label>
                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} placeholder="Password"
                  style={{ width: '100%' }} inputStyle={{ ...inputStyle, width: '100%' }} className="w-full" inputClassName="w-full" required />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="passwordConfirmation" style={labelStyle}>Conferma Password</label>
                <Password id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} toggleMask feedback={false} placeholder="Ripeti password"
                  style={{ width: '100%' }} inputStyle={{ ...inputStyle, width: '100%' }} className="w-full" inputClassName="w-full" required />
              </div>
            </div>
          </div>

          <Divider style={{ margin: '1rem 0' }} />

          {/* --- SEZIONE ANAGRAFICA --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" style={labelStyle}>Nome</label>
              <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nome" className="w-full" style={inputStyle} required />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" style={labelStyle}>Cognome</label>
              <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Cognome" className="w-full" style={inputStyle} required />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="codiceFiscale" style={labelStyle}>Codice Fiscale</label>
            <InputText id="codiceFiscale" value={codiceFiscale} onChange={(e) => setCodiceFiscale(e.target.value.toUpperCase())} placeholder="Codice Fiscale" className="w-full" style={{ ...inputStyle, textTransform: 'uppercase' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="birthDate" style={labelStyle}>Data di Nascita</label>
              <InputText id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full" style={inputStyle}  />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="birthPlace" style={labelStyle}>Luogo di Nascita</label>
              <InputText id="birthPlace" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="Città (Prov)" className="w-full" style={inputStyle}  />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="residence" style={labelStyle}>Residenza</label>
            <InputText id="residence" value={residence} onChange={(e) => setResidence(e.target.value)} placeholder="Via, Città, CAP" className="w-full" style={inputStyle} required />
          </div>

          <Button
  label={loading ? "Registrazione in corso..." : "Registrati"}
  icon="pi pi-user-plus"
  type="submit"
  loading={loading}
  style={{
    marginTop: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#3bcde7',
    border: 'none',
    padding: '0.75rem 1rem',
    width: '100%',
    maxWidth: '20rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem'
  }}
/>
        </form>
      </Card>
      <div className="card flex justify-content-center">
            <Toast ref={toast} />

        </div>
    </div>
  );
}
