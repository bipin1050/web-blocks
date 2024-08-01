# -*- coding: utf-8 -*-

from odoo import models, fields, api


class ProductTemplate(models.Model):
    _inherit = 'product.template'


class ProductCategory(models.Model):
    _inherit = 'product.category'
