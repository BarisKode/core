class Item {
    public content: any;
    public priority: number;
    public key: number = 0;

    constructor(content: any, priority: number) {
        this.content = content;
        this.priority = priority;
    }
}

export default class ItemList {
    private items: { [key: string]: Item } = {};

    /**
     * Check whether the list is empty.
     *
     * @returns {boolean}
     * @public
     */
    isEmpty(): boolean {
        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check whether an item is present in the list.
     *
     * @param key
     * @returns {boolean}
     */
    has(key: any): boolean {
        return !!this.items[key];
    }

    /**
     * Get the content of an item.
     *
     * @param {String} key
     * @return {*}
     * @public
     */
    get(key: any): any {
        return this.items[key].content;
    }

    /**
     * Add an item to the list.
     *
     * @param {String} key A unique key for the item.
     * @param {*} content The item's content.
     * @param {Integer} [priority] The priority of the item. Items with a higher
     *     priority will be positioned before items with a lower priority.
     * @return {ItemList}
     * @public
     */
    add(key: any, content: any, priority = 0) {
        this.items[key] = new Item(content, priority);

        return this;
    }

    get toArray() {
        const items: Item[] = [];

        for (const i in this.items) {
            if (this.items.hasOwnProperty(i)) {
                if (this.items[i] !== null && this.items[i] instanceof Item) {
                    this.items[i].content = Object(this.items[i].content);

                    this.items[i].content.itemName = i;
                    items.push(this.items[i]);
                    this.items[i].key = items.length;
                }
            }
        }

        return items
            .sort((a, b) => {
                if (a.priority === b.priority) {
                    return a.key - b.key;
                } else if (a.priority > b.priority) {
                    return -1;
                }
                return 1;
            })
            .map(item => item.content);
    }
}