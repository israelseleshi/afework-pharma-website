import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://lu-shared04.dapanel.net/api'; // Replace with your actual API endpoint

// API endpoints
const endpoints = {
  contacts: '/contacts',
  heroStats: '/hero-stats',
  teamMembers: '/team-members',
  solutions: '/solutions',
  login: '/login',
  activityLogs: '/activity-logs',
};

// Types
export interface Contact {
  id: number;
  type: string;
  label: string;
  value: string;
  active: boolean;
}

export interface HeroStat {
  id: number;
  number: number;
  suffix: string;
  label: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  imageUrl: string;
  active: boolean;
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  active: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ActivityLog {
  id: number;
  userId: number;
  actionType: string;
  tableName: string;
  recordId: number;
  details: string;
  createdAt: string;
}

// Create axios instance with auth headers
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const cmsApi = {
  // Auth
  login: async (username: string, password: string) => {
    try {
      const response = await api.post(endpoints.login, { username, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Contacts
  getContacts: async () => {
    try {
      const response = await api.get(endpoints.contacts);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  
  createContact: async (contact: Omit<Contact, 'id'>) => {
    try {
      const response = await api.post(endpoints.contacts, contact);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },
  
  updateContact: async (id: number, contact: Partial<Contact>) => {
    try {
      const response = await api.put(`${endpoints.contacts}/${id}`, contact);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },
  
  deleteContact: async (id: number) => {
    try {
      const response = await api.delete(`${endpoints.contacts}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },
  
  // Hero Stats
  getHeroStats: async () => {
    try {
      const response = await api.get(endpoints.heroStats);
      return response.data;
    } catch (error) {
      console.error('Error fetching hero stats:', error);
      throw error;
    }
  },
  
  createHeroStat: async (stat: Omit<HeroStat, 'id'>) => {
    try {
      const response = await api.post(endpoints.heroStats, stat);
      return response.data;
    } catch (error) {
      console.error('Error creating hero stat:', error);
      throw error;
    }
  },
  
  updateHeroStat: async (id: number, stat: Partial<HeroStat>) => {
    try {
      const response = await api.put(`${endpoints.heroStats}/${id}`, stat);
      return response.data;
    } catch (error) {
      console.error('Error updating hero stat:', error);
      throw error;
    }
  },
  
  deleteHeroStat: async (id: number) => {
    try {
      const response = await api.delete(`${endpoints.heroStats}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting hero stat:', error);
      throw error;
    }
  },
  
  // Team Members
  getTeamMembers: async () => {
    try {
      const response = await api.get(endpoints.teamMembers);
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },
  
  createTeamMember: async (member: Omit<TeamMember, 'id'>) => {
    try {
      const response = await api.post(endpoints.teamMembers, member);
      return response.data;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },
  
  updateTeamMember: async (id: number, member: Partial<TeamMember>) => {
    try {
      const response = await api.put(`${endpoints.teamMembers}/${id}`, member);
      return response.data;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },
  
  deleteTeamMember: async (id: number) => {
    try {
      const response = await api.delete(`${endpoints.teamMembers}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting team member:', error);
      throw error;
    }
  },
  
  // Solutions
  getSolutions: async () => {
    try {
      const response = await api.get(endpoints.solutions);
      return response.data;
    } catch (error) {
      console.error('Error fetching solutions:', error);
      throw error;
    }
  },
  
  // Activity Logs
  getActivityLogs: async (limit = 10) => {
    try {
      const response = await api.get(`${endpoints.activityLogs}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },
};

export default cmsApi;
