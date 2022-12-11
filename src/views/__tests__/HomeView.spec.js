import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "../HomeView.vue";

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeView, {});
    expect(wrapper.text()).toContain("Willkommen auf Masterclass");
  });
});
