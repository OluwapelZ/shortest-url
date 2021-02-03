import { Logger } from "../../src/utils";

export const LoggerMock = jest.fn<Logger, []>(() => {
  return {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    trace: jest.fn(),
    debug: jest.fn(),
  };
});

export const CacheMock = jest.fn().mockImplementation(() => {
  return {
    set: jest.fn(),
    get: jest.fn(),
    getJson: jest.fn(),
  }
});
