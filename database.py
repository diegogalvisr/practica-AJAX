import mysql.connector

try:
    conexion = mysql.connector.connect(
        host="monorail.proxy.rlwy.net",
        port=35303,
        user="root",
        password="VbbzaPdbqPALiauFgHUWzbzWliVAkXpi",
        database="railway"
    )

    if conexion.is_connected():
        print("Conexión exitosa a la base de datos")

except mysql.connector.Error as error:
    print("Error al conectarse a la base de datos:", error)

finally:
    if 'conexion' in locals() and conexion.is_connected():
        conexion.close()
        print("Conexión cerrada")
