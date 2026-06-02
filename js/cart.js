// Gestión del carrito
class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem(CONFIG.storageKey)) || [];
    }

    addItem(product, customization) {
        const uniqueKey = `${product.id}-${customization.color}-${customization.size}-${customization.material}`;
        
        const existing = this.items.find(item => item.uniqueKey === uniqueKey);
        
        if (existing) {
            existing.qty += customization.qty;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price + productManager.getMaterialPrice(customization.material),
                qty: customization.qty,
                color: customization.color,
                size: customization.size,
                material: customization.material,
                pattern: customization.pattern,
                notes: customization.notes,
                image: product.image,
                uniqueKey: uniqueKey,
                stripeLink: product.stripeLink
            });
        }
        
        this.save();
        return true;
    }

    removeItem(uniqueKey) {
        this.items = this.items.filter(item => item.uniqueKey !== uniqueKey);
        this.save();
    }

    updateQuantity(uniqueKey, delta) {
        const item = this.items.find(i => i.uniqueKey === uniqueKey);
        if (item) {
            item.qty = Math.max(1, item.qty + delta);
            this.save();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    getTotalItems() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    }

    save() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(this.items));
    }

    clear() {
        this.items = [];
        this.save();
    }
}

// Instancia global
const cartManager = new CartManager();