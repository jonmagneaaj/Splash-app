import {writable} from 'svelte/store'

// The player group
export const group = writable([])

// modal/game settings
export const color = writable()
export const bgcolor = writable()
export const text = writable()
export const title = writable()
export const grad = writable()

//Dificulity
export const diff = writable()

//Reports
export const reportRule = writable()

// Game choice
export const gameChoice = writable()
