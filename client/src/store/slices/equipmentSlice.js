import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],

  error: null,

  validationErrors: {},

  lastAction: null,
}

function validateEquipment(item) {
  const errors = {}

  if (!item.title?.trim()) {
    errors.title = 'Название оборудования обязательно.'
  }

  if (!item.company?.trim()) {
    errors.company = 'Необходимо указать организацию.'
  }

  return errors
}


const equipmentSlice = createSlice({
  name: 'equipment',

  initialState,

  reducers: {


    addEquipment: {
      reducer(state, action) {
        const equipment = action.payload

        const errors = validateEquipment(equipment)

        if (Object.keys(errors).length > 0) {
          state.validationErrors = errors
          state.error = 'Не удалось добавить оборудование.'
          state.lastAction = 'add:error'
          return
        }


        const duplicate = state.items.some(
          (item) =>
            item.title.trim().toLowerCase() ===
            equipment.title.trim().toLowerCase()
        )


        if (duplicate) {
          state.error =
            'Оборудование с таким названием уже существует.'

          state.validationErrors = {
            title: 'Название должно быть уникальным.',
          }

          state.lastAction = 'add:error'

          return
        }


        state.items.push(equipment)

        state.error = null
        state.validationErrors = {}
        state.lastAction = 'add'
      },

      prepare(equipment) {
        return {
          payload: {
            ...equipment,
            id: equipment.id ?? crypto.randomUUID(),
          },
        }
      },
    },


    readEquipment(state, action) {
      if (!Array.isArray(action.payload)) {
        state.error =
          'Ошибка чтения данных оборудования.'

        state.lastAction = 'read:error'

        return
      }


      state.items = action.payload

      state.error = null
      state.validationErrors = {}
      state.lastAction = 'read'
    },


    updateEquipment(state, action) {
      const updatedEquipment = action.payload

      const errors = validateEquipment(updatedEquipment)

      if (Object.keys(errors).length > 0) {
        state.validationErrors = errors

        state.error =
          'Не удалось изменить оборудование.'

        state.lastAction = 'update:error'

        return
      }


      const index = state.items.findIndex(
        (item) => item.id === updatedEquipment.id
      )


      if (index === -1) {
        state.error =
          'Оборудование для изменения не найдено.'

        state.lastAction = 'update:error'

        return
      }


      const duplicate = state.items.some(
        (item) =>
          item.id !== updatedEquipment.id &&
          item.title.trim().toLowerCase() ===
            updatedEquipment.title.trim().toLowerCase()
      )


      if (duplicate) {
        state.error =
          'Оборудование с таким названием уже существует.'

        state.validationErrors = {
          title: 'Название должно быть уникальным.',
        }

        state.lastAction = 'update:error'

        return
      }


      state.items[index] = updatedEquipment

      state.error = null
      state.validationErrors = {}
      state.lastAction = 'update'
    },


    deleteEquipment(state, action) {
      const id = action.payload

      const exists = state.items.some(
        (item) => item.id === id
      )


      if (!exists) {
        state.error =
          'Оборудование для удаления не найдено.'

        state.lastAction = 'delete:error'

        return
      }


      state.items = state.items.filter(
        (item) => item.id !== id
      )

      state.error = null
      state.validationErrors = {}
      state.lastAction = 'delete'
    },


    clearEquipmentError(state) {
      state.error = null
      state.validationErrors = {}
    },

  },
})


export const {
  addEquipment,
  readEquipment,
  updateEquipment,
  deleteEquipment,
  clearEquipmentError,
} = equipmentSlice.actions


export default equipmentSlice.reducer
