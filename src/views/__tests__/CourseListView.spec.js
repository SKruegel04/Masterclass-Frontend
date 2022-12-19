import { describe, it, expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { mount } from "@vue/test-utils";
import CourseListView from "../CourseListView.vue";

import.meta.env.VITE_API_URL = "http://localhost:8080";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

vi.mock("vue-router", () => ({
  RouterLink: vi.fn(),
  resolve: vi.fn(),
}));

describe("CourseListView", () => {
  it("renders properly", async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { id: 1, title: "Ballett", description: "", user: { name: "Martha" } },
        {
          id: 2,
          title: "Kampfsport",
          description: "",
          user: { name: "Berta" },
        },
      ])
    );
    const wrapper = mount(CourseListView, {});
    expect(wrapper.text()).toContain("Alle Kurse");
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(wrapper.text()).toContain("Kampfsport");
  });
});
