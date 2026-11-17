import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name:'cart',
  initialState:{items:[]},
  reducers:{
    addItem:(state,action)=>{
      const existing=state.items.find(i=>i.id===action.payload.id);
      if(existing) existing.quantity++;
      else state.items.push({...action.payload,quantity:1});
    },
    increaseItem:(state,action)=>{
      const item=state.items.find(i=>i.id===action.payload);
      if(item)item.quantity++;
    },
    decreaseItem:(state,action)=>{
      const item=state.items.find(i=>i.id===action.payload);
      if(item){
        item.quantity--;
        if(item.quantity<=0)state.items=state.items.filter(i=>i.id!==action.payload);
      }
    },
    removeItem:(state,action)=>{
      state.items=state.items.filter(i=>i.id!==action.payload);
    }
  }
});

export const {addItem,increaseItem,decreaseItem,removeItem}=cartSlice.actions;
export default cartSlice.reducer;
