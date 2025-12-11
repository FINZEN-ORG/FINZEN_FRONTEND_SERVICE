import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { motivationalMessageStyles } from './MotivationalMessage.Style';
import { getRandomMessage, getRandomLoadingMessage } from '../../data/motivationalMessages';

interface MotivationalMessageProps {
  containerStyle?: any;
}

const STORAGE_KEY = '@finzen_onboarding_v1';
const MESSAGE_STORAGE_KEY = '@finzen_motivational_message';
const USER_SESSION_KEY = '@finzen_user_session_id';
const WEBHOOK_URL = 'https://hook.us2.make.com/4uwdsynosnfq1d51mzep7lnzk982wcgs';

const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ containerStyle }) => {
  const [message, setMessage] = useState<string>(getRandomLoadingMessage());
  const [loading, setLoading] = useState<boolean>(true);

  const checkAndFetchMessage = async () => {
    try {
      // MODO PRUEBAS: Siempre generar mensaje nuevo cada vez que se monta el componente
      await fetchMotivationalMessage();
      
      // TODO: Descomentar esto cuando termines las pruebas para activar el cache de 24 horas
      /*
      // Obtener ID de sesión actual del usuario (puede ser su ID o token)
      const currentSessionData = await AsyncStorage.getItem(USER_SESSION_KEY);
      const savedMessageData = await AsyncStorage.getItem(MESSAGE_STORAGE_KEY);
      
      if (savedMessageData) {
        const { message: savedMessage, timestamp, sessionId } = JSON.parse(savedMessageData);
        
        // Si el usuario cerró sesión (sessionId diferente), regenerar mensaje
        if (sessionId !== currentSessionData) {
          await fetchMotivationalMessage();
          return;
        }
        
        const now = new Date().getTime();
        const hoursSinceLastFetch = (now - timestamp) / (1000 * 60 * 60);
        
        // Si han pasado menos de 24 horas, usar el mensaje guardado
        if (hoursSinceLastFetch < 24) {
          setMessage(savedMessage);
          setLoading(false);
          return;
        }
      }
      
      // Si no hay mensaje guardado o ya pasaron 24 horas, buscar uno nuevo
      await fetchMotivationalMessage();
      */
    } catch (error) {
      console.error('Error checking saved message:', error);
      await fetchMotivationalMessage();
    }
  };

  useEffect(() => {
    checkAndFetchMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMotivationalMessage = async () => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    try {
      setLoading(true);
      
      // Obtener el tono del usuario desde el onboarding
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      let tone: 'formal' | 'amigable' | 'relaxed' = 'amigable';
      
      if (raw) {
        const onboardingData = JSON.parse(raw);
        tone = onboardingData.tone || 'amigable';
      }

      // Timer de 1 minuto para mostrar mensaje genérico si no hay respuesta
      timeoutId = setTimeout(() => {
        setMessage('⏱️ TIMEOUT: La IA no respondió en 1 minuto');
        setLoading(false);
      }, 60000);

      // Hacer la petición al webhook con el tono
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tono: tone }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Extraer el mensaje de la estructura del webhook
        try {
          // Intentar obtener el campo result
          const resultMessage = data[0]?.body?.result || data?.body?.result || data?.result;
          
          // Obtener ID de sesión actual
          const currentSessionData = await AsyncStorage.getItem(USER_SESSION_KEY);
          
          if (resultMessage) {
            setMessage(resultMessage);
            // Guardar el mensaje con timestamp y sessionId
            await AsyncStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify({
              message: resultMessage,
              timestamp: new Date().getTime(),
              sessionId: currentSessionData
            }));
          } else {
            // Si no hay result, intentar la estructura anterior con output
            const responseBody = data[0]?.body;
            const messageOutput = responseBody?.output?.find((item: any) => item.type === 'message');
            const textContent = messageOutput?.content?.[0]?.text;
            
            if (textContent) {
              setMessage(textContent);
              // Guardar el mensaje con timestamp y sessionId
              await AsyncStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify({
                message: textContent,
                timestamp: new Date().getTime(),
                sessionId: currentSessionData
              }));
            } else {
              setMessage('⚠️ RESPUESTA SIN MENSAJE: ' + JSON.stringify(data));
            }
          }
        } catch (e) {
          setMessage('❌ ERROR AL PARSEAR: ' + JSON.stringify(data));
        }
      } else {
        setMessage(`❌ HTTP ERROR ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching motivational message:', error);
      setMessage('❌ FETCH ERROR: ' + (error as Error).message);
    } finally {
      // Cancelar el timeout al finalizar
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setLoading(false);
    }
  };

  return (
    <View style={[motivationalMessageStyles.container, containerStyle]}>
      <View style={motivationalMessageStyles.iconContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#00c66d" />
        ) : (
          <Text style={motivationalMessageStyles.icon}>💡</Text>
        )}
      </View>
      <Text style={motivationalMessageStyles.message}>{message}</Text>
    </View>
  );
};

export default MotivationalMessage;
