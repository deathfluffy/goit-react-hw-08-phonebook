import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { $authInstance } from '../../redux/auth/authSlice';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await $authInstance.get('/contacts');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/contacts', formData);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRemoveContact = createAsyncThunk(
  'contacts/apiRemoveContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await $authInstance.delete(`/contacts/${contactId}`);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const getActions = type =>
  isAnyOf(apiGetContacts[type], apiAddContact[type], apiRemoveContact[type]);


const initialState = { 
  items: [],
  isLoading: false,
  error: null,
 };


const contactsSlice = createSlice({
  name: 'contacts',
  initialState, 
  extraReducers: builder =>
    builder
    .addCase(apiGetContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload; 
    })
    .addCase(apiAddContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = [...state.items, action.payload];
    })
    .addCase(apiRemoveContact.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    })
      .addMatcher(getActions('pending'), state => {
  
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, action) => {
   
        state.isLoading = false; 
        state.error = action.payload; 
      })
      .addMatcher(getActions('fulfilled'), state => {

        state.isLoading = false; 
        state.error = null; 
      }),
});

export const contactsReducer = contactsSlice.reducer;