#!/bin/bash

# User Configuration
icon_color=5bb1b4
player_icon=""

# Get song title
title=$(playerctl metadata | grep -Po '(?<=title               )([^\(]*)')

# Get song artist
artist=$(playerctl metadata | grep -Po '(?<=:artist              )[^,]*')

# Get play/paused status
status=$(playerctl status)

# If title and artist are null, print an empty string so polybar hides the module
if [ -z $title ] && [ -z $artist ]; then
    echo ""
else
    echo "%{F#$icon_color}$player_icon%{F-}  $(head -c 30 <<< $title) - $(head -c 20 <<< $artist)%{F-}"
fi
