import React, { memo } from 'react';

import Alert from '#root/components/Alert';
import Input from '#root/components/Input';

import { InputRow, Wrapper, CountryDropdown } from './_styles';

interface Props {
  address: string;
  city: string;
  country: string;
  disabled: boolean;
  email: string;
  formErrors: Map<string, string>;
  name: string;
  onChange({ name, value }: { name: string; value: string }): void;
  postalCode: string;
}

const BillingDetailsForm = ({
  address,
  city,
  country,
  disabled,
  email,
  formErrors,
  name,
  onChange: pushChange,
  postalCode,
}: Props) => {
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    pushChange({ name: target.name, value: target.value });

  const onCountryChange = (value: string) => pushChange({ name: 'country', value });

  return (
    <Wrapper>
      <Input disabled={disabled} name="name" placeholder="Name" value={name} onChange={onChange} />
      {formErrors.has('name') && <Alert type="error" message={formErrors.get('name')} />}
      <Input
        disabled={disabled}
        name="address"
        placeholder="Address"
        onChange={onChange}
        value={address}
      />
      {formErrors.has('address') && <Alert type="error" message={formErrors.get('address')} />}
      <InputRow>
        <Input
          disabled={disabled}
          name="city"
          placeholder="City"
          value={city}
          onChange={onChange}
        />
        <Input
          disabled={disabled}
          name="postalCode"
          placeholder="Postal Code / ZIP"
          value={postalCode}
          onChange={onChange}
        />
      </InputRow>
      {formErrors.has('city') && <Alert type="error" message={formErrors.get('city')} />}
      {formErrors.has('postalCode') && (
        <Alert type="error" message={formErrors.get('postalCode')} />
      )}
      <CountryDropdown
        disabled={disabled}
        value={country}
        valueType="short"
        onChange={onCountryChange}
      />
      {formErrors.has('country') && <Alert type="error" message={formErrors.get('country')} />}
      <Input
        disabled={disabled}
        name="email"
        htmlType="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      {formErrors.has('email') && <Alert type="error" message={formErrors.get('email')} />}
    </Wrapper>
  );
};

BillingDetailsForm.whyDidYouRender = true;

export default memo(BillingDetailsForm);
