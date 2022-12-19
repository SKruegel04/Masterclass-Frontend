import { describe, it, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { mount } from "@vue/test-utils";
import CourseCreateView from "../courses/CourseCreateView.vue";

import.meta.env.VITE_API_URL = "http://localhost:8080";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("CourseCreateView", () => {
  it("renders properly", () => {
    fetch.mockResponse(JSON.stringify([{ id: 1 }, { id: 2 }]));
    const wrapper = mount(CourseCreateView, {});
    expect(wrapper.text()).toContain("Kursname");
  });
});
