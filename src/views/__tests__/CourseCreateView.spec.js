import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import CourseCreateView from "../courses/CourseCreateView.vue";

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("CourseCreateView", () => {
  it("renders properly", () => {
    const wrapper = mount(CourseCreateView, {});
    expect(wrapper.text()).toContain("Kursname");
  });
});
