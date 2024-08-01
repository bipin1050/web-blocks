/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import publicWidget from '@web/legacy/js/public/public_widget';

class ProductFilter extends Component {
    setup() {
        console.log('filter_product.js has been loaded and executed.');
        this.rpc = useService("rpc");
        this.state = useState({
            categories: [],
            types: []
        });

        onWillStart(async () => {
            await this.fetchData();
        });
    }

    async fetchData() {
        try {
            const data = await this.rpc("/product/filter/data", {});
            console.log("DATA", data);
            this.state.categories = data.categories || [];
            this.state.types = data.types || [];
            this.updateSelectOptions();
        } catch (error) {
            console.error('Failed to fetch filter data:', error);
        }
    }

    updateSelectOptions() {
        const categorySelect = document.querySelector('.category-select');
        const typeSelect = document.querySelector('.type-select');

        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Select Category</option>';
            this.state.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }

        if (typeSelect) {
            typeSelect.innerHTML = '<option value="">Select Type</option>';
            this.state.types.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                typeSelect.appendChild(option);
            });
        }
    }

    static template = 'web_blocks.filter_product_template';
}

// Register the component with publicWidget
publicWidget.registry.ProductFilter = ProductFilter;

export default ProductFilter;
