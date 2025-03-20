import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export class AuthService {
  private baseUrl = `${API_BASE_URL}/auth`;

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(userData: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/signup`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(email: string, code: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/verify-email`, { email, code });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendVerificationCode(email: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/send-verification`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}