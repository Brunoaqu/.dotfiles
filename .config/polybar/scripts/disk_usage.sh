#!/bin/sh
location=/

[ -d "$location" ] || exit

icon=" "
echo "$icon $(df -h "$location" | awk ' /[0-9]/ {print $3}')"
