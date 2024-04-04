import { PipelineStage } from 'mongoose';

export enum SORT_ORDER {
  ASC = 1,
  DESC = -1,
}

export const DEFAULT_SORT_FIELD = {
  createdAt: -1,
} as Record<string, SORT_ORDER>;

export function generateProjectionFields(
  fields: string,
): Record<string, number> {
  const fieldsArray = fields.split(' ');
  return fieldsArray.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {});
}

export const getDefaultFilterFacet = (
  skip?: number,
  limit?: number,
  project?: Record<string, number>,
) =>
  ({
    total: [{ $count: 'total' }],
    data: [
      { $skip: skip || 0 },
      { $limit: limit || Number.MAX_SAFE_INTEGER },
      {
        $project: project,
      },
    ],
  }) as PipelineStage.Facet['$facet'];
