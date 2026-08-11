Dashboard General

Es la primera pantalla que ve al iniciar sesión.

Debe mostrar indicadores como:

Financiero
Total colocado en créditos.
Total recuperado.
Saldo pendiente.
Mora actual.
Cartera vencida.
Intereses generados.
Utilidad estimada.
Distribuidoras
Distribuidoras activas.
Suspendidas.
En proceso de alta.
Nuevas esta semana.
Clientes
Total clientes.
Nuevos clientes.
Clientes con pagos atrasados.
Clientes transferidos.
Operación
Vales emitidos hoy.
Pagos recibidos hoy.
Solicitudes pendientes.
Aumentos de crédito pendientes.
Transferencias pendientes.
Administración de Sucursales

Puede:

Crear sucursales.
Editarlas.
Suspenderlas.
Activarlas.
Ver desempeño.

Ejemplo:

Sucursal Centro

Coordinadores: 5
Distribuidoras: 150
Clientes: 4,800
Crédito colocado:
$8,200,000

Morosidad:
6.3%
Administración de Usuarios

Puede administrar todos los usuarios.

Gerentes

Coordinadores

Verificadores

Cajeras

Administradores

Puede:

Crear usuario.
Editar.
Bloquear.
Cambiar contraseña.
Cambiar sucursal.
Asignar permisos.
Administración de Productos

Aquí es donde ustedes mencionan:

El gerente general levanta productos.

Entonces debería poder:

Crear producto

Nombre

Precio contado

Precio a crédito

Categoría

Activo

Editar.

Eliminar.

Suspender.

También definir:

Comisión.
Margen.
Interés.
Disponibilidad.
Planes de Vales

Tú mismo comentaste:

El gerente general habilita planes de vales.

Entonces este módulo sería muy importante.

Ejemplo

Plan Oro

Monto máximo

20,000

Plazo

24 semanas

Interés

18%

Enganche

10%

Activo

Puede:

Crear.

Modificar.

Suspender.

Duplicar.

Líneas de Crédito

Probablemente sea uno de los módulos principales.

Debe poder:

Buscar distribuidora.

Ver historial.

Ver pagos.

Ver score.

Ver capacidad.

Ver riesgo.

Y autorizar:

aumento de crédito
reducción
suspensión

Ejemplo:

Distribuidora

Límite actual

30,000

Solicita

40,000

Motivo

Buen historial

Score

95

Pagos puntuales

98%

Botón

Autorizar

Rechazar
Solicitudes Pendientes

Aquí llegan todas las autorizaciones.

Por ejemplo

Aumento de crédito.

Transferencia.

Modificar cliente.

Cancelar vale.

Reactivar distribuidora.

Cambio de sucursal.

Modificar datos importantes.

Transferencias entre Distribuidoras

Mencionaste:

El gerente general puede autorizar transferencias.

Aquí puede ver:

Cliente.

Distribuidora origen.

Distribuidora destino.

Motivo.

Historial.

Aceptar.

Rechazar.

Distribuidoras

Puede ver todas.

Filtros:

Sucursal

Coordinador

Estado

Crédito

Saldo

Mora

Al entrar:

Información completa.

Clientes.

Pagos.

Vales.

Productos.

Historial.

Score.

Reportes

Muchísimos.

Por ejemplo

Reporte de ventas

Por sucursal.

Por distribuidora.

Por coordinador.

Por producto.

Reporte de cobranza

Pagado.

Pendiente.

Vencido.

Recuperado.

Reporte de productos

Más vendidos.

Menos vendidos.

Rentabilidad.

Reporte de créditos

Autorizados.

Rechazados.

Incrementos.

Cancelaciones.

Reporte de clientes

Nuevos.

Activos.

Morosos.

Transferidos.

Conciliaciones

Puede revisar las conciliaciones hechas por cajeras.

Autorizar.

Rechazar.

Ver diferencias.

Historial.

Configuración General

Fechas de corte.

Fechas límite.

Intereses.

Recargos.

Porcentaje de mora.

Tolerancias.

Porcentaje máximo del pre-vale.

Ejemplo

Primer vale

50%

Tolerancia

500

Días para mora

3

Interés moratorio

5%
Notificaciones

Debe recibir:

Nuevo aumento de crédito.

Nueva transferencia.

Solicitud de modificación.

Nueva distribuidora.

Verificación terminada.

Pago extraordinario.

Cliente moroso.

Auditoría

Aunque el Administrador vea todos los logs, el Gerente General debería tener acceso para consulta.

Por ejemplo:

Quién hizo la acción

Fecha

Hora

IP

Dispositivo

Sucursal

Acción

Valor anterior

Valor nuevo
Indicadores (KPIs)

Muy importantes.

Ejemplo

Top 10 sucursales.

Top coordinadores.

Top distribuidoras.

Mayor recuperación.

Mayor morosidad.

Mayor utilidad.

Clientes nuevos por mes.

Distribuidoras activas.

Reglas de negocio que el sistema debe aplicar automáticamente

Estas reglas son clave para el funcionamiento:

Pre-vale
El primer vale de un cliente siempre será un Pre-vale.
El monto máximo del pre-vale será el 50% de la línea de crédito disponible.
Se permite una tolerancia configurable de $500.
Después del primer vale, todos los siguientes serán Vales Digitales.
Incremento de línea de crédito
Cada vez que aumente la línea de crédito, el sistema debe volver a aplicar la regla del 50% para el siguiente primer vale correspondiente a ese incremento.
Puntos
Se generan únicamente cuando la distribuidora paga antes de la fecha límite.
Los puntos pueden usarse para beneficios definidos por la empresa.
Transferencia de clientes
La distribuidora destino debe aceptar la transferencia.
Se notifica al coordinador de la distribuidora origen.
Si la política lo requiere, el coordinador de origen debe autorizar antes de completar el cambio.
El sistema conserva un historial completo de las transferencias.
Responsabilidad del pago
La deuda siempre pertenece a la distribuidora, independientemente del cliente final.
Mi recomendación de arquitectura de permisos

En lugar de pensar solo en pantallas, definan una matriz de permisos por rol. Por ejemplo:

Módulo	Gerente General
Dashboard	✅
Sucursales	Crear / Editar / Suspender
Gerentes de sucursal	CRUD
Coordinadores	CRUD
Verificadores	CRUD
Cajeras	CRUD
Distribuidoras	Ver todas y modificar
Productos	CRUD
Planes de vales	CRUD
Líneas de crédito	Autorizar incrementos
Transferencias	Autorizar
Configuración del sistema	CRUD
Reportes	Ver todos
KPIs	Ver todos
Conciliaciones	Revisar y autorizar
Auditoría	Consulta
Notificaciones	Ver y atender

Con esta estructura, el rol de Gerente General deja de ser solo un usuario con muchos permisos y se convierte en el centro de control operativo y financiero de toda la empresa, desde donde supervisa sucursales, distribuidoras, cartera, créditos, autorizaciones y el desempeño general del negocio. Esto también facilita que después puedan definir de forma coherente los permisos y vistas para el Gerente de Sucursal, Coordinador, Verificador, Cajera y Administrador, ya que cada uno heredará solo la parte del flujo que le corresponde.