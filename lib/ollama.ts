"use server";
import ollama from "ollama";
export const getOllamaModels = async () => {
  const models = await ollama.list();
  return models;
};
