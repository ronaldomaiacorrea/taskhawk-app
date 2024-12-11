import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi, Mock } from "vitest";
import CategoryCard, {
  CategoryCardProps,
} from "src/features/categories/components/CategoryCard";
import type { Task } from "@shared/types";
import { ICON, Status } from "@shared/types";
import userEvent from "@testing-library/user-event";
import { useTasks } from "@queries";
import { beforeEach } from "node:test";

const defaultProps: CategoryCardProps = {
  category: {
    id: 1,
    name: "Work",
    icon: ICON.Briefcase,
    description: "Category for work-related tasks",
  },
  onDelete: vi.fn(),
  onEdit: vi.fn(),
};

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    categoryId: 1,
    creationDate: new Date(),
    dueDate: new Date(),
    priority: "High",
    status: Status.TO_DO,
  },
  {
    id: 2,
    title: "Task 2",
    categoryId: 2,
    creationDate: new Date(),
    dueDate: new Date(),
    priority: "High",
    status: Status.COMPLETED,
  },
  {
    id: 3,
    title: "Task 3",
    categoryId: 3,
    creationDate: new Date(),
    dueDate: new Date(),
    priority: "High",
    status: Status.BLOCKED,
  },
];

vi.mock("@queries", async () => {
  return {
    useTasks: vi.fn(),
  };
});

const renderComponent = (props: Partial<CategoryCardProps> = {}) =>
  render(<CategoryCard {...defaultProps} {...props} />);

const getOptions = () => screen.getByLabelText("Options");
const getEditButton = () => screen.getByText("Edit");
const getDeleteButton = () => screen.getByText("Delete");
const getTasksButton = () => screen.getByText("Tasks");

describe("<CategoryCard />", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render category card", async () => {
    (useTasks as Mock).mockReturnValue({
      data: mockTasks,
    });
    renderComponent();

    expect(screen.getByRole("heading", { name: "Work" })).toBeInTheDocument();
    expect(
      screen.getByText("Category for work-related tasks"),
    ).toBeInTheDocument();
  });

  it("should render overlay with delete, edit and tasks when user clicks on options button", async () => {
    (useTasks as Mock).mockReturnValue({
      data: mockTasks,
    });
    renderComponent();

    userEvent.click(getOptions());

    await waitFor(() => {
      expect(getDeleteButton()).toBeInTheDocument();
    });
    expect(getEditButton()).toBeInTheDocument();
    expect(getTasksButton()).toBeInTheDocument();
  });

  it("should disable delete and edit buttons when there are tasks assigned", async () => {
    (useTasks as Mock).mockReturnValue({
      data: mockTasks,
    });
    renderComponent();
    userEvent.click(getOptions());

    await waitFor(() => {
      const editButtonContainer = screen.getByText("Edit").closest("div");
      const deleteButtonContainer = screen.getByText("Delete").closest("div");
      expect(editButtonContainer).toHaveClass("cursor-not-allowed opacity-50");
      expect(deleteButtonContainer).toHaveClass(
        "cursor-not-allowed opacity-50",
      );
    });
  });

  it("should not disable delete and edit buttons when there are not tasks assigned", async () => {
    (useTasks as Mock).mockReturnValue({
      data: [],
    });
    renderComponent();
    userEvent.click(getOptions());

    await waitFor(() => {
      const editButtonContainer = screen.getByText("Edit").closest("div");
      const deleteButtonContainer = screen.getByText("Delete").closest("div");
      expect(editButtonContainer).not.toHaveClass(
        "cursor-not-allowed opacity-50",
      );
      expect(deleteButtonContainer).not.toHaveClass(
        "cursor-not-allowed opacity-50",
      );
    });
  });

  it("should render tooltip when user hovers over delete and edit when tasks are assigned to the category", async () => {
    (useTasks as Mock).mockReturnValue({
      data: mockTasks,
    });
    renderComponent();

    userEvent.click(getOptions());

    await waitFor(() => {
      userEvent.hover(getDeleteButton());
    });

    await waitFor(() =>
      expect(
        screen.getByText(
          "Categories with assigned tasks cannot be edited or deleted.",
        ),
      ).toBeInTheDocument(),
    );
  });

  it("should call onEdit function when user clicks on Edit button", async () => {
    const onEditSpy = vi.fn();
    (useTasks as Mock).mockReturnValue({
      data: [],
    });

    renderComponent({ onEdit: onEditSpy });

    userEvent.click(getOptions());

    await waitFor(() => expect(getEditButton()).toBeInTheDocument());

    userEvent.click(getEditButton());

    await waitFor(() =>
      expect(onEditSpy).toHaveBeenCalledWith({
        id: 1,
        name: "Work",
        icon: ICON.Briefcase,
        description: "Category for work-related tasks",
      }),
    );
  });

  it("should call onDelete function when user clicks on Delete button", async () => {
    const onDeleteSpy = vi.fn();
    (useTasks as Mock).mockReturnValue({
      data: [],
    });

    renderComponent({ onDelete: onDeleteSpy });

    userEvent.click(getOptions());

    await waitFor(() => expect(getDeleteButton()).toBeInTheDocument());

    userEvent.click(getDeleteButton());

    await waitFor(() => expect(onDeleteSpy).toHaveBeenCalled());
  });

  it("should render dialog box when user clicks on Tasks option", async () => {
    (useTasks as Mock).mockReturnValue({
      data: mockTasks,
    });

    renderComponent();

    userEvent.click(getOptions());

    await waitFor(() => expect(getTasksButton()).toBeInTheDocument());

    userEvent.click(getTasksButton());

    await waitFor(() =>
      expect(screen.getByRole("dialog", { name: "Tasks" })).toBeInTheDocument(),
    );

    const listItems = screen.getAllByRole("listitem");
    const expectedTasks = ["Task 1", "Task 2", "Task 3"];

    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(expectedTasks[index]);
    });
  });

  it("should render dialog box with empty message when there are no tasks assigned", async () => {
    (useTasks as Mock).mockReturnValue({
      data: [],
    });

    renderComponent();

    userEvent.click(getOptions());

    await waitFor(() => expect(getTasksButton()).toBeInTheDocument());

    userEvent.click(getTasksButton());

    await waitFor(() =>
      expect(screen.getByRole("dialog", { name: "Tasks" })).toBeInTheDocument(),
    );

    expect(
      screen.getByText("No tasks associated with this category."),
    ).toBeInTheDocument();
  });
});
