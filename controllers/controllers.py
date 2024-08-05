from odoo import http
from odoo.http import request

class WebBlocks(http.Controller):

    @http.route('/web_blocks/get_filter_data', type='json', auth='public')
    def get_filter_data(self):
        Category = request.env['product.category']
        Product = request.env['product.template']

        # Fetch parent categories (those without a parent_id)
        parent_categories = Category.search([('parent_id', '=', False)])

        data = []
        for parent in parent_categories:
            parent_dict = {parent.name: {}}
            # Fetch subcategories for each parent category
            subcategories = Category.search([('parent_id', '=', parent.id)])
            for subcategory in subcategories:
                subcategory_dict = {}
                # Fetch products for each subcategory
                products = Product.search([('categ_id', '=', subcategory.id)])
                for product in products:
                    subcategory_dict[product.name] = {
                        "price": product.list_price,
                    }
                parent_dict[parent.name][subcategory.name] = subcategory_dict
            data.append(parent_dict)

        return data
