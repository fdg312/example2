import { IAddResponse } from "@/types/add.interface";
import { create } from "zustand";

type SessionState = {
    city: string;
    adds: Array<IAddResponse>;
    setCity: (city: string) => void;
    setAdds: (adds: Array<IAddResponse>) => void;
};


const useSessionStore = create<SessionState>((set) => ({
    city: 'Россия',
    adds: [],
    setCity: (city: string) => {
        set({ city })
        localStorage.setItem('city', city)
    },
    setAdds: (adds: Array<IAddResponse>) => set({ adds }),
}));

export default useSessionStore;