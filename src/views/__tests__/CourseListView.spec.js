import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import CourseListView from "../CourseListView.vue";

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("CourseListView", () => {
  it("renders properly", () => {
    const wrapper = mount(CourseListView, {});
    expect(wrapper.text()).toContain("Alle Kurse");
  });
});
