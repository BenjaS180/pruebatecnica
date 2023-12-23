def group_products(query_data):
    grouped_products = {}
    
    for product in query_data:
        ean = product['Ean']
        product_name = product['nombre_producto']
        query_data_product = product['datos_query']
        market_count = product['cantidad_markets']
        prices = [float(price) for price in product['Precios']]
        price_range = max(prices) - min(prices)
        
        if ean not in grouped_products:
            grouped_products[ean] = {
                'product_name': product_name,
                'query_data': [query_data_product],
                'market_count': 1,
                'price_range': price_range
            }
        else:
            grouped_products[ean]['query_data'].append(query_data_product)
            grouped_products[ean]['market_count'] += 1
            grouped_products[ean]['price_range'] = max(grouped_products[ean]['price_range'], price_range)
    
    final_result = [{'Ean': ean, **info} for ean, info in grouped_products.items()]
    return final_result
