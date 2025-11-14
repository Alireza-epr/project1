import { create } from "zustand";
import { combine } from "zustand/middleware";

export interface IMapStoreStates {
    enableMarker: boolean
    enableROI: boolean
}

export interface IMapStoreActions {
    setEnableROI: (a_Value: boolean) => void
    setEnableMarker: (a_Value: boolean) => void
}

export const useMapStore = create<IMapStoreStates & IMapStoreActions>( 
    combine(
        {
            //States
            enableMarker: false,
            enableROI: false
        },
        (set) => ({
            //Actions
            setEnableROI: (a_Value: boolean) => set( () => ({ enableROI : a_Value })), 
            setEnableMarker: (a_Value: boolean) => set( () => ({ enableMarker : a_Value })), 
        })
    )
)