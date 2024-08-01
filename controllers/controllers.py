from odoo import http
from odoo.http import request

class WebBlocks(http.Controller):

    @http.route('/web_blocks/get_filter_data', type='json', auth='public')
    def get_filter_data(self):
        # This is a sample data structure
        data = [
            {
                "Audi": {
                    "2000": {
                        "Silencer": {
                            "price": 5000,
                            "warranty": "2 years"
                        },
                        "Engine": {
                            "price": 15000,
                            "warranty": "5 years"
                        }
                    },
                    "2021": {
                        "Tire": {
                            "price": 200,
                            "warranty": "1 year"
                        }
                    }
                }
            },
            {
                "BMW": {
                    "2010": {
                        "Gearbox": {
                            "price": 7000,
                            "warranty": "3 years"
                        }
                    }
                }
            }
        ]
        return data
