import axios from "@/api/interceptors";
import { ICarpenterInput } from "@/components/screens/project/finished-project/carpenters/list-carpenters/add-carpenter/ICarpetnerInput";
import { getCarpenterUrl, getProjectUrl } from "@/config/api.config";
export const ProjectService = {
  // Получить все проекты
  async getAllProjects() {
    try {
      const response = await axios.get(getProjectUrl("/"));

      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Получить проект по ID
  async getProjectById(projectId: any) {
    try {
      const response = await axios.get(getProjectUrl(`/${projectId}`));
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  // Создать новый проект
  async createProject(projectData: any) {
    try {
      const response = await axios.post(getProjectUrl(""), projectData);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  async findProjectByApplicationForm(id: any) {
    const response = await axios.get(
      getProjectUrl(`/find-project-by-application-form/${id}`)
    );
    return response;
  },

  // Обновить проект
  async updateProject(projectId: string, projectData: any) {
    try {
      const response = await axios.put(
        getProjectUrl(`/${projectId}`),
        projectData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  // Удалить проект
  async deleteProject(projectId: string) {
    try {
      const response = await axios.delete(getProjectUrl(`/${projectId}`));
      return response.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  async getDrawings(_id: any) {
    const response = await axios.get(
      getProjectUrl(`/${_id}/drawings`)    
    );
    return response.data;
  },

  async updateDrawings(_id: any, updateProjectDto: any) {
    const response = await axios.put(
      getProjectUrl(`/${_id}/drawings`),
      updateProjectDto
    );
    return response.data;
  },

  
  async getFurnitureDrawings(_id: any) {
    const response = await axios.get(
      getProjectUrl(`/${_id}/furniture-drawings`)    
    );
    return response.data;
  },


  async updateFurnitureDrawings(_id: any, updateProjectDto: any) {
    const response = await axios.put(
      getProjectUrl(`/${_id}/furniture-drawings`),
      updateProjectDto
    );
    return response.data;
  },

  //сервисы для выбора строителя и дизайнера и мебельщика

  async createChosenDesigner(designerData: any, projectId: any) {
    try {
      const response = await axios.post(
        getProjectUrl(`/${projectId}/designer`),
        designerData
      );
      return response.data;
    } catch (error) {
     
      throw error;
    }
  },

  async getDesignerByProjectId(projectId: any) {
    try {
      const response = await axios.get(getProjectUrl(`/${projectId}/designer`));
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  async createChat(senderId: string, receiverId: string, formId: string) {
    const response = await axios.post(getProjectUrl("/create-chat"), {
      senderId,
      receiverId,
      formId,
    });
    return response;
  },

  async getBuilderByProjectId(projectId: any) {
    try {
      const response = await axios.get(getProjectUrl(`/${projectId}/builder`));
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  async createChosenBuilder(builderData: any, projectId: any) {
    try {
      const response = await axios.post(
        getProjectUrl(`/${projectId}/builder`),
        builderData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  async getCarpenterByProjectId(projectId: any) {
    try {
      const response = await axios.get(
        getCarpenterUrl(`/by-project/${projectId}`)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  async createChosenCarpenter(carpenterData: any, projectId: any) {
    try {
      const response = await axios.post(
        getCarpenterUrl(`/${projectId}`),
        carpenterData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },



  async getCarpenterById(_id: any) {
    const response = await axios.get(getCarpenterUrl(`/${_id}`));
    return response.data;
  },

  async updateCarpenter(_id: any, furniture: ICarpenterInput) {
    const response = await axios.put(getCarpenterUrl(`/${_id}`), furniture);
    return response.data;
  },
};
