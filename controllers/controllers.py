from odoo import http
from odoo.http import request


class ProductFilter(http.Controller):

    @http.route('/shop/filter', type='http', auth="public", website=True)
    def filter_products(self, **kwargs):
        category_id = kwargs.get('category')
        type = kwargs.get('type')
        name = kwargs.get('name')

        domain = []
        if category_id:
            domain.append(('categ_id', '=', int(category_id)))
        if type:
            domain.append(('type', '=', type))
        if name:
            domain.append(('name', 'ilike', name))

        products = request.env['product.template'].sudo().search(domain)
        values = {
            'products': products,
            'page_name': 'filtered_products',
        }
        return request.render("web_blocks.filter_product_option", values)
