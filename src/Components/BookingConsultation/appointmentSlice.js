import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointments: [
        
    ],
};

const loadFromLocalStorage = () => {
    const data = localStorage.getItem("appointments");
    return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (appointments) => {
    localStorage.setItem("appointments", JSON.stringify(appointments))
};

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: loadFromLocalStorage()},
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
            saveToLocalStorage(state.appointments);
        },
        updateAppointmentStatus: (state, action) => {
            const { id, status } = action.payload;
            const appointment = state.appointments.find(app => app.id === id);
            if (appointment) {
                appointment.status = status;
            }
            saveToLocalStorage(state.appointments);
        },
        removeAppointment: (state, action) => {
            state.appointments = state.appointments.filter(
                appointment => appointment.id !== action.payload
            );
            saveToLocalStorage(state.appointments);
        },
    },
});

export const {addAppointment, updateAppointmentStatus, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;