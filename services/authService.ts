import axios from 'axios';
import { API_BASE_URL } from '../src/config/api';

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
      const token = localStorage.getItem('verificationToken');
      const response = await axios.post(`${this.baseUrl}/verify-email`, { 
        email, 
        code,
        token,
        timestamp: localStorage.getItem('lastVerificationAttempt')
      });

      if (response.data.success) {
        localStorage.removeItem('verificationToken');
        localStorage.removeItem('lastVerificationAttempt');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Verification error:', error);
      throw new Error(error.response?.data?.message || 'Verification failed');
    }
  }

  async sendVerificationCode(email: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/send-verification`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
      
      // Store verification token and timestamp
      localStorage.setItem('verificationToken', response.data.token);
      localStorage.setItem('lastVerificationAttempt', Date.now().toString());
      return response.data;
    } catch (error: any) {
      console.error('Email verification error:', error);
      throw new Error(error.response?.data?.message || 'Failed to send verification email');
    }
  }

 
  logout() {
    localStorage.removeItem('token');
  }
}