import "@testing-library/jest-dom";

// vitest.setup.ts
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/node.js";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
