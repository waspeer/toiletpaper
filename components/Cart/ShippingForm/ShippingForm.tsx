import React, { useEffect, useRef, useState } from 'react';
import { FormContextValues, NestDataObject } from 'react-hook-form';
import * as yup from 'yup';

import Alert from '#root/components/Alert';
import Input from '#root/components/Input';

import { InputRow, Wrapper, CountryDropdown } from './_styles';

export interface FormData {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  postalCode: string;
}

interface Props {
  disabled: boolean;
  errors: NestDataObject<FormData>;
  register: FormContextValues<FormData>['register'];
  triggerValidation: FormContextValues<FormData>['triggerValidation'];
}

export const formSchema = yup.object().shape({
  donation: yup.number(),
  name: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
});

const sentenceCase = (string: string) => `${string[0].toUpperCase()}${string.slice(1)}`;

const ShippingForm = ({ disabled, errors, register, triggerValidation }: Props) => {
  const didMountRef = useRef(false);

  const [country, setCountry] = useState('');

  useEffect(() => {
    if (didMountRef.current) {
      triggerValidation();
    } else {
      didMountRef.current = true;
    }
  }, [country, triggerValidation]);

  return (
    <Wrapper>
      <Input disabled={disabled} name="name" placeholder="Name" ref={register({})} />
      {errors.name?.message && <Alert type="error" message={sentenceCase(errors.name.message)} />}
      <Input disabled={disabled} name="address" placeholder="Address" ref={register} />
      {errors.address?.message && (
        <Alert type="error" message={sentenceCase(errors.address.message)} />
      )}
      <InputRow>
        <Input disabled={disabled} name="city" placeholder="City" ref={register} />
        <Input
          disabled={disabled}
          name="postalCode"
          placeholder="Postal Code / ZIP"
          ref={register}
        />
      </InputRow>
      {errors.city?.message && <Alert type="error" message={sentenceCase(errors.city.message)} />}
      {errors.postalCode?.message && (
        <Alert type="error" message={sentenceCase(errors.postalCode.message)} />
      )}
      <input type="hidden" name="country" value={country} ref={register} />
      <CountryDropdown
        disabled={disabled}
        value={country}
        valueType="short"
        onChange={setCountry}
      />
      {errors.country?.message && (
        <Alert type="error" message={sentenceCase(errors.country.message)} />
      )}
      <Input disabled={disabled} name="email" htmlType="email" placeholder="Email" ref={register} />
      {errors.email?.message && <Alert type="error" message={sentenceCase(errors.email.message)} />}
    </Wrapper>
  );
};

ShippingForm.whyDidYouRender = true;

export default ShippingForm;
