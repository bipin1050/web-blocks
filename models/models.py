# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class web_blocks(models.Model):
#     _name = 'web_blocks.web_blocks'
#     _description = 'web_blocks.web_blocks'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

