import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  TextInput,
  Select,
  Button,
  ActionIcon,
} from '@mantine/core';
import { Trash as DeleteIcon } from 'tabler-icons-react';

import { useDexesQuery } from '@/graphql/dexes/Dexes.generated';
import { useCreateDexMutation } from '@/graphql/dexes/CreateDex.generated';

import Table from '@/components/Table';

import type { PokemonCreateFormValues } from './PokemonCreate';

const PokemonCreateForm = () => {
  const { control, setValue } = useFormContext<PokemonCreateFormValues>();
  const { fields, insert, remove } = useFieldArray<PokemonCreateFormValues>({
    name: 'dexes',
  });

  const { t } = useTranslation();

  const { data, loading: loadingDexes, refetch } = useDexesQuery();
  const [createDex, { loading: creatingDex }] = useCreateDexMutation();

  const onDexCreate = useCallback((idx: number) => async (dexName: string) => {
    const res = await createDex({
      variables: {
        data: {
          name: dexName,
        },
      },
    });

    const createdDex = res.data?.createDex;

    if (createdDex) {
      await refetch();

      setValue(`dexes.${idx}.dexId`, `${createdDex.id}`);
    }
  }, [createDex, refetch, setValue]);

  const addDexRow = useCallback(() => {
    insert(
      fields.length,
      { dexId: '', name: '', number: '' },
      { focusIndex: fields.length, shouldFocus: true },
    );
  }, [fields.length, insert]);

  const removeRow = useCallback((idx: number) => () => {
    remove(idx);
  }, [remove]);

  const dexes = useMemo(() => data?.dexes || [], [data?.dexes]);

  const dexesSelect = useMemo(() => dexes.map((dex) => ({
    value: `${dex.id}`,
    label: dex.name,
  })), [dexes]);

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            required
            radius="lg"
            size="md"
            label={t('general.name')}
            placeholder={t('form.eg-bulbasaur', { defaultValue: 'Eg: Bulbasaur' })}
          />
        )}
      />

      <Table
        hover={false}
        striped={false}
        headers={(
          <>
            <td align="center">{t('general.dex')}</td>
            <td align="center">{t('general.name-dex')}</td>
            <td align="center">{t('general.number')}</td>
            <td align="center" />
          </>
        )}
      >
        {fields.map((dex, idx) => (
          <tr key={dex.id}>
            <td>
              <Controller
                name={`dexes.${idx}.dexId`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    required
                    searchable
                    creatable
                    nothingFound={t('form.no-dex-add')}
                    disabled={creatingDex || loadingDexes}
                    radius="lg"
                    size="md"
                    // label={tr('Dex')}
                    placeholder={t('form.eg-kanto', { defaultValue: 'Eg: Kanto' })}
                    getCreateLabel={(query: string) => t('Add "{{query}}"', { replace: { query } })}
                    onCreate={onDexCreate(idx)}
                    data={dexesSelect}
                  />
                )}
              />
            </td>

            <td>
              <Controller
                name={`dexes.${idx}.name`}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    required
                    radius="lg"
                    size="md"
                    // label={tr('Name in dex')}
                    placeholder={t('Eg: Alolan Meowth')}
                  />
                )}
              />
            </td>

            <td>
              <Controller
                name={`dexes.${idx}.number`}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    required
                    radius="lg"
                    size="md"
                    // label={tr('Number')}
                    placeholder={t('Eg: 1')}
                  />
                )}
              />
            </td>

            <td align="center">
              <ActionIcon disabled={fields.length <= 1} onClick={removeRow(idx)}>
                <DeleteIcon />
              </ActionIcon>
            </td>
          </tr>
        ))}

        <tr>
          <td />
          <td />
          <td />
          <td align="right">
            <Button onClick={addDexRow}>
              {t('Add dex')}
            </Button>
          </td>
        </tr>
      </Table>
    </>
  );
};

export default PokemonCreateForm;
