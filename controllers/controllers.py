# -*- coding: utf-8 -*-
# from odoo import http


# class WebBlocks(http.Controller):
#     @http.route('/web_blocks/web_blocks', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_blocks/web_blocks/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_blocks.listing', {
#             'root': '/web_blocks/web_blocks',
#             'objects': http.request.env['web_blocks.web_blocks'].search([]),
#         })

#     @http.route('/web_blocks/web_blocks/objects/<model("web_blocks.web_blocks"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_blocks.object', {
#             'object': obj
#         })

