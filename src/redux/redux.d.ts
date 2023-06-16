import { CombinedState } from 'redux'

declare module 'redux' {
    export interface RootState {
        filter: any
        cart: any
        pizza: pizzaStateType
    }
}
