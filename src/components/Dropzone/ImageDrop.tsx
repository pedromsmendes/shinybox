import React, { forwardRef, useCallback, useRef } from 'react';

import {
  Dropzone as MantineDropzone,
  MIME_TYPES,
} from '@mantine/dropzone';
import { createStyles } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import { useTr } from '@/tools/TranslationPlaceholder';

import DropzoneContent, { PREVIEW_SIZE } from './DropzoneContent';

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

type ImageDropProps = {
  image: File | string | null;
  onDrop: (file: File) => void;
  disabled?: boolean;
  error?: string;
};

const ImageDrop = forwardRef<HTMLDivElement, ImageDropProps>((props, forwardedRef) => {
  const {
    image,
    onDrop,
    disabled,
  } = props;

  const openRef = useRef<() => void>(null);
  const tr = useTr();

  const { showNotification } = useNotifications();

  const { cx, classes, theme } = useStyles();

  const handleOnReject = useCallback(() => {
    showNotification({ message: tr('Failed to upload') });
  }, [showNotification, tr]);

  const handleDropFile = useCallback((files: File[]) => {
    onDrop(files[0]);
  }, [onDrop]);

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        ref={forwardedRef}
        disabled={disabled}
        openRef={openRef}
        className={cx(classes.dropzone, { [classes.noBorder]: !!image })}
        onDrop={handleDropFile}
        onReject={handleOnReject}
        accept={acceptedFiles}
        maxSize={MAX_SIZE_B}
        multiple={false}
      >
        {(status) => DropzoneContent(
          status,
          image,
          MAX_SIZE_MB.toString(),
          acceptedFiles,
          theme,
        )}
      </MantineDropzone>
    </div>
  );
});

ImageDrop.displayName = 'ImageDrop';

export default ImageDrop;
