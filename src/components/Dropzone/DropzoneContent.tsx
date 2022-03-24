import React from 'react';

import {
  type DropzoneStatus,
} from '@mantine/dropzone';
import {
  Group,
  Image,
  type MantineTheme,
  Text,
  createStyles,
  ClassNames,
} from '@mantine/core';

import { CloudUpload as CloudIcon } from 'tabler-icons-react';

const getActiveColor = (status: DropzoneStatus, theme: MantineTheme) => (
  status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.black
);

const DropzoneContent = (
  status: DropzoneStatus,
  file: File | null,
  maxSizeMB: string,
  acceptedFiles: string[],
  theme: MantineTheme,
  classes: Record<string, any>,
) => {

  return (
    <div className={classes.content}>
      {file ? (
        <Image
          src={URL.createObjectURL(file)}
          alt="pokemon-uploaded-image"
          height={200}
          fit="contain"
        />
      ) : (
        <Group position="center">
          <CloudIcon size={50} color={getActiveColor(status, theme)} />
        </Group>
      )}

      <Text
        align="center"
        weight={700}
        size="lg"
        mt="xl"
        sx={{ color: getActiveColor(status, theme) }}
      >
        {status.accepted
          ? 'Drop images here'
          : status.rejected
            ? `Image with less than ${maxSizeMB}MB`
            : 'Upload image'}
      </Text>

      <Text align="center" size="sm" mt="xs" color="dimmed">
        {maxSizeMB}MB
        {acceptedFiles.map((acceptedFile) => (
          `\t${acceptedFile}\t`
        ))}
      </Text>
    </div>
  );
};

export default DropzoneContent;
