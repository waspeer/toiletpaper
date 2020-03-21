import classNames from '@sindresorhus/class-names';
import React from 'react';

import { ListWrapper, NoItemsWrapper } from './_styles';

interface Props<I = any> {
  /** Toggles rendering of the border around the list */
  bordered?: boolean;

  /** Classname for the wrapper element */
  className?: string;

  /** A function that ouputs the key for the rendered items */
  createKey?: (item: I) => string;

  /** List footer renderer */
  footer?: React.ReactNode;

  /** List header renderer */
  header?: React.ReactNode;

  /** DataSource array for list */
  items?: I[];

  /** Shows a loading indicator while the contents of the list are being fetched */
  loading?: boolean;

  /** The function that renders the items */
  renderItem?: (item: I, key: string) => React.ReactNode;

  /** Size of list */
  size?: 'large' | 'small';

  /** Toggles rendering of the split under the list item */
  split?: boolean;
}

const List = ({
  bordered,
  className,
  createKey,
  footer,
  header,
  items = [],
  loading,
  renderItem,
  size,
  split = true,
}: Props) => {
  const classes = classNames(
    {
      bordered,
      large: size === 'large',
      loading,
      small: size === 'small',
      split,
    },
    className,
  );

  return (
    <ListWrapper className={classes} data-testid="list">
      {header && <div className="header">{header}</div>}
      <div className="loadContainer">
        {items.length ? (
          <ul>
            {items.map((item, index) => {
              let key: string;

              if (createKey) key = createKey(item);
              else if (item.id) key = `list-item-${item.id}`;
              else key = `list-item-${index}`;

              return <li key={key}>{renderItem ? renderItem(item, key) : item}</li>;
            })}
          </ul>
        ) : (
          <NoItemsWrapper data-testid="noItems">
            <span role="img" aria-label="Shrug">
              🤷‍♂️
            </span>{' '}
            no items
          </NoItemsWrapper>
        )}
      </div>
      {footer && <div className="footer">{footer}</div>}
    </ListWrapper>
  );
};

export default List;
