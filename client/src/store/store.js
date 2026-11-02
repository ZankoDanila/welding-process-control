import { configureStore } from '@reduxjs/toolkit'

import equipmentReducer from './slices/equipmentSlice'
import adminReducer from './slices/adminSlice'


export const store = configureStore({
    reducer: {
        equipment: equipmentReducer,
        admin: adminReducer,
    },
})
