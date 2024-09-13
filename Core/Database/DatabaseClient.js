export default class DatabaseClient {
    async connect() {
      throw new Error("connect() must be implemented");
    }
  
    async executeQuery(query) {
      throw new Error("executeQuery() must be implemented");
    }
  
    async closeConnection() {
      throw new Error("closeConnection() must be implemented");
    }
  }
  