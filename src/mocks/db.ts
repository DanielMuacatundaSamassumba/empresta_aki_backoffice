import type { CreateClientType } from "@/modules/customer/types/CreateClientType";
export const db = {
  index(): CreateClientType[] {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  },

  async create(data: any) {
    try {

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid request body');
      }


      const usersData = localStorage.getItem("users");
      let currentData = usersData ? JSON.parse(usersData) : [];


      if (!Array.isArray(currentData)) {
        console.error('Existing data is not an array, resetting storage');
        localStorage.removeItem("users");
        currentData = [];
      }

      const newItem = {
        ...data,
        id: crypto.randomUUID(), // ID único
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };


      const newData = [...currentData, newItem];


      try {
        localStorage.setItem("users", JSON.stringify(newData));
      } catch (storageError) {
        console.error('LocalStorage write error:', storageError);
        throw new Error('Storage quota exceeded');
      }


      return {
        success: true,
        data: newItem,
        metadata: {
          totalItems: newData.length,
          created: newItem.createdAt
        }
      };


    } catch (error) {
      console.error('Handler error:', error);

      return
      const newLocal = {
        success: false,

      };
      return newLocal;
    }

  },

  fundClient(id: string) {
    const dataClient = localStorage.getItem("users");
    const currentData = dataClient ? JSON.parse(dataClient) : []
    const client = currentData.filter((item: any) => item.id == id)
    return client
  },
  updateClient(id: string, data: any) {
    const dataClient = localStorage.getItem("users");
    const currenteData = dataClient ? JSON.parse(dataClient) : [];
    const newData = currenteData.map((item: any) => item.id == id ? {
      ...data,
      id: item.id
    } : item)
    localStorage.setItem("users", JSON.stringify(newData))
    return data
  },
  deleClient(id: string) {
    const dataClient = localStorage.getItem("users");
    const currenteData = dataClient ? JSON.parse(dataClient) : [];
    const newData = currenteData.filter((item: any) => item.id != id);
    localStorage.setItem("users", JSON.stringify(newData));
    return 
  }
}