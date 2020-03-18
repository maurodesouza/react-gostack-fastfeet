import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function TableList({ thead, children }) {
  return (
    <S.Table>
      <thead>
        <tr>
          {thead.map(text => (
            <th key={text}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </S.Table>
  );
}

TableList.propTypes = {
  thead: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};
