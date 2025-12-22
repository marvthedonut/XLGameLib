import {
    BlockBoundingBox,
    Dimension,
    MolangVariableMap,
} from "@minecraft/server";
import { Vector } from "../wrappers/Vector";
import VectorHelper from "./VectorHelper";

export default class ParticleHelper {
    public static drawLine = (
        from: Vector,
        to: Vector,
        particle: string,
        dimension: Dimension,
        molang?: MolangVariableMap
    ) => {
        let nonNormalDir = to.subtract(from);
        let dir = VectorHelper.normalize(nonNormalDir);
        let squareLength = VectorHelper.dotProduct(nonNormalDir, nonNormalDir);
        let inc = 0.5;
        let increment = dir.mul(inc);
        let pos = from;
        for (let i = 0; i ** 2 * inc ** 2 < squareLength; i++) {
            dimension.spawnParticle(particle, pos, molang);

            pos = pos.add(increment);
        }
    };

    public static drawCuboid = (
        boundingBox: BlockBoundingBox,
        particle: string,
        dimension: Dimension
    ) => {
        const max = new Vector(boundingBox.max);
        const min = new Vector(boundingBox.min);
        const diff = max.subtract(min);

        this.drawLine(
            min,
            min.add({ x: diff.x, y: 0, z: 0 }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: 0, y: 0, z: diff.z }),
            min.add({ x: diff.x, y: 0, z: diff.z }),
            particle,
            dimension
        );

        this.drawLine(min, min.add(0, 0, diff.z), particle, dimension);
        this.drawLine(
            min.add(diff.x, 0, 0),
            min.add(diff.x, 0, diff.z),
            particle,
            dimension
        );

        this.drawLine(
            min.add({ x: 0, y: diff.y, z: 0 }),
            min.add({ x: diff.x, y: diff.y, z: 0 }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: 0, y: diff.y, z: diff.z }),
            min.add({ x: diff.x, y: diff.y, z: diff.z }),
            particle,
            dimension
        );

        this.drawLine(
            min.add({ x: 0, y: diff.y, z: 0 }),
            min.add({ x: 0, y: diff.y, z: diff.z }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: diff.x, y: diff.y, z: 0 }),
            min.add({ x: diff.x, y: diff.y, z: diff.z }),
            particle,
            dimension
        );

        this.drawLine(
            min,
            min.add({ x: 0, y: diff.y, z: 0 }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: diff.x, y: 0, z: 0 }),
            min.add({ x: diff.x, y: diff.y, z: 0 }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: 0, y: 0, z: diff.z }),
            min.add({ x: 0, y: diff.y, z: diff.z }),
            particle,
            dimension
        );
        this.drawLine(
            min.add({ x: diff.x, y: 0, z: diff.z }),
            min.add({ x: diff.x, y: diff.y, z: diff.z }),
            particle,
            dimension
        );
    };
}
