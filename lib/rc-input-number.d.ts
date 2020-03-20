declare module 'rc-input-number' {
  interface Props {
    /** rc-input-number 	Specifies the class prefix */
    prefixCls?: string;

    /** Specifies the minimum value */
    min?: number;

    /** Onclick handler */
    onClick?: (e: React.MouseEvent<any>) => void;

    /** Placeholder */
    placeholder?: string;

    /** Specifies the maximum value */
    max?: number;

    /** 1 	Specifies the legal number intervals */
    step?: number | string;

    /** Specifies the precision length of value */
    precision?: number;

    /** false 	Specifies that an InputNumber should be disabled */
    disabled?: boolean;

    /** true 	whether focus input when click up or down button */
    focusOnUpDown?: boolean;

    /** false 	Specifies that an InputNumber is required */
    required?: boolean;

    /** false 	Specifies that an InputNumber should automatically get focus when the page loads */
    autoFocus?: boolean;

    /** false 	Specifies that an InputNumber is read only */
    readOnly?: boolean;

    /** Specifies the name of an InputNumber */
    name?: string;

    /** Specifies the id of an InputNumber */
    id?: string;

    /** Specifies the value of an InputNumber */
    value?: number;

    /** Specifies the defaultValue of an InputNumber */
    defaultValue?: number;

    /** Called when value of an InputNumber changed */
    onChange?: function;

    /** The callback function that is triggered when Enter key is pressed. */
    onPressEnter?: function;

    /** Called when an element gets focus */
    onFocus?: function;

    /** root style. such as {width:100} */
    style?: object;

    /** custom the up step element */
    upHandler?: React.ReactNode;

    /** custom the down step element */
    downHandler?: React.ReactNode;

    /** Specifies the format of the value presented */
    formatter?: (value: number | string) => string;

    /** Specifies the value extracted from formatter. Default: `input => input.replace(/[^\w\.-]/g, '')` */
    parser?: (displayValue: string) => number;

    /** Specifies a regex pattern to be added to the input number element - useful for forcing iOS to open the number pad instead of the normal keyboard (supply a regex of "\d*" to do this) or form validation */
    pattern?: string;

    /** Specifies the decimal separator */
    decimalSeparator?: string;

    /** Specifies the inputmode of input */
    inputMode?: string;
  }

  const InputNumber = (props: Props) => JSX.Element;

  export default InputNumber;
}
