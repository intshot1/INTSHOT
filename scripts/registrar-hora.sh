#!/bin/bash
# Ejercicio de clase: guarda la hora en un archivo cada vez que se ejecuta (para probar crontab).
echo "Ejecutado el: $(date '+%Y-%m-%d %H:%M:%S')" >> "$(dirname "$0")/registro-horas.txt"
