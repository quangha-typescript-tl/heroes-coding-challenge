export interface Hero {
  id: number;
  name: string;
  health: number;
  weaponId: number;
  armourId: number;
  imageSrc: string;
  damage?: number;
}
