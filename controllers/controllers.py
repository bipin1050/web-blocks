import logging
from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)


class ProductFilterController(http.Controller):

    @http.route('/product/filter/data', type='json', auth="public", website=True)
    def get_filter_data(self, **kwargs):
        # Fetch product categories
        category_model = request.env['product.category'].sudo()
        categories = category_model.search_read([], ['id', 'name'])

        # Fetch product templates and their types
        template_model = request.env['product.template'].sudo()
        product_templates = template_model.search_read([], ['type'])

        # Log fetched data
        _logger.info('Fetched Categories: %s', categories)
        _logger.info('Fetched Product Templates: %s', product_templates)

        # Extract unique product types
        types = list(set(pt['type'] for pt in product_templates if pt['type']))

        response_data = {
            'categories': categories,
            'types': [{'id': t, 'name': t} for t in types]
        }

        return response_data
