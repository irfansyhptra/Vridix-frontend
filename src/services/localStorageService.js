// src/services/localStorageService.js

const USERS_KEY = "vridix_users";
const PROJECTS_KEY = "vridix_projects";
const PRODUCTS_KEY = "vridix_products";
const ORDERS_KEY = "vridix_orders";
const TRACEABILITY_KEY = "vridix_traceability";

const get = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage`, error);
    return null;
  }
};

const set = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage`, error);
  }
};

export const localStorageService = {
  // --- Seed Initial Data ---
  seedInitialData: (mockData) => {
    if (!get(USERS_KEY)) {
      set(USERS_KEY, mockData.users);
    }
    if (!get(PROJECTS_KEY)) {
      set(PROJECTS_KEY, mockData.crowdfundingProjects);
    }
    if (!get(PRODUCTS_KEY)) {
      set(PRODUCTS_KEY, mockData.marketplaceProducts);
    }
    if (!get(ORDERS_KEY)) {
      set(ORDERS_KEY, mockData.orderHistory);
    }
    if (!get(TRACEABILITY_KEY)) {
      set(TRACEABILITY_KEY, mockData.traceabilityData);
    }
  },

  // --- User Functions ---
  getUsers: () => get(USERS_KEY) || [],
  getUserByWallet: (walletAddress) => {
    const users = get(USERS_KEY) || [];
    return users.find(
      (u) => u.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
  },
  addUser: (user) => {
    const users = get(USERS_KEY) || [];
    set(USERS_KEY, [...users, user]);
  },

  // --- Project Functions ---
  getProjects: () => get(PROJECTS_KEY) || [],
  getProjectById: (id) => {
    const projects = get(PROJECTS_KEY) || [];
    return projects.find((p) => p.id === id);
  },
  fundProject: (projectId, amount) => {
    let projects = get(PROJECTS_KEY) || [];
    projects = projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, terkumpul: p.terkumpul + amount };
      }
      return p;
    });
    set(PROJECTS_KEY, projects);
  },

  // --- Product Functions ---
  getProducts: () => get(PRODUCTS_KEY) || [],

  // --- Order Functions ---
  getOrdersByWallet: (walletAddress) => {
    const orders = get(ORDERS_KEY) || [];
    return orders.filter(
      (o) => o.userWallet.toLowerCase() === walletAddress.toLowerCase()
    );
  },

  // --- Traceability Functions ---
  getTraceabilityData: (traceabilityId) => {
    const allData = get(TRACEABILITY_KEY) || {};
    return allData[traceabilityId];
  },
};
