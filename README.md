# Load Balancer con Nginx

## Definiciones y Conceptos

### Load Balancer
Un **Load Balancer**(balanceador de carga) es un dispositivo o servicio que actúa como intermediario entre los clientes y un grupo de servidores, distribuye las solicitudes de tráfico entre múltiples servidores o instancias de una aplicación. Esto permite:
- **Distribución de la carga:** Se reparte el tráfico para evitar la sobrecarga de un solo servidor.
- **Alta disponibilidad:** Si una instancia falla, otras pueden continuar atendiendo solicitudes.
- **Escalabilidad:** Facilita la adición de más instancias para manejar incrementos en la demanda.

### ¿Qué es Nginx y cómo se usa como Load Balancer?
**Nginx** es un servidor web de alto rendimiento que, además de servir contenido estático, puede actuar como load balancer. Cuando se utiliza como Load Balancer, Nginx recibe las solicitudes entrantes y las distribuye entre los servidores backend, aplicando algoritmos de distribución para optimizar el uso de recursos.

### Algoritmos de Distribución de Carga
Los algoritmos que se pueden usar en un Load Balancer con Nginx incluyen:
- **Round Robin:** Distribuye las solicitudes de manera secuencial a cada servidor.
- **Least Connections:** Envía la solicitud al servidor con menos conexiones activas.
- **IP Hash:** Asigna solicitudes basadas en la dirección IP del cliente para mantener la afinidad de sesión.

---

## Características y Beneficios

### Características del Load Balancer
- **Distribución de carga:** Reparte las solicitudes entre varias instancias.
- **Alta disponibilidad:** Previene fallos del sistema al redirigir el tráfico si una instancia no responde.
- **Escalabilidad(horizontal):** Permite agregar o eliminar instancias según la demanda.
- **Flexibilidad en algoritmos:** Soporta diferentes métodos de distribución (Round Robin, Least Connections, IP Hash, etc.).

### Beneficios de usar un Load Balancer
- **Mejora en el rendimiento:** Al evitar la sobrecarga en un solo servidor, se reducen los tiempos de respuesta.
- **Mayor tolerancia a fallos:** Asegura que el sistema siga operativo incluso si algunas instancias fallan.
- **Optimización de recursos:** Utiliza de manera eficiente la capacidad de procesamiento y memoria.
- **Fácil mantenimiento:** Permite actualizar o reparar instancias sin interrumpir el servicio general.

---

## Cómo Funciona Nginx como Load Balancer

### Algoritmo Round Robin
El algoritmo **Round Robin** es el método de balanceo de carga predeterminado en Nginx. Funciona de la siguiente manera:
1. La primera solicitud se envía al primer servidor en la lista.
2. La segunda solicitud se envía al segundo servidor.
3. Cuando se alcanza el final de la lista, el proceso comienza de nuevo desde el primer servidor.

Este método distribuye las solicitudes de manera uniforme entre todos los servidores, asumiendo que todos tienen la misma capacidad y carga de trabajo.

### Ejemplo de Configuración en Nginx
A continuación, se muestra un ejemplo de cómo configurar Nginx de la manera más simple, el archivo nginx.conf se veria así:
```nginx
http {
    # Definición del grupo de servidores (upstream)
    upstream app_servers {
        # least_conn;      # Para usar el algoritmo de menos conexiones
        # ip_hash;         # Para usar el algoritmo de hash IP
        server app_instance_1:3000;
        server app_instance_2:3000;
        server app_instance_3:3000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://app_servers;
        }
    }
}
```
Si quieren ver mas acerca de la configuración o documentación en general de nginx pueden ir a [Nginx](https://nginx.org/en/docs/http/load_balancing.html)

## Requisitos previos
Antes de comenzar, asegúrate de tener instalado:
- Git
- Docker
- Docker Compose
- Node.js
- npm
- ApacheBench

## Laboratorio
### Pasos para ejecutar el laboratorio
1. Clona el repositorio:
```
git clone https://gitlab.com/MayerliSantander/load-balancer-lab.git
```
2. Levanta los servicios con Docker:
```
docker-compose up -d --build
```
3. Ejecuta el frontend:
En la terminal ir hasta el folder de ``frontend`` y ejecutar:
```
npm run dev
```
4. Verificar la conexión a los servidores con el load balancer:
Accede a ``http://localhost:5173/`` en tu navegador. Revisa que en la información donde dice Servidor el hostname cambie segun al servidor al que se esta conectando.
5. Medición y comparación de rendimiento:

    Para comparar el rendimiento del sistema con y sin Load Balancer, utilizaremos ApacheBench (ab), es una herramienta de línea de comandos para medir el rendimiento de los servidores web.

    Puedes ejecutar el script ``test.bash`` que ya tiene los comandos para simular 30000 solicitudes con 2500 solicitudes concurrentes, ejecutara ambas pruebas con y sin aplicar load balancer.
    Escribe en la terminal:
    ```
    ./test.bash
    ```
    Si no te funciona debes cambiar los permisos y agregar el permiso de ejecución al archivo.
    ```
    chmod +x test.bash
    ```
    O puedes ejecutar el siguiente comando para realizar las pruebas una por una, primero sin el load balancer y luego con el load balancer.
    Para simular la misma cantidad de solicitudes y cantidad de concurrencia mencionadas anteriormente ejecutar:
    
    Sin load balancer:
    ```
    ab -n 30000 -c 2500 http://localhost:3001/api/server-info
    ```
    Con load balancer:
    ```
    ab -n 30000 -c 2500 http://localhost:3000/api/server-info
    ```
### Interpretación de Resultados
Compara los siguientes valores entre ambas pruebas:
- **Time taken for tests:** Indica el tiempo total que tomó completar todas las solicitudes durante la prueba.
- **Requests per second:** Número de solicitudes por segundo que el servidor pudo manejar.
- **Time per request:** Tiempo promedio que tomó procesar cada solicitud.
- **Percentage of requests served within a certain time:** Permite ver cómo se comportan los tiempos de respuesta en distintos percentiles (50%, 66%, 75%, 80%, 90%, 95%, 98%, 99% y 100%).

Un sistema con load balancer debería mostrar mejor rendimiento bajo cargas pesadas y mayor estabilidad.
