const { stage } = ENVIRONMENT;

export const apiUrl = `${stage === "dev" ? "http://localhost:3000" : ""}`;
