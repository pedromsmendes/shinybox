import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Group,
  Modal,
} from '@mantine/core';

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

  const { t } = useTranslation();

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
            {t('general.cancel')}
          </Button>
        )}

        <Button onClick={handleAccept}>{t('general.accept')}</Button>
      </Group>
    </Modal>
  );
};

export default ConfirmModal;
