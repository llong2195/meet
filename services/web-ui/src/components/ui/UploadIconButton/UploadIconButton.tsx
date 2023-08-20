import React, { ChangeEvent, ReactNode } from "react";

import { IconButton } from "@mui/material";

interface UploadIconButtonProps {
  accept: string;
  children: ReactNode;
  multiple?: boolean;
  onChange: (files: File[]) => Promise<void> | void;
}

export function UploadIconButton({
  accept,
  children,
  multiple,
  onChange,
}: UploadIconButtonProps): React.ReactElement {
  async function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const fileList = event.target.files;

    if (!fileList) {
      return;
    }

    const files: File[] = [];

    for (const file of fileList) {
      files.push(file);
    }

    await onChange(files);
  }

  return (
    <IconButton component="label">
      {children}
      <input
        accept={accept}
        hidden
        multiple={multiple}
        onChange={handleChange}
        type="file"
      />
    </IconButton>
  );
}
