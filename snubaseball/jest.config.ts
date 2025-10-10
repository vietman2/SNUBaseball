/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: [["text", { skipFull: true }], "lcov"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/jest.setup.tsx"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*/index.ts",
    "!src/**/*.styles.ts",
    "!src/**/*/server.ts",
    "!src/**/*/styles.ts",
    "!src/**/configs/**",
    "!src/**/data/**",
    "!src/**/models/**",
    "!src/**/*.d.ts",
    "!src/**/@x/*",
    "!src/test-utils/renderer.tsx",
  ],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/01.app/$1",
    "^@pages/(.*)$": "<rootDir>/src/02.pages/$1",
    "^@widgets/(.*)$": "<rootDir>/src/03.widgets/$1",
    "^@features/(.*)$": "<rootDir>/src/04.features/$1",
    "^@entities/(.*)$": "<rootDir>/src/05.entities/$1",
    "^@shared/(.*)$": "<rootDir>/src/06.shared/$1",
    "^@test-utils/(.*)$": "<rootDir>/src/test-utils/$1",
  },
};

export default createJestConfig(config);
