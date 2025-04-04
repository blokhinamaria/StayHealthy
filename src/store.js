import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './Components/BookingConsultation/appointmentSlice.js';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});