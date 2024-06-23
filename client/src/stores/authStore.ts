import { create } from 'zustand';
import { IAuthLogin, IAuthRegister } from '@/types/auth.interface';
import { AuthService } from '@/services/auth';
import { removeTokensStorage } from '@/core/handleTokens';
import { IResponseUser } from '@/types/user.interface';

type AuthState = {
  user: IResponseUser | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (data: IAuthLogin) => void;
  signup: (data: IAuthRegister) => void;
  logout: () => void;
  checkAuth: () => void;
};

const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  login: async (form: IAuthLogin) => {
    try {
      const data = await AuthService.login(form);
      console.log(data);
      
      const user = data.user;
      set({ user, isAuth: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));

      return 'Success';
    } catch (error) {
      return 'Error';
    }
  },
  signup: async (form: IAuthRegister) => {
    try {
      const data = await AuthService.register(form);
      
      const user = data.user;
      set({ user, isAuth: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuth: false, isLoading: false });
    removeTokensStorage()
    localStorage.removeItem('user');
  },
  checkAuth: async () => {
    try {
      const response = await AuthService.getNewTokens();
      const user = response.data.user;
      set({ user, isAuth: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuth: false, isLoading: false });
    }
  }
}));

export default useAuth;