def teoria_autor(nombre):
    autores = {
        "Gesell": "Desarrollo según reloj biológico",
        "Zelazo": "Estimulación acelera maduración",
        "Coghill": "Ley céfalo-caudal y próximo-distal",
        "Solomons": "Influencia cultural"
    }
    return autores.get(nombre, "Autor no encontrado")

if __name__ == "__main__":
    autor = input("Introduce un autor (Gesell, Zelazo, Coghill, Solomons): ")
    print(teoria_autor(autor))