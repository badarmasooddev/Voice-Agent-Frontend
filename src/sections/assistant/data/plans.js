//@type
import { Plans } from '@/sections/assistant/type';

export const plansData = [
  {
    title: 'OpenAI',
    plan: Plans.BASIC,
    monthlyPrice: 199,
    yearlyPrice: 699,
    icon: 'IconBox',
    features: ['Core', 'Lite', 'Starter', 'Essential', 'Standard', 'Basic']
  },
  {
    title: 'ElvenLabs',
    plan: Plans.STARTER,
    monthlyPrice: 267,
    yearlyPrice: 899,
    icon: 'IconActivityHeartbeat',
    features: ['Plus', 'Advanced', 'Pro', 'Premium', 'Enhanced', 'Professional']
  },
];
