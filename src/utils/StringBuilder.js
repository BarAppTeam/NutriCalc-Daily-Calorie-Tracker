class StringBuilder {
    constructor() {
        this.buffer = [];
    }

    append(str) {
        this.buffer.push(str);
        return this;
    }

    toString() {
        return this.buffer.join('');
    }

    clear() {
        this.buffer = [];
        return this;
    }
}

export default StringBuilder;