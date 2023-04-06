import Link from 'next/link';
import Image from 'next/image';
import {IChampionTiles} from '@/types/championTiles';

interface Props {
  champion: IChampionTiles;
}

export function ChampionTiles({champion}: Props) {
  return (
    <Link
      href={`/champion/${champion.key}`}
      key={champion.key}
      className="relative border-4 border-zinc-700 transition duration-0 hover:duration-300 ease-in hover:border-4 hover:border-amber-500 focus:border-4 focus:border-amber-500 outline-none">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champion.id}_0.jpg`}
        alt={champion.name}
        width={160}
        height={160}
      />
      <h1 className="absolute bottom-0 bg-zinc-900/80 w-full text-center text-white font-bold">
        {champion.name}
      </h1>
    </Link>
  );
}
