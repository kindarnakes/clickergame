import { member } from './member';

export interface game{
    key?:string,
    red_points:number,
    blue_points:number,
    red_members:member[],
    blue_members:member[],
    started:boolean
}