'use client';

import Breadcrumb from '@/components/layout/Breadcrumb';
import RegistrationForm from '@/components/features/RegistrationForm';

export default function RegisterPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Register Your Business' }]} />
      <RegistrationForm />
    </>
  );
}
