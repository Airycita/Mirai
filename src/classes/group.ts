// eslint-disable-next-line
export class Group<K, V> extends Map {
    /**
     * Returns all map values inside an array.
     * @returns {unknown[]}
     */
    toArray(): unknown[] {
        return [...super.values()];
    }
}