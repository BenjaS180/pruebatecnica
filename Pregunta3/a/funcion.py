def agrupar_productos(datos_query):
    productos_agrupados = {}
    
    for producto in datos_query:
        ean = producto['Ean']
        nombre_producto = producto['nombre_producto']
        datos_query_producto = producto['datos_query']
        cantidad_markets = producto['cantidad_markets']
        precios = [float(precio) for precio in producto['Precios']]
        rango_precios = max(precios) - min(precios)
        
        if ean not in productos_agrupados:
            productos_agrupados[ean] = {
                'nombre_producto': nombre_producto,
                'datos_query': [datos_query_producto],
                'cantidad_markets': 1,
                'rango_precios': rango_precios
            }
        else:
            productos_agrupados[ean]['datos_query'].append(datos_query_producto)
            productos_agrupados[ean]['cantidad_markets'] += 1
            productos_agrupados[ean]['rango_precios'] = max(productos_agrupados[ean]['rango_precios'], rango_precios)
    
    resultado_final = [{'Ean': ean, **info} for ean, info in productos_agrupados.items()]
    return resultado_final
