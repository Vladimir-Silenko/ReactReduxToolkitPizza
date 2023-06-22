import { CombinedState } from 'redux'

declare module 'redux' {
    export interface RootState {
        filter: filterSliceStateType
        cart: CartStateType
        pizza: pizzaStateType
    }
}
