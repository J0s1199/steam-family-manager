
export interface Game {
  id: string;
  name: string;
  price: number;
  purchaseDate: string;
}

export interface User {
  id: string;
  name: string;
  password?: string;
  avatar: string;
  moneySpent: number;
  gamesCount: number;
  games: Game[];
}

export interface FamilyStats {
  totalSpent: number;
  totalGames: number;
  averageSpentPerUser: number;
}
