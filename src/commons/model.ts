type WithPosition = {
    left: string,
    top: string,
    zIndex: number
}

type WithSize = {
    width: string,
    height: string
}

type Pinnable = {
    pinned: boolean
}

type MemoData = WithPosition & Pinnable & {
    id: string,
    title: string,
    note: string
}

class Vector {
    private readonly _x: number
    private readonly _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    public static fromWithPosition = (withPosition: WithPosition): Vector => {
        const pixelsToNumber = (position?: string): number => Number(position?.replace('px', ''))
        return new Vector(
            pixelsToNumber(withPosition.left),
            pixelsToNumber(withPosition.top)
        )
    }

    public static ZERO = new Vector(0, 0)

    public add = (vec: Vector) => new Vector(this._x + vec._x, this._y + vec._y)

    public substract = (vec: Vector) => new Vector(this._x - vec._x, this._y - vec._y)

    public length = () => Math.sqrt(this._x * this._x + this._y * this._y)
}

export {
    WithPosition,
    WithSize,
    MemoData,
    Vector
}