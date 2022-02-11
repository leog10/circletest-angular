import { ICircle } from "./ICircles";

export class Circle implements ICircle {
    _id?: number | undefined;
    current: number = 50;
    max: number = 100;
    radius: number = 50;
    semicircle: boolean = true;
}
