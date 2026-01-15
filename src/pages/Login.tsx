import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2838] p-4">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-blue-900/30"> {/* Changed bg-[#2a475e] to bg-gray-900 */}
        <div className="flex flex-col items-center mb-8">
          <i className="fa-brands fa-steam text-6xl text-blue-400 mb-4"></i>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Steam Family</h1>
        </div>
        <Auth
          supabaseClient={supabase}
          providers={[]} // No third-party providers for now
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3b82f6', // Blue-500
                  brandAccent: '#2563eb', // Blue-600
                  brandButtonText: 'white',
                  defaultButtonBackground: '#1f2937', // Gray-800
                  defaultButtonBackgroundHover: '#374151', // Gray-700
                  defaultButtonBorder: '#4b5563', // Gray-600
                  inputBackground: '#1f2937', // Gray-800
                  inputBorder: '#4b5563', // Gray-600
                  inputBorderHover: '#60a5fa', // Blue-400
                  inputBorderFocus: '#3b82f6', // Blue-500
                  inputText: '#e5e7eb', // Gray-200
                  inputLabelText: '#9ca3af', // Gray-400
                  inputPlaceholder: '#6b7280', // Gray-500
                  messageText: '#e5e7eb', // Gray-200
                  messageBackground: '#1f2937', // Gray-800
                  messageBorder: '#4b5563', // Gray-600
                  anchorTextColor: '#60a5fa', // Blue-400
                  anchorTextHoverColor: '#3b82f6', // Blue-500
                },
              },
            },
          }}
          theme="dark" // Using dark theme to match app's aesthetic
          localization={{
            variables: {
              sign_in: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'Tu correo electrónico',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Iniciar sesión',
                social_auth_typography: 'O inicia sesión con',
                link_text: '¿Ya tienes cuenta? Inicia sesión',
                forgotten_password_link_text: '¿Olvidaste tu contraseña?',
                confirmation_text: 'Revisa tu correo para el enlace de confirmación',
              },
              sign_up: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'Tu correo electrónico',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Registrarse',
                social_auth_typography: 'O regístrate con',
                link_text: '¿No tienes cuenta? Regístrate',
                confirmation_text: 'Revisa tu correo para el enlace de confirmación',
              },
              forgotten_password: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'Tu correo electrónico',
                button_label: 'Enviar instrucciones de recuperación',
                link_text: '¿Recordaste tu contraseña? Inicia sesión',
                confirmation_text: 'Revisa tu correo para el enlace de recuperación',
              },
              update_password: {
                password_label: 'Nueva contraseña',
                password_input_placeholder: 'Tu nueva contraseña',
                button_label: 'Actualizar contraseña',
                confirmation_text: 'Tu contraseña ha sido actualizada',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;