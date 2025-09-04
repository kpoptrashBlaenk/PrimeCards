import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const AuraDarkPink = definePreset(Aura, {
  config: {
    ripple: true,
    themeMode: 'dark',
  },
  semantic: {
    primary: {
      50: '{pink.50}',
      100: '{pink.100}',
      200: '{pink.200}',
      300: '{pink.300}',
      400: '{pink.400}',
      500: '{pink.500}',
      600: '{pink.600}',
      700: '{pink.700}',
      800: '{pink.800}',
      900: '{pink.900}',
    },
    surface: {
      50: '{stone.50}',
      100: '{stone.100}',
      200: '{stone.200}',
      300: '{stone.300}',
      400: '{stone.400}',
      500: '{stone.500}',
      600: '{stone.600}',
      700: '{stone.700}',
      800: '{stone.800}',
      900: '{stone.900}',
    },
  },
})

export default AuraDarkPink
