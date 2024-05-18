/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import UsersClientPage from "../app/ClientPage";
import { User } from "../types/user";

const mockUsers: User[] = [
  {
    avatar: "https://robohash.org/veroiustoquia.png?size=50x50&set=set1",
    description:
      "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    email: "talsobrookg@prweb.com",
    firstname: "Thom",
    id: "48b4c846-3feb-461b-a896-fdafbe190bf0",
    join_date: "2/17/2024",
    lastname: "Alsobrook",
    role: "Engineer",
    username: "talsobrookg",
  },

  {
    avatar:
      "https://robohash.org/repellatconsequunturea.png?size=50x50&set=set1",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    email: "cdakers4@joomla.org",
    firstname: "Cherish",
    id: "8de05533-6cd3-42fb-a4bc-e8817400bd09",
    join_date: "8/13/2023",
    lastname: "Dakers",
    role: "Surveyor",
    username: "cdakers4",
  },
  {
    avatar: "https://robohash.org/etconsequaturut.png?size=50x50&set=set1",
    description:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    email: "mpaffordb@princeton.edu",
    firstname: "Misha",
    id: "cdd32140-ff37-45e3-870d-9193601a469b",
    join_date: "3/20/2024",
    lastname: "Pafford",
    role: "Estimator",
    username: "mpaffordb",
  },
];

describe("UsersClientPage", () => {
  it("renders a heading", async () => {
    render(<UsersClientPage users={mockUsers} />);

    const heading = screen.queryAllByText("Hypercare Users");

    expect(heading).toBeDefined();
  });

  it("renders UserCards with first / last names", async () => {
    render(<UsersClientPage users={mockUsers} />);

    for (const user of mockUsers) {
      const userCard = screen.queryAllByText(
        `${user.firstname} ${user.lastname}`
      );

      expect(userCard).toBeDefined();
    }
  });

  it("renders UserCards with descriptions", async () => {
    render(<UsersClientPage users={mockUsers} />);

    for (const user of mockUsers) {
      const userCard = screen.queryAllByText(user.description);

      expect(userCard).toBeDefined();
    }
  });

  it("only renders first 24 cards in UsersList", async () => {
    const scaledMockUsers = Array.from({ length: 500 }, (_, i) => ({
      ...mockUsers[i % mockUsers.length],
      id: i.toString(),
    }));

    render(<UsersClientPage users={scaledMockUsers} />);

    const userCards = screen.queryAllByTestId("user-card");

    expect(userCards).toHaveLength(24);
  });

  it("View More button opens UserInfoModal", async () => {
    render(<UsersClientPage users={mockUsers} />);

    const viewMoreButton = screen.queryAllByText("View More");

    expect(viewMoreButton).toBeDefined();

    viewMoreButton[0].click();

    const userInfoModal = screen.queryAllByText("Engineer");

    expect(userInfoModal).toBeDefined();
  });
});
