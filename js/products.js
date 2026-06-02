// Gestión de productos
class ProductManager {
    constructor() {
        this.products = [];
        this.categories = {};
        this.materials = [];
        this.colors = {};
        this.sizes = [];
        this.patterns = [];
    }

    async loadProducts() {
        try {
            console.log('📥 Cargando products.json...');
            const response = await fetch('data/products.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ JSON cargado:', data);
            
            this.products = data.products || [];
            this.categories = data.categories || {};
            this.materials = data.materials || [];
            this.colors = data.colors || {};
            this.sizes = data.sizes || [];
            this.patterns = data.patterns || [];
            
            return data;
        } catch (error) {
            console.error('❌ Error loading products:', error);
            alert('Error al cargar productos. Verifica la consola.');
            return null;
        }
    }

    getProductsByCategory(category) {
        if (category === 'all' || category === 'todos') return this.products;
        return this.products.filter(p => p.category === category);
    }

    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getMaterialPrice(materialId) {
        const material = this.materials.find(m => m.id === materialId);
        return material ? material.priceAdd : 0;
    }
}

const productManager = new ProductManager();