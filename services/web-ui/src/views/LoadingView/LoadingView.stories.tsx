import type { Meta, StoryObj } from "@storybook/react";

import { LoadingView } from ".";

export default {
  title: "Views/LoadingView",
  component: LoadingView,
} as Meta;

type Story = StoryObj<typeof LoadingView>;

export const Default: Story = {
  args: {},
};
