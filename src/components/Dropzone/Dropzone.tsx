import React, { useRef, useState } from 'react';

import { Dropzone as MantineDropzone, MIME_TYPES } from '@mantine/dropzone';
import { createStyles } from '@mantine/core';
import DropzoneContent from './DropzoneContent';

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
    width: '100%',
    height: 40,
    margin: '0 auto',
    bottom: -20,
  },

  content: {
    pointerEvents: 'none',
    border: '1px solid red',
  },
}));

const MAX_SIZE_MB = 30;
const MAX_SIZE_B = MAX_SIZE_MB * 1024 ** 2;

const acceptedFiles = [MIME_TYPES.gif, MIME_TYPES.jpeg, MIME_TYPES.png];

type DropzoneProps = {

};

const Dropzone = (props: DropzoneProps) => {
  const openRef = useRef<() => void>(null);
  const [file, setFiles] = useState<File | null>(null);
  console.log('🚀 ~ Dropzone ~ leFiles', file);

  const { classes, theme } = useStyles();

  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        openRef={openRef}
        onDrop={(files) => { setFiles(files[0]); }}
        onReject={() => null}
        className={classes.dropzone}
        accept={acceptedFiles}
        maxSize={MAX_SIZE_B}
        multiple={false}
        radius="lg"
      >
        {(status) => DropzoneContent(status, file, MAX_SIZE_MB.toString(), acceptedFiles, theme, classes)}
      </MantineDropzone>
    </div>
  );
};

export default Dropzone;
