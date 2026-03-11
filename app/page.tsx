'use client'; // 1. Fondamentale per far funzionare i componenti PrimeReact

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import LoginForm from './components/LoginForm';

export default function Home() {
  return (
    <main>
     <LoginForm />
    </main>
  );
}