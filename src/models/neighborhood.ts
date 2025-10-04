export interface IState {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name: string;
  stateId: string;
}

export interface INeighborhood {
  id: string;
  name: string;
}
