/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { EditMenuDialog } from '@website/components/dialog/edit_menu';
import { OptimizeSEODialog } from '@website/components/dialog/seo';
import { PagePropertiesDialog } from '@website/components/dialog/page_properties';

// Your custom JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    var categorySelect = document.getElementById('category');
    var productSelect = document.getElementById('product_name');

    categorySelect.addEventListener('change', function() {
        var categoryId = categorySelect.value;
        if (categoryId) {
            fetch('/shop/get_products_by_category?category_id=' + categoryId)
                .then(response => response.json())
                .then(data => {
                    // Clear current options
                    productSelect.innerHTML = '<option value="">Select Product</option>';

                    // Add new options
                    data.products.forEach(function(product) {
                        var option = document.createElement('option');
                        option.value = product.id;
                        option.textContent = product.name;
                        productSelect.appendChild(option);
                    });
                });
        } else {
            // Clear product options if no category selected
            productSelect.innerHTML = '<option value="">Select Product</option>';
        }
    });
});
