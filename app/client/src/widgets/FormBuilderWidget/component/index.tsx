import React, { Fragment } from "react";
import styled from "styled-components";
import { DefaultValues } from "react-hook-form";

import Form from "./Form";
import { FIELD_MAP, ROOT_SCHEMA_KEY, Schema } from "../constants";
import { isEmpty } from "lodash";

type StyledContainerProps = {
  backgroundColor?: string;
};

export type FormBuilderComponentProps<TValues> = {
  backgroundColor?: string;
  fixedFooter: boolean;
  formData?: TValues;
  schema: Schema;
  scrollContents: boolean;
  title: string;
  updateFormValues: (values: TValues) => void;
  useFormDataValues: boolean;
};

const StyledContainer = styled.div<StyledContainerProps>`
  background: ${({ backgroundColor }) => backgroundColor || "#fff"};
  overflow-y: auto;
`;

function FormBuilderComponent<TValues>({
  backgroundColor,
  formData,
  schema,
  ...rest
}: FormBuilderComponentProps<TValues>) {
  if (isEmpty(schema))
    return <StyledContainer backgroundColor={backgroundColor} />;

  const rootSchemaItem = schema[ROOT_SCHEMA_KEY];

  const RootField = FIELD_MAP[rootSchemaItem.fieldType] || Fragment;

  return (
    <StyledContainer backgroundColor={backgroundColor}>
      <Form
        {...rest}
        formData={formData as DefaultValues<TValues>}
        // eslint-disable-next-line no-console
        onSubmit={console.log}
      >
        <RootField name="" schemaItem={rootSchemaItem} />
      </Form>
    </StyledContainer>
  );
}

export default FormBuilderComponent;
