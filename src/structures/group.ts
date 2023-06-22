export class Group<K, V> extends Map {
    /**
     * Return group values into an array.
     */
    toArray<T>(): T[] {
        return [...super.values()]
    }
}