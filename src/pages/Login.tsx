import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2838] p-4">
      <div className="bg-[#2a475e] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-blue-900/30">
        <div className="flex flex-col items-center mb-8">
          <i className="fa-brands fa-steam text-6xl text-blue-400 mb-4"></i>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Steam Family</h1>
        </div>
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3b82f6', // Blue-500
                  brandAccent: '#2563eb', // Blue-600
                  inputBackground: '#00000030', // Black/30
                  inputBorder: '#374151', // Gray-700
                  inputBorderHover: '#3b82f6', // Blue-500
                  inputBorderFocus: '#3b82f6', // Blue-500
                  inputText: '#ffffff', // White
                  inputLabel: '#9ca3af', // Gray-400
                  messageText: '#ef4444', // Red-500
                  messageBackground: '#fee2e2', // Red-100
                  anchorText: '#93c5fd', // Blue-300
                  anchorTextHover: '#bfdbfe', // Blue-200
                },
              },
            },
          }}
          theme="dark" // Using dark theme to match app's aesthetic
          localization={{
            variables: {
              sign_in: {
                email_label: 'Correo Electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'Tu correo electrónico',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Iniciar Sesión',
                social_provider_text: 'Iniciar sesión con {{provider}}',
                link_text: '¿Ya tienes cuenta? Inicia sesión',
              },
              sign_up: {
                email_label: 'Correo Electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'Tu correo electrónico',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Registrarse',
                social_provider_text: 'Registrarse con {{provider}}',
                link_text: '¿No tienes cuenta? Regístrate',
              },
              forgotten_password: {
                email_label: 'Correo Electrónico',
                email_input_placeholder: 'Tu correo electrónico',
                button_label: 'Enviar instrucciones de recuperación',
                link_text: '¿Olvidaste tu contraseña?',
              },
              update_password: {
                password_label: 'Nueva Contraseña',
                password_input_placeholder: 'Tu nueva contraseña',
                button_label: 'Actualizar Contraseña',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;