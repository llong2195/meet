import type { Meta, StoryObj } from "@storybook/react";

import { ChatTextFieldComponent } from "./ChatTextField.component";

export default {
  title: "Components/ChatTextField",
  component: ChatTextFieldComponent,
} as Meta;

type Story = StoryObj<typeof ChatTextFieldComponent>;

export const Default: Story = {
  args: {
    onSubmit: () => alert("Submit"),
  },
};
