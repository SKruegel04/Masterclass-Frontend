import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import UserListView from "../UserListView.vue";

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("UserListView", () => {
  it("renders properly", () => {
    const wrapper = mount(UserListView, {});
    expect(wrapper.text()).toContain(
      "Hier sehen Sie alle Nutzer von Masterclass!"
    );
  });
});
