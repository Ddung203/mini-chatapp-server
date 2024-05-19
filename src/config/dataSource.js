import { DataSource } from "typeorm";
import dataSourceConfig from "./dataSource.config.js";

export const dataSource = new DataSource(dataSourceConfig);

export const initializeDataSource = async () => {
  try {
    await dataSource.initialize();
    console.log("Data source has been initialized!");
  } catch (error) {
    console.error("Error during data source initialization:", error);
  }
};
