import { createStore } from 'vuex'
import list from '../api/list'

const store = createStore({
  state: { 
    employees: [],
    editingEmployee: null,
    editing: false,
    formTitle: '',
    hasErr: false
  },
  mutations: { 
    setEmployees (state, employees) {
      state.employees = employees;
    },
    pushAddedEmployee(state, newEmployee) {
      state.employees.push({
        ...newEmployee,
        id: state.employees.length + 1,
      });
      state.editing = false;
    },
    updateEditedEmployee(state, editedEmployee) {
      const index = state.employees.findIndex(e => e.id === editedEmployee.id);
      state.employees[index] = editedEmployee;
      state.editing = false;
    },
    deleteEmployee(state, currentEmployee) {
      const index = state.employees.findIndex(e => e.id === currentEmployee.id);
      if (index !== -1) {
        state.employees.splice(index, 1);
      }
    },
    addEmployee(state) {
      state.editingEmployee = null
      state.editing = true;
      state.formTitle = 'New Employee'
    },
    editEmployee(state, currentEmployee) {
      state.editing = true;
      state.formTitle = 'Edit Employee';
      state.editingEmployee = { ...currentEmployee };
    },
    setHasErrValue(state, value) {
      state.hasErr = value;
    },
    setEditingValue(state, value) {
      state.editing = value;
    },
  },
  actions: { 
    fetchEmployees ({commit}) {
      return new Promise((resolve) => {
        list.getEmployees(employees => {
          commit('setEmployees', employees)
          resolve()
        })
      })      
    },
    saveAddedEmployee({commit}, newEmployee) {
      commit('pushAddedEmployee', newEmployee)
    },
    saveEditedEmployee({commit}, editedEmployee) {
      commit('updateEditedEmployee', editedEmployee)
    },
    deleteEmployee({commit}, currentEmployee) {
      commit('deleteEmployee', currentEmployee)
    },
    addEmployee({commit}) {
      commit('addEmployee')
    },
    editEmployee({commit}, currentEmployee) {
      commit('editEmployee', currentEmployee)
    },
  },
})

export default store;