import { UUID } from 'crypto';

export interface IState {
  id: UUID;
  name: string;
}

export interface ICity {
  id: UUID;
  name: string;
  stateId: UUID;
}

export interface INeighborhood {
  id: UUID;
  name: string;
}

export interface INeighborhoodDots{
  id: UUID;
  neighborhoodId: UUID;
  lat: number;
  long: number;
}