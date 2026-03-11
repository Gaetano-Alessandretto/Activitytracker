// 1. Dichiariamo che questo file è lato client
'use client'; 

import { PrimeReactProvider } from 'primereact/api';

export default function PrimeProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
}