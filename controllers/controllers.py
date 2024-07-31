# -*- coding: utf-8 -*-
# from odoo import http


# class Web-blocks(http.Controller):
#     @http.route('/web-blocks/web-blocks', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web-blocks/web-blocks/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('web-blocks.listing', {
#             'root': '/web-blocks/web-blocks',
#             'objects': http.request.env['web-blocks.web-blocks'].search([]),
#         })

#     @http.route('/web-blocks/web-blocks/objects/<model("web-blocks.web-blocks"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web-blocks.object', {
#             'object': obj
#         })

