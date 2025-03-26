import { useState } from 'react';

import { getPots } from './data/pot_data.ts';
import PotBoard from "./pot_board/PotBoard.tsx";

import type { Pot } from "./types/pot.types.ts";

function PotMain() {
  const [pots] = useState<Pot[]>(getPots());

  return <PotBoard pots={pots} />;
}

export default PotMain;
