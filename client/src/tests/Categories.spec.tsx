import { renderWithClient, screen, waitFor } from "./helper";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, Mock, vi } from "vitest";
import Categories from "@features/categories/Categories";
import type { Category } from "@shared/types";
import { ICON } from "@shared/types";
import { beforeEach } from "node:test";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@queries";

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Work",
    icon: ICON.AddressBook,
    description: "Category for work-related tasks",
  },
  {
    id: 2,
    name: "Personal",
    icon: ICON.User,
    description: "Category for personal tasks",
  },
  {
    id: 3,
    name: "Shopping",
    icon: ICON.ShoppingCart,
    description: "Category for shopping-related tasks",
  },
];

vi.mock("@queries", async () => {
  return {
    useCategories: vi.fn(),
    useCreateCategory: vi.fn(() => ({
      mutate: vi.fn(),
    })),
    useUpdateCategory: vi.fn(() => ({
      mutate: vi.fn(),
    })),
    useDeleteCategory: vi.fn(() => ({
      mutate: vi.fn(),
    })),
    useTasks: vi.fn(() => ({
      data: [],
    })),
  };
});

const renderComponent = () => renderWithClient(<Categories />);

describe("<Categories />", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render page title", () => {
    (useCategories as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });
    renderComponent();
    expect(
      screen.getByRole("heading", { name: "Categories" }),
    ).toBeInTheDocument();
  });

  it("should render spinner while loading categories", async () => {
    (useCategories as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getByRole("progressbar")).toBeInTheDocument(),
    );
  });

  it("should render error message when loading categories fails", async () => {
    (useCategories as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: {
        message: "Failed to fetch categories",
      },
    });
    renderComponent();

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch categories"),
      ).toBeInTheDocument();
    });
  });

  it("should render an empty message when no categories are available", async () => {
    (useCategories as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("No categories found.")).toBeInTheDocument();
    });
  });

  it("should render the categories when loaded", async () => {
    (useCategories as Mock).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Work" })).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Personal" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Shopping" }),
      ).toBeInTheDocument();
    });
  });

  it("should update category", async () => {
    const updateCategory = vi.fn();
    (useCategories as Mock).mockReturnValue({
      isLoading: false,
      data: mockCategories,
    });
    (useUpdateCategory as Mock).mockReturnValue({ mutate: updateCategory });

    renderComponent();

    userEvent.click(screen.queryAllByLabelText("Options")[0]);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Edit"));

    expect(
      screen.getByRole("dialog", { name: "Edit Work category" }),
    ).toBeInTheDocument();

    await userEvent.clear(screen.getByRole("textbox", { name: "Name" }));

    await userEvent.type(
      screen.getByRole("textbox", { name: "Name" }),
      "new name{enter}",
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => expect(updateCategory).toHaveBeenCalled());
  });

  it("should delete category", async () => {
    const deleteCategory = vi.fn();
    (useCategories as Mock).mockReturnValue({
      isLoading: false,
      data: mockCategories,
    });
    (useDeleteCategory as Mock).mockReturnValue({ mutate: deleteCategory });

    renderComponent();

    userEvent.click(screen.queryAllByLabelText("Options")[0]);

    await waitFor(() => {
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText("Delete"));
    await userEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() => expect(deleteCategory).toHaveBeenCalled());
  });

  it("should add new category", async () => {
    const addCategory = vi.fn();
    (useCategories as Mock).mockReturnValue({
      isLoading: false,
      data: mockCategories,
    });
    (useCreateCategory as Mock).mockReturnValue({ mutate: addCategory });

    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "Category" }));

    await userEvent.type(
      screen.getByRole("textbox", { name: "Name" }),
      "new name{enter}",
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => expect(addCategory).toHaveBeenCalled());
  });
});
