import React, { useCallback, useRef } from 'react';

import {
  Dropzone as MantineDropzone,
  MIME_TYPES,
} from '@mantine/dropzone';
import { createStyles } from '@mantine/core';

import DropzoneContent, { PREVIEW_SIZE } from './DropzoneContent';
import { useNotifications } from '@mantine/notifications';
import { useTr } from '@/tools/translator';

const useStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
    minWidth: PREVIEW_SIZE,
    maxWidth: PREVIEW_SIZE,
    minHeight: PREVIEW_SIZE,
    maxHeight: PREVIEW_SIZE,
  },
  dropzone: {
    padding: 0,
    borderRadius: 10,
  },
  noBorder: {
    borderWidth: 0,
  },
}));

const MAX_SIZE_MB = 10;
const MAX_SIZE_B = MAX_SIZE_MB * 1024 ** 2;

const acceptedFiles = [MIME_TYPES.gif, MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp];

type DropzoneProps = {
  file: File | null;
  onDrop: (file: File) => void;
  disabled?: boolean;
  error?: string;
};

const Dropzone = (props: DropzoneProps) => {
  const {
    file,
    onDrop,
    disabled,
  } = props;

  const openRef = useRef<() => void>(null);
  const { showNotification } = useNotifications();

  const { cx, classes, theme } = useStyles();

  const tr = useTr();

  const handleOnReject = useCallback(() => {
    showNotification({ message: tr('Failed to upload') });
  }, [showNotification, tr]);

  const handleDropFile = useCallback((files: File[]) => {
    onDrop(files[0]);
  }, [onDrop]);

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        disabled={disabled}
        openRef={openRef}
        className={cx(classes.dropzone, { [classes.noBorder]: !!file })}
        onDrop={handleDropFile}
        onReject={handleOnReject}
        accept={acceptedFiles}
        maxSize={MAX_SIZE_B}
        multiple={false}
      >
        {(status) => DropzoneContent(
          status,
          file,
          MAX_SIZE_MB.toString(),
          acceptedFiles,
          theme,
        )}
      </MantineDropzone>
    </div>
  );
};

export default Dropzone;
