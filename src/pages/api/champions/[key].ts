// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataJson } from '@/shared/getDataJson';

type Skins = {
  id: string,
  num: string,
  name: string
}

type Spells = {
  id: string
}

type Champions = {
  id: string,
  key: string,
  name: string,
  title: string,
  lore: string,
  skins: Skins[],
  spells: Spells[],
  passive: {
    image: {
      full: string
    }
  }
  imgPassive: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { key } = req.query

  const data = await getDataJson()

  const champions = Object.values<Champions>(data.data).filter((value) => value.key === key)

  if (champions.length === 0) {
    return res.status(400).json({message: 'Nenhum campeão encontrado com os parâmetros passado por favor tente novamente.'})
  }
  const champion = champions.map((value) => {
    return {
        id: value.id,
        key: value.key,
        name: value.name,
        title: value.title,
        lore: value.lore,
        skins: value.skins.map((skin: any): Skins => {
          delete skin.chromas
          return skin
        }),
        spells: value.spells.map((spell: any): Spells => {
          return {
            id: spell.id
          }
        }),
        imgPassive: value.passive.image.full
      }
  })

  const version: string = data.version

  return res.status(200).json({
    version,
    champion
  });
}
