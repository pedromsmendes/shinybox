import React, { useRef, useState } from 'react';

import {
  Dropzone as MantineDropzone,
  MIME_TYPES,
  type DropzoneStatus,
} from '@mantine/dropzone';
import {
  Button,
  createStyles,
  Group, Text,
} from '@mantine/core';

import { CloudUpload as CloudIcon } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

const MAX_SIZE_MB = 30;
const MAX_SIZE_B = MAX_SIZE_MB * 1024 ** 2;

type DropzoneProps = {

};

const Dropzone = (props: DropzoneProps) => {
  const openRef = useRef<() => void>(null);
  const [leFiles, setFiles] = useState<File | null>(null);
  console.log('🚀 ~ Dropzone ~ leFiles', leFiles);

  const { classes, theme } = useStyles();

  const getActiveColor = (status: DropzoneStatus) => {
    return status.accepted
      ? theme.colors[theme.primaryColor][6]
      : status.rejected
        ? theme.colors.red[6]
        : theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.black;
  };

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        openRef={openRef}
        onDrop={(files) => { setFiles(files[0]); }}
        onReject={() => null}
        className={classes.dropzone}
        accept={[MIME_TYPES.gif, MIME_TYPES.jpeg, MIME_TYPES.png]}
        maxSize={MAX_SIZE_B}
        multiple={false}
        radius="lg"
      >
        {(status) => console.log('🚀 ~ Dropzone ~ status', status) || (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <CloudIcon size={50} color={getActiveColor(status)} />
            </Group>

            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status) }}
            >
              {status.accepted
                ? 'Drop images here'
                : status.rejected
                  ? `Image with less than ${MAX_SIZE_MB}MB`
                  : 'Upload image'}
            </Text>

            <Text align="center" size="sm" mt="xs" color="dimmed">
              {MAX_SIZE_MB}MB
            </Text>
          </div>
        )}
      </MantineDropzone>

      <Button
        onClick={() => openRef.current ? openRef.current() : null}
        className={classes.control}
        size="md"
        radius="md"
      >
        Select images
      </Button>
    </div>
  );
};

export default Dropzone;
