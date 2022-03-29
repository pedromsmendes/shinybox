import React, { useEffect, useMemo, useState } from 'react';

import {
  type DropzoneStatus,
} from '@mantine/dropzone';
import {
  Group,
  Image,
  Text,
  createStyles,
  type MantineTheme,
} from '@mantine/core';

import { CloudUpload as CloudIcon } from 'tabler-icons-react';
import { API_URL } from '@/globals';

import { useTr } from '@/tools/TranslationPlaceholder';

const getActiveColor = (status: DropzoneStatus, theme: MantineTheme) => (
  status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.black
);

export const PREVIEW_SIZE = 300;

const useStyles = createStyles(() => ({
  content: {
    borderRadius: 10,
    position: 'relative',
    pointerEvents: 'none',
    minWidth: PREVIEW_SIZE,
    maxWidth: PREVIEW_SIZE,
    minHeight: PREVIEW_SIZE,
    maxHeight: PREVIEW_SIZE,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  info: {
    borderRadius: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxShadow: '0px -80px 80px rgba(0,0,0,0.8) inset',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
    '&>*': {
      color: 'white',
    },
  },
  image: {
    borderRadius: 10,
    '& img': {
      borderRadius: 10,
    },
  },
}));

type DropzoneContentFunc = (
  status: DropzoneStatus,
  string: File | string | null,
  maxSizeMB: string,
  acceptedFiles: string[],
  theme: MantineTheme,
) => JSX.Element;

const DropzoneContent: DropzoneContentFunc = (status, image, maxSizeMB, acceptedFiles, theme) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { classes, cx } = useStyles();
  const tr = useTr();

  useEffect(() => {
    if (!image) {
      setImgSrc(null);
      return;
    }

    if (typeof image === 'string') {
      setImgSrc(`${API_URL}/${image}`);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setImgSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const formattedAcceptedFiles = useMemo(() => (
    acceptedFiles.map((acceptedFile) => acceptedFile.replace('image/', '.')).join(', ')
  ), [acceptedFiles]);

  return (
    <div className={classes.content}>
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="selected-image"
          fit="contain"
          width={PREVIEW_SIZE}
          height={PREVIEW_SIZE}
          className={classes.image}
        />
      ) : (
        <>
          <Group position="center">
            <CloudIcon size={50} color={getActiveColor(status, theme)} />
          </Group>

          <Text
            align="center"
            weight={700}
            size="lg"
            mt="xl"
            sx={{ color: getActiveColor(status, theme) }}
          >
            {status.accepted
              ? tr('Drop images here')
              : status.rejected
                ? tr(`Image with less than ${maxSizeMB}MB`)
                : tr('Upload image')}
          </Text>
        </>
      )}

      <div className={cx({ [classes.info]: !!image })}>
        <Text align="center" size="sm" color="dimmed">
          {tr(`${maxSizeMB}MB max.`)}
        </Text>
        <Text align="center" size="sm" color="dimmed">
          {formattedAcceptedFiles}
        </Text>
      </div>
    </div >
  );
};

export default DropzoneContent;
