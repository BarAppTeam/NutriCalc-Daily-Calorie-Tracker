class StringBuilder {
    constructor() {
        this.buffer = [];
    }

    append(str) {
        this.buffer.push(str);
        return this;
    }

    formatProductInfo(productName, productAmount, totalCalories) {
        return `${productName}: ${productAmount} g - ${totalCalories.toFixed(2)} calories (total)`;
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