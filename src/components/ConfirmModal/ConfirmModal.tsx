import React, { useCallback } from 'react';

import {
  Button,
  Group,
  Modal,
} from '@mantine/core';

import { useTr } from '@/tools/translator';

type ConfirmationModalProps = {
  opened: boolean;
  onClose: () => void;
  closeOnAccept?: boolean;
  onAccept: () => void;
  closeOnCancel?: boolean;
  onCancel?: () => void;
  title: string;
};

const ConfirmModal = (props: ConfirmationModalProps) => {
  const {
    opened,
    onClose,
    onAccept,
    closeOnAccept = false,
    onCancel,
    closeOnCancel = false,
    title,
  } = props;

  const tr = useTr();

  const handleAccept = useCallback(() => {
    if (onAccept) {
      onAccept();
    }

    if (closeOnAccept) {
      onClose();
    }
  }, [closeOnAccept, onAccept, onClose]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }

    if (closeOnCancel) {
      onClose();
    }
  }, [closeOnCancel, onCancel, onClose]);

  return (
    <Modal
      opened={opened}
      title={title}
      onClose={onClose}
    >
      <Group position="right">
        {!!onCancel && (
          <Button
            variant="outline"
            color="red"
            onClick={handleCancel}
          >
            {tr('Cancel')}
          </Button>
        )}

        <Button onClick={handleAccept}>{tr('Accept')}</Button>
      </Group>
    </Modal>
  );
};

export default ConfirmModal;
