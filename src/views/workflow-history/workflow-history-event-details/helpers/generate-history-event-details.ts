import isObjectLike from 'lodash/isObjectLike';

import {
  type WorkflowHistoryEventDetailsGroupEntry,
  type WorkflowHistoryEventDetailsEntry,
  type WorkflowHistoryEventDetailsEntries,
} from '../workflow-history-event-details.types';

import getHistoryEventFieldRenderConfig from './get-history-event-field-render-config';

export default function generateHistoryEventDetails({
  details,
  negativeFields,
  parentPath = '',
}: {
  details: object;
  negativeFields?: Array<string>;
  parentPath?: string;
}): WorkflowHistoryEventDetailsEntries {
  if (details === null || details === undefined) {
    return [];
  }

  const result: WorkflowHistoryEventDetailsEntries = [];

  Object.entries(details).forEach(([key, value]) => {
    const path = parentPath ? `${parentPath}.${key}` : key;

    const renderConfig = getHistoryEventFieldRenderConfig({
      key,
      path,
      value,
    });

    if (renderConfig?.hide && renderConfig.hide({ key, path, value })) {
      return;
    }

    if (!renderConfig?.valueComponent && isObjectLike(value)) {
      const entries = Object.entries(value);
      if (entries.length === 1) {
        result.push(
          ...generateHistoryEventDetails({
            details: value,
            parentPath: path,
            negativeFields,
          })
        );
      } else {
        const groupEntry: WorkflowHistoryEventDetailsGroupEntry = {
          key,
          path,
          isGroup: true,
          groupEntries: generateHistoryEventDetails({
            details: value,
            parentPath: path,
            negativeFields,
          }),
          renderConfig,
        };
        result.push(groupEntry);
      }
      return;
    }

    const entry: WorkflowHistoryEventDetailsEntry = {
      key,
      path,
      value,
      renderConfig,
      isGroup: false,
      ...(negativeFields && negativeFields.includes(path)
        ? { isNegative: true }
        : {}),
    };
    result.push(entry);
  });

  return result;
}
