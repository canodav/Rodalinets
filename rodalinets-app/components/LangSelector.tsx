import React from 'react';
import { View, Button } from 'react-native';
import useLocaleStore from '@/stores/localeStore';

export const LangSelector = () => {
  const setLocale = useLocaleStore((state) => state.setLocale);
  const locale = useLocaleStore((state) => state.locale);
  const nextLocale = () => {
    const next = { en: 'es', es: 'ca', ca: 'en' };
    setLocale('es');
  };
  return (
    <View>
      <Button title={locale.toUpperCase()} onPress={nextLocale} />
    </View>
  );
};
