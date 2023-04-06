// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getDataJson} from '@/shared/getDataJson';
import {IChampionTiles} from '@/types/championTiles';
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
  champions: IChampionTiles[];
  version: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const data = await getDataJson();

  const champions = Object.values(data.data).map(
    (value: any): IChampionTiles => {
      return {
        id: value.id,
        key: value.key,
        name: value.name,
      };
    }
  );
  const version: string = data.version;

  return res.status(200).json({
    version,
    champions,
  });
}
