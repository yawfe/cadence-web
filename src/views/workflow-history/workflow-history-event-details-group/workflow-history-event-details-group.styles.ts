import { styled as createStyled, type Theme } from 'baseui';

import { type EventDetailsLabelKind } from './workflow-history-event-details-group.types';

const getLabelColor = ($theme: Theme, $labelKind: EventDetailsLabelKind) => {
  switch ($labelKind) {
    case 'negative':
      return $theme.colors.red300;
    case 'group':
      return $theme.colors.contentPrimary;
    default:
      return $theme.colors.contentTertiary;
  }
};

export const styled = {
  DetailsRow: createStyled<'div', { $forceWrap?: boolean }>(
    'div',
    ({ $theme, $forceWrap }: { $theme: Theme; $forceWrap?: boolean }) => ({
      gap: $theme.sizing.scale300,
      paddingTop: $theme.sizing.scale200,
      paddingBottom: $theme.sizing.scale200,
      wordBreak: 'break-word',
      display: 'flex',
      flexDirection: $forceWrap ? 'column' : 'row',
      ...(!$forceWrap && { flexWrap: 'wrap' }),
    })
  ),
  DetailsValue: createStyled<
    'div',
    { $forceWrap?: boolean; $isNegative?: boolean }
  >(
    'div',
    ({
      $theme,
      $forceWrap,
      $isNegative,
    }: {
      $theme: Theme;
      $forceWrap?: boolean;
      $isNegative?: boolean;
    }) => ({
      color: $isNegative
        ? $theme.colors.contentNegative
        : $theme.colors.contentPrimary,
      ...$theme.typography.LabelXSmall,
      display: 'flex',
      ...(!$forceWrap && { flex: '1 0 300px' }),
    })
  ),
  DetailsLabel: createStyled<
    'div',
    { $forceWrap?: boolean; $labelKind?: EventDetailsLabelKind }
  >('div', ({ $theme, $forceWrap, $labelKind = 'regular' }) => ({
    minWidth: '200px',
    maxWidth: '200px',
    display: 'flex',
    color: getLabelColor($theme, $labelKind),
    ...$theme.typography.LabelXSmall,
    ...($forceWrap && { whiteSpace: 'nowrap' }),
  })),
  IndentedDetails: createStyled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: $theme.sizing.scale400,
    borderLeft: `2px solid ${$theme.colors.borderOpaque}`,
  })),
};
