import { describe, it, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

import { mount } from "@vue/test-utils";
import CourseDeleteView from "../courses/CourseDeleteView.vue";

import.meta.env.VITE_API_URL = "http://localhost:8080";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({ params: { id: "5" } })),
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("CourseDeleteView", () => {
  it("renders properly", () => {
    const wrapper = mount(CourseDeleteView, {});
    expect(wrapper.text()).toContain("Möchtest du den Kurs wirklich löschen?");
  });
});
